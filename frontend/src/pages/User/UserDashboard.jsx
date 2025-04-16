import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function UserDashboard() {
  useUserAuth();

  const { user } = useContext(UserContext);
  return <DashboardLayout>UserDashboard</DashboardLayout>;
}
