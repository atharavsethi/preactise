export { default } from "next-auth/middleware"

export const config = {
  // Protect all routes EXCEPT the public ones listed here
  matcher: [
    "/((?!api/auth|api/register|_next/static|_next/image|favicon.ico|logo.png|login|register).*)",
  ],
}
