// app/page.tsx
import Feed from "@/components/Feed";
import Share from "@/components/Share";
import prisma from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

const Homepage = async () => {
  const { userId } = await auth(); 
  const client = await clerkClient(); 
  const clerkUser = userId ? await client.users.getUser(userId) : null;

  console.log("LOGAT CU EMAIL:", clerkUser?.emailAddresses[0]?.emailAddress);

  const dbUser = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
  console.log("USER DIN DB:", dbUser);

  return (
    <div className="">
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <div className="w-1/2 text-center border-r border-borderGray">
          <Link href="/" className="inline-block w-full pb-3">
            <span className="border-b-4 border-iconBlue">For you</span>
          </Link>
        </div>
        <div className="w-1/2 text-center">
          <Link href="/" className="inline-block w-full pb-3">
            <span className="border-b-4 border-iconBlue">Following</span>
          </Link>
        </div>
      </div>

      {userId ? (
        <>
          <Share />
          <Feed />
        </>
      ) : (
        <div className="p-4 text-center text-textGray">
          Please log in.
        </div>
      )}
    </div>
  );
};

export default Homepage;