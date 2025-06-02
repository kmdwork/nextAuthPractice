import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const config: NextAuthConfig = {
    providers: [
        GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET }),
        Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({request, auth}) {
            try {
                const { pathname } = request.nextUrl;
                if(pathname === "/protected-page") return !!auth;
                return true;
            } catch (err) {
                console.log(err);
            }
        },
        jwt({token, trigger, session, user}) {
            if(user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }

            if(trigger === "update") token.name = session.user.name;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
            session.user.id = token.id as string; // ここが重要！
            }
            return session;
        },
    },
    trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);