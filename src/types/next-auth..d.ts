// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole } from "./JwtPayload";

declare module "next-auth" {
  /**
   * The user object returned by the `authorize` callback.
   * This is what gets passed to the `jwt` callback.
   */
  interface User {
    role: UserRole;
    accessToken: string;
    imageAvatar: string
    username: string
  }

  /**
   * The session object returned by `useSession`, `getSession` and `getServerSession`.
   */
  interface Session extends DefaultSession {
    accessToken: string;
    user: DefaultSession["user"] & {
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT payload, which is what is encrypted and stored in the cookie.
   */
  interface JWT extends DefaultJWT {
    role: UserRole;
    accessToken: string;
  }
}
