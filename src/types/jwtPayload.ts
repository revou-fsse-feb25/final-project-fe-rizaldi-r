import { DefaultSession } from "next-auth";

export enum UserRole {
  STUDENT="STUDENT",
  INSTRUCTOR="INSTRUCTOR",
  ADMIN="ADMIN",
}

export interface SessionItf extends DefaultSession {
  accessToken: string;
  user: DefaultSession["user"] & {
    role: UserRole;
  };
}
