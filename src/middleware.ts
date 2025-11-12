import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import prisma from "@/prisma";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth(); // ← Așteaptă + redirect

  if (isProtectedRoute(req) && !userId) {
    return redirectToSignIn(); // ← CORECT
  }

if (userId && typeof window === "undefined") {
  void (async () => {
    try {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        const client = await clerkClient(); // ← AȘTEAPTĂ
        const clerkUser = await client.users.getUser(userId); // ← DATE REALE

        await prisma.user.create({
          data: {
            id: userId,
            email: clerkUser.emailAddresses[0].emailAddress,
            username: clerkUser.username || `user_${userId.slice(-8)}`,
            displayName: clerkUser.firstName
              ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
              : "User",
            bio: "New user",
          }
        });
      }
    } catch (error) {
      console.error("User sync failed:", error);
    }
  })();
}
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};