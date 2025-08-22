import { UserInfo } from "@/types/user-interface";

export function createFullName(userInfo: Partial<UserInfo>) {
  return `${userInfo.firstName} ${userInfo.lastName}`;
}
