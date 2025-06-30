import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/prisma";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();

  if (!userId) return null;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
    : {
        parentPostId: null,
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
              })
            ).map((follow) => follow.followingId),
          ],
        }, // Adaugă virgulă aici
      };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      rePost: {
        include: postIncludeQuery, // Asumăm că e definit
      },
      ...postIncludeQuery, // Asumăm că e definit
    },
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;