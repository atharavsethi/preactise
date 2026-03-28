import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DJANGO_API_URL } from "./constants";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const res = await fetch(`${DJANGO_API_URL}/api/auth/token/`, {
            method: 'POST',
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          if (res.ok && data.access) {
            // Fetch user profile from Django using the fresh JWT
            const profileRes = await fetch(`${DJANGO_API_URL}/api/auth/me/`, {
               headers: { "Authorization": `Bearer ${data.access}` }
            });
            const profileData = await profileRes.json();
            
            return {
              id: profileData.id.toString(),
              email: profileData.email,
              name: profileData.name,
              role: profileData.role,
              accessToken: data.access,
            } as any;
          }
          return null;
        } catch (e) {
          console.error("Django Auth Error:", e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev_medtrust"
};
