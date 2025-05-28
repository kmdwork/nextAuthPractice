export { auth as middleware } from "@/auth"

// export async function middleware() {

// }
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}