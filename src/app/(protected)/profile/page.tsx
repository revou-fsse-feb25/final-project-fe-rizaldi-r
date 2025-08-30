"use client";

import Layout from "@/components/_commons/layout/Layout";
import UserProfilePage, { UserProfile } from "@/components/_commons/profile/UserProfilePage";
import { useFetchData } from "@/hooks/useFetchApi";
import { fetchCurrentUser, patchCurrentUser } from "@/services/api";
import { UserInfo } from "@/types/user-interface";
import { useSession } from "next-auth/react";

// With API integration
export default function ProfilePage() {
  // fetch token
  const { data: session } = useSession();
  const token = session?.accessToken;

  // fetch user data
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: errorUserData,
  } = useFetchData<UserInfo, []>(fetchCurrentUser, token);

  const handleUpdateProfile = async (field: keyof UserProfile, value: string) => {
    try {
      const response = await patchCurrentUser(token || "", { [field]: value });

      if (!response) throw new Error("Update failed");
    } catch (error) {
      throw error; // Component will handle the error display
    }
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { avatarUrl } = await response.json();
      return avatarUrl;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout>
      {isLoadingUserData ? (
        <>Loading...</>
      ) : (
        <UserProfilePage
          initialProfile={userData}
          onUpdateProfile={handleUpdateProfile}
          onUploadAvatar={handleUploadAvatar}
        />
      )}
    </Layout>
  );
}
