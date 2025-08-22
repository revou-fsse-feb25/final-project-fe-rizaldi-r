"use client";

import CourseFilterSection from "@/components/_commons/CourseFilterSection";
import Header from "@/components/_commons/Header";
import Layout from "@/components/_commons/layout/Layout";
import CoursePerformance from "@/components/lecturer/student-performance/CoursePerformance";
import { useFetchData } from "@/hooks/useFetchData";
import {
  deleteUser,
  fetchCategoryList,
  fetchCourseByInstructor,
  fetchUsers,
  patchUserRole,
} from "@/services/api";
import { CourseDetails } from "@/types/course-interface";
import { UserRole } from "@/types/jwtPayload";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const courseStatusExcluded = ["Not Enrolled", "Enrolled"];

export default function userListPage() {
  // const [users, setUsers] = useState(mockUsers);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deletingStatus, setDeletingStatus] = useState("");
  const [message, setMessage] = useState("");

  const { data: session } = useSession();
  const token = session?.accessToken;

  // fetch users
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useFetchData(fetchUsers, token);
  console.log("🚀 ~ users:", users);

  // Handles updating a user's role in the state.
  const handleRoleChange = async (userId, newRole) => {
    setMessage("");

    const payload = { role: newRole };
    if (newRole === UserRole.INSTRUCTOR) {
      payload.program = "WEBDEV";
    } else if (newRole === UserRole.STUDENT) {
      payload.program = "WEBDEV";
      payload.batchYear = 2025;
    }

    try {
      const response = await patchUserRole(token, userId, payload);
      refetchUsers();
      setMessage("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      setMessage("Failed to update role.");
    }
  };

  // Initiates the deletion confirmation process.
  const initiateDelete = (userId) => {
    setDeletingUserId(userId);
    setDeletingStatus("");
    setMessage("");
  };

  const confirmDelete = async (userId) => {
    setDeletingStatus("deleting");
    setMessage("Deleting user...");

    try {
      const response = await deleteUser(token, userId);
      refetchUsers();
      setDeletingUserId(null);
      setDeletingStatus("deleted");
      setMessage("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setDeletingStatus("");
      setMessage("Failed to delete user.");
    }
  };

  // Cancels the deletion confirmation.
  const cancelDelete = () => {
    setDeletingUserId(null);
    setDeletingStatus("");
    setMessage("");
  };

  if (isLoadingUsers) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen">
        <div className="bg-white py-4 px-2 sm:py-8 sm:px-4 lg:px-10 rounded-lg w-full max-w-4xl border border-slate-300">
          <h1 className="text-2xl font-semibold mb-6 text-center">User List</h1>

          {/* User list table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 min-w-40">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="INSTRUCTOR">INSTRUCTOR</option>
                        <option value="STUDENT">STUDENT</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {deletingUserId === user.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 text-xs">Are you sure?</span>
                          <button
                            onClick={() => confirmDelete(user.id)}
                            disabled={deletingStatus === "deleting"}
                            className={`px-3 py-1 text-xs rounded-md text-white font-medium transition-all duration-200 shadow-sm ${
                              deletingStatus === "deleting"
                                ? "bg-red-300 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            {deletingStatus === "deleting" ? "..." : "Yes"}
                          </button>
                          <button
                            onClick={cancelDelete}
                            disabled={deletingStatus === "deleting"}
                            className="px-3 py-1 text-xs rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors duration-200 shadow-sm"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => initiateDelete(user.id)}
                          className="flex items-center text-red-600 hover:text-red-800"
                          title="Delete user"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* User list cards for small screens */}
          <div className="md:hidden">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {deletingUserId === user.id ? (
                      <>
                        <span className="text-gray-700 text-xs">Sure?</span>
                        <button
                          onClick={() => confirmDelete(user.id)}
                          disabled={deletingStatus === "deleting"}
                          className={`px-2 py-1 text-xs rounded-md text-white font-medium ${
                            deletingStatus === "deleting"
                              ? "bg-red-300"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {deletingStatus === "deleting" ? "..." : "Yes"}
                        </button>
                        <button
                          onClick={cancelDelete}
                          disabled={deletingStatus === "deleting"}
                          className="px-2 py-1 text-xs rounded-md bg-gray-300 text-gray-800"
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => initiateDelete(user.id)}
                        className="flex items-center text-red-600 hover:text-red-800"
                        title="Delete user"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">{user.email}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Role:</span>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="mt-1 block pl-3 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="INSTRUCTOR">INSTRUCTOR</option>
                    <option value="STUDENT">STUDENT</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                deletingStatus === "deleted" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
