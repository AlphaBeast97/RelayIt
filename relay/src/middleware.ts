import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/recording",
  "/previous",
  "/personal-room",
  "/meeting(.*)",
]);

export default clerkMiddleware(async (auth: any, req: any) => {
  // Re-enable route protection
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
