import { UserInfo } from "@/types/user-interface";

export function createFullName(userInfo: UserInfo) {
  return `${userInfo.firstName} ${userInfo.lastName}`;
}
