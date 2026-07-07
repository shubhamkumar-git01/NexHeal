"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserCircle, Shield, Activity, Phone, CreditCard, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";

export default function ProfilePage() {
  const { user } = useAuth(false);
  const isDoctor = user?.role?.toLowerCase() !== 'patient';
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal Details");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <DashboardLoading />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 capitalize">{user?.role || "Patient"}</p>
          </div>
        </div>
        <Button className="shadow-sm">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === "Personal Details" ? "text-primary bg-primary/5" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("Personal Details")}
          >
            <UserCircle className="w-4 h-4 mr-2" /> Personal Details
          </Button>

          {isDoctor ? (
            <>
              <Button variant="ghost" className={`w-full justify-start ${activeTab === "Professional" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Professional")}>
                <Activity className="w-4 h-4 mr-2" /> Professional Details
              </Button>
              <Button variant="ghost" className={`w-full justify-start ${activeTab === "Clinic Info" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Clinic Info")}>
                <CreditCard className="w-4 h-4 mr-2" /> Clinic Information
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className={`w-full justify-start ${activeTab === "Medical" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Medical")}>
                <Activity className="w-4 h-4 mr-2" /> Medical Details
              </Button>
              <Button variant="ghost" className={`w-full justify-start ${activeTab === "Insurance" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Insurance")}>
                <CreditCard className="w-4 h-4 mr-2" /> Insurance
              </Button>
            </>
          )}

          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Emergency Contacts" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Emergency Contacts")}>
            <Phone className="w-4 h-4 mr-2" /> Emergency Contacts
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Security" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Security")}>
            <Shield className="w-4 h-4 mr-2" /> Privacy & Security
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Settings" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Settings")}>
            <Lock className="w-4 h-4 mr-2" /> Account Settings
          </Button>
        </div>

        <div className="md:col-span-2 space-y-6">
          {activeTab === "Personal Details" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">First Name</label>
                    <Input defaultValue={user?.firstName || ""} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Last Name</label>
                    <Input defaultValue={user?.lastName || ""} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Email Address</label>
                  <Input defaultValue={user?.email || ""} disabled />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Phone Number</label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
              </CardContent>
            </Card>
          )}

          {isDoctor && activeTab === "Professional" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Specialization</label>
                  <Input defaultValue="General Practitioner" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Experience (Years)</label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">License Number</label>
                  <Input defaultValue="MCI-12345" disabled />
                </div>
              </CardContent>
            </Card>
          )}

          {isDoctor && activeTab === "Clinic Info" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Clinic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Clinic Name</label>
                  <Input defaultValue="NexHeal Central Clinic" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">Working Hours</label>
                  <Input defaultValue="09:00 AM - 05:00 PM" />
                </div>
              </CardContent>
            </Card>
          )}

          {!isDoctor && activeTab === "Medical" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800 opacity-60 pointer-events-none">
              <CardHeader>
                <CardTitle>Medical Details (Coming Soon)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This section is currently unavailable while backend integration is in progress.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
