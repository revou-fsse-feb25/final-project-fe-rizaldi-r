import { DefaultSession } from "next-auth";

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export interface SessionItf extends DefaultSession {
  accessToken: string;
  user: DefaultSession["user"] & {
    role: UserRole;
  };
}
