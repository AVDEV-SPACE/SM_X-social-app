import prisma from "@/prisma";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();

  if (!userId) return null;

  // Query base pentru include-uri
  const postIncludeQuery = {
    user: { 
      select: { 
        displayName: true, 
        username: true, 
        img: true 
      } 
    },
    _count: { 
      select: { 
        likes: true, 
        rePosts: true, 
        comments: true 
      } 
    },
    likes: { 
      where: { userId: userId }, 
      select: { id: true } 
    },
    rePosts: { 
      where: { userId: userId }, 
      select: { id: true } 
    },
    saves: { 
      where: { userId: userId }, 
      select: { id: true } 
    },
  };

  // Include pentru rePost cu verificări suplimentare
  const fullIncludeQuery = {
    ...postIncludeQuery,
    rePost: { 
      include: {
        ...postIncludeQuery,
        // Asigură-te că rePost-ul are și el user data
        user: { 
          select: { 
            displayName: true, 
            username: true, 
            img: true 
          } 
        }
      }
    }
  };

  try {
    // Dacă este profil specific, arată doar posturile acelui user
    if (userProfileId) {
      const whereCondition = { 
        parentPostId: null, 
        userId: userProfileId 
      };

      const posts = await prisma.post.findMany({
        where: whereCondition,
        include: fullIncludeQuery,
        take: 30,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });

      // Filtrează posturile care nu au user data
      const validPosts = posts.filter(post => {
        const originalPost = post.rePost || post;
        return originalPost.user && originalPost.user.username;
      });

      return (
        <div className="">
          {validPosts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))}
          <InfiniteFeed userProfileId={userProfileId} />
        </div>
      );
    }

    // Pentru feed principal - verifică dacă userul urmărește pe cineva
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = following.map((follow) => follow.followingId);

    let posts = [];

    if (followingIds.length > 0) {
      const followedPosts = await prisma.post.findMany({
        where: { 
          parentPostId: null, 
          userId: { in: [userId, ...followingIds] } 
        },
        include: fullIncludeQuery,
        take: 3,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });

      const otherPosts = await prisma.post.findMany({
        where: { 
          parentPostId: null, 
          userId: { notIn: [userId, ...followingIds] } 
        },
        include: fullIncludeQuery,
        take: 3,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });

      posts = [...followedPosts, ...otherPosts];
    } else {
      posts = await prisma.post.findMany({
        where: { parentPostId: null },
        include: fullIncludeQuery,
        take: 3,
        skip: 0,
        orderBy: { createdAt: "desc" },
      });
    }

    // Filtrează posturile care nu au user data
    const validPosts = posts.filter(post => {
      const originalPost = post.rePost || post;
      return originalPost.user && originalPost.user.username;
    });

    return (
      <div className="">
        {validPosts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
        <InfiniteFeed userProfileId={userProfileId} />
      </div>
    );

  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="p-4 text-center text-textGray">
        Error loading posts. Please try again.
      </div>
    );
  }
};

export default Feed;