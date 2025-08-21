import { UserInfo } from "@/types/user-interface";

export function transformDate(date: Date) {
  return new Date(date).toDateString();
}
