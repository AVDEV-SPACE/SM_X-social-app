import { imagekit } from "@/utils";
import ImageU from "./ImageU";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Video from "./Video";
import Link from "next/link";
import { Post as PostType } from "@prisma/client";
import { format } from "timeago.js";

type UserSummary = {
  displayName: string | null;
  username: string;
  img: string | null;
};

type PostCounts = {
  likes: number;
  rePosts: number;
  comments: number;
};

type PostEngagement = {
  likes: { id: number }[];
  rePosts: { id: number }[];
  saves: { id: number }[];
};

export type PostWithDetails = PostType & {
  user: UserSummary | null; 
  _count: PostCounts;
  likes: { id: number }[];
  rePosts: { id: number }[];
  saves: { id: number }[];
  rePost?: (PostType & {
    user: UserSummary | null;
    _count: PostCounts;
    likes: { id: number }[];
    rePosts: { id: number }[];
    saves: { id: number }[];
  }) | null;
};

const Post = ({
  type,
  post,
}: {
  type?: "status" | "comment";
  post: PostWithDetails;
}) => {
  // Determinăm postarea originală
  const originalPost = post.rePost || post;

  // Verificare defensivă - dacă nu avem date despre user, afișăm un placeholder
  if (!originalPost.user) {
    console.error("Post missing user data:", originalPost);
    return (
      <div className="p-4 border-y-[1px] border-borderGray">
        <div className="text-textGray">Loading post...</div>
      </div>
    );
  }

  // Extragem datele utilizatorului pentru simplitate
  const user = originalPost.user;

  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* POST TYPE - Afisare repost */}
      {post.rePostId && user && (
        <div className="flex items-center gap-2 text-sm text-textGray mb-2 from-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="#71767b"
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
            />
          </svg>
          <span>{user.displayName || "Unknown User"} reposted</span>
        </div>
      )}

      {/* POST CONTENT */}
      <div className={`flex gap-4 ${type === "status" && "flex-col"}`}>
        {/* AVATAR */}
        <div
          className={`${
            type === "status" && "hidden"
          } relative w-10 h-10 rounded-full overflow-hidden -z-10`}
        >
          <ImageU
            path={user.img || "general/noAvatar.png"}
            alt={user.username || "user"}
            w={100}
            h={100}
            tr={true}
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col gap-2">
          {/* TOP */}
          <div className="w-full flex justify-between">
            <Link
              href={`/${user.username || 'unknown'}`}
              className="flex gap-4"
            >
              <div
                className={`${
                  type !== "status" && "hidden"
                } relative w-10 h-10 rounded-full overflow-hidden`}
              >
                <ImageU
                  path={user.img || "general/noAvatar.png"}
                  alt={user.username || "user"}
                  w={100}
                  h={100}
                  tr={true}
                />
              </div>
              <div
                className={`flex items-center gap-2 flex-wrap ${
                  type === "status" && "flex-col gap-0 !items-start"
                }`}
              >
                <h1 className="text-md font-bold">
                  {user.displayName || "Unknown User"}
                </h1>
                <span
                  className={`text-textGray ${type === "status" && "text-sm"}`}
                >
                  @{user.username || "unknown"}
                </span>
                {type !== "status" && (
                  <span className="text-textGray">
                    {format(originalPost.createdAt)}
                  </span>
                )}
              </div>
            </Link>
            <PostInfo />
          </div>

          {/* TEXT & MEDIA */}
          <Link
            href={`/${user.username || 'unknown'}/status/${originalPost.id}`}
          >
            <p className={`${type === "status" && "text-lg"}`}>
              {originalPost.desc}
            </p>
          </Link>

          {originalPost.img && (
            <div className="overflow-hidden">
              <ImageU
                path={originalPost.img}
                alt={user.username || "post"}
                w={600}
                h={originalPost.imgHeight || 600}
                className={originalPost.isSensitive ? "blur-3xl" : ""}
              />
            </div>
          )}

          {originalPost.video && (
            <div className="rounded-lg overflow-hidden">
              <Video
                path={originalPost.video}
                className={originalPost.isSensitive ? "blur-3xl" : ""}
              />
            </div>
          )}

          {type === "status" && (
            <span className="text-textGray">
              {format(originalPost.createdAt)}
            </span>
          )}

          <PostInteractions
            username={user.username || "unknown"}
            postId={originalPost.id}
            count={originalPost._count}
            isLiked={!!originalPost.likes?.length}
            isRePosted={!!originalPost.rePosts?.length}
            isSaved={!!originalPost.saves?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;