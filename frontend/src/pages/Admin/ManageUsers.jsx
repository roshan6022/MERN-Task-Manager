import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setDownloadingReport(true);
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user report:", error);
      toast.error("Failed to download user report. Please try again.");
    } finally {
      setDownloadingReport(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-medium">Team Members</h2>

          <button
            onClick={handleDownloadReport}
            disabled={downloadingReport}
            className={`flex items-center gap-2 download-btn ${
              downloadingReport ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {downloadingReport ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                Downloading...
              </>
            ) : (
              <>
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </>
            )}
          </button>
        </div>

        {loadingUsers ? (
          <div className="flex justify-center mt-10">
            <button
              disabled
              className="px-4 py-2 rounded bg-blue-500 text-white flex items-center gap-2 cursor-not-allowed"
            >
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
              Loading users...
            </button>
          </div>
        ) : allUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No users found.</div>
        )}
      </div>
    </DashboardLayout>
  );
}
