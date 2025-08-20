import { setDefaultAuthHeader } from "@/services/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Generate access token
        const res = await fetch(`${BaseUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const responseBody = await res.text();
        if (!res.ok) {
          console.error("API login failed:", responseBody);
          return null;
        }
        const loginData = JSON.parse(responseBody);
        const accessToken = loginData.access_token;
        if (!accessToken) {
          console.error("Login API did not return an access token.");
          return null;
        }

        // Get the data
        const profileRes = await fetch(`${BaseUrl}/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const profileResponseBody = await profileRes.text();
        if (!profileRes.ok) {
          console.error("Profile API failed:", profileResponseBody);
          return null;
        }
        const profileData = JSON.parse(profileResponseBody);
        if (profileData && profileData.id) {
          return {
            id: String(profileData.id),
            username: profileData.username,
            email: profileData.email,
            imageAvatar: profileData.avatarSrc,
            role: profileData.role,
            accessToken: accessToken,
          };
        } else {
          console.error(
            "Authorize: API returned invalid user data structure or missing token/ID:",
            profileData
          );
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.role = user.role;
        token.name = user.username;
        token.picture = user.imageAvatar;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ token, user, session }) {
      // access token get exposed so it can comunicate using Authorization: Bearer header
      if (token.role) session.user.role = token.role;
      if (token.name) session.user.name = token.name;
      if (token.picture) session.user.image = token.picture;
      if (token.accessToken) session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
