"use client";

import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "./loading";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth(true);

  if (isLoading || !user) {
    return <DashboardLoading />;
  }

  const isPatient = user.role?.toLowerCase() === 'patient';

  if (isPatient) {
    return <PatientDashboard user={user} />;
  }

  return <DoctorDashboard user={user} logout={logout} />;
}
