import { UserRole } from "@/types/jwtPayload";

enum MembershipStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NONMEMBER = "NONMEMBER",
}

/**
 * Interface for the user information associated with an instructor.
 */
export interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc: string | null;
  role: UserRole;
  lastLogin: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

/**
 * Interface for the instructor's details.
 */
export interface InstructorInfo {
  id: string;
  user: UserInfo;
  userTitle: string;
  program: string;
}

export interface StudentInfo {
  id: string;
  userId: string;
  program: string;
  batchYear: number;
  membershipStatus: MembershipStatus;
  user: UserInfo;
  // createdAt: Date;
  // updatedAt: Date;
}
