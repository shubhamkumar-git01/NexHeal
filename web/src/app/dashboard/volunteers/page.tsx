"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartHandshake, MapPin, Search, Droplet, Users, ShieldCheck, Activity, Award, CheckCircle2, Clock, AlertTriangle, Building2, PhoneCall } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { VolunteerCard } from "@/components/dashboard/VolunteerCard";
import DashboardLoading from "../loading";
import { cn } from "@/lib/utils";

export default function VolunteersPage() {
  const { user } = useAuth(false);
  const role = user?.role?.toLowerCase() || 'patient';
  const isVolunteer = role === 'volunteer' || role === 'responder';
  const isNgo = role === 'ngo';

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(isVolunteer ? "Dashboard" : isNgo ? "NGO Ops" : "Network");
  const [searchQuery, setSearchQuery] = useState("");

  const volunteerAnalytics = {
    hoursServed: 120,
    requestsCompleted: 45,
    avgResponseTime: "8 mins",
    donationsMade: 12,
    reputation: 4.8,
    rank: "Platinum Volunteer"
  };

  const badges = ["First Responder", "Blood Hero", "Platinum Volunteer", "Emergency Guardian"];

  const volunteers = [
    { id: 1, name: "Aman Gupta", type: "Blood Donor (O+)", location: "2 km away", phone: "+91 9876543210", available: true },
    { id: 2, name: "Sneha Reddy", type: "Medical Volunteer", location: "5 km away", phone: "+91 9876543211", available: false },
    { id: 3, name: "Karan Singh", type: "Ambulance Driver", location: "1 km away", phone: "+91 9876543212", available: true },
  ];

  const ngos = [
    { id: 1, name: "LifeSavers India", type: "Blood Bank", location: "City Center", contact: "1800-111-222" },
    { id: 2, name: "Hope Foundation", type: "Emergency Relief NGO", location: "North District", contact: "1800-333-444" },
  ];

  const emergencyRequests = [
    { id: "REQ-901", title: "O+ Blood Required", distance: "3 km away", urgency: "Critical", time: "10 mins ago" },
    { id: "REQ-902", title: "Medical Assistance at Accident Site", distance: "5 km away", urgency: "High", time: "25 mins ago" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) return <DashboardLoading />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <HeartHandshake className="w-8 h-8 mr-3 text-destructive" />
            Volunteer & Community Response
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Connect with local blood donors, NGOs, and emergency medical volunteers.
          </p>
        </div>
        {!isVolunteer && (
          <Button variant="destructive" className="shadow-sm">Become a Volunteer</Button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {isVolunteer && (
          <Button variant={activeTab === "Dashboard" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Dashboard")}>
            <Activity className="w-4 h-4 mr-2" /> My Dashboard
          </Button>
        )}
        {isNgo && (
          <Button variant={activeTab === "NGO Ops" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("NGO Ops")}>
            <Building2 className="w-4 h-4 mr-2" /> NGO Operations
          </Button>
        )}
        <Button variant={activeTab === "Network" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Network")}>
          <Search className="w-4 h-4 mr-2" /> Find Responders
        </Button>
        <Button variant={activeTab === "NGOs" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("NGOs")}>
          <Building2 className="w-4 h-4 mr-2" /> NGOs & Blood Banks
        </Button>
        {isVolunteer && (
          <Button variant={activeTab === "Profile" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Profile")}>
            <ShieldCheck className="w-4 h-4 mr-2" /> Profile & Certificates
          </Button>
        )}
      </div>

      {activeTab === "Dashboard" && isVolunteer && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-destructive/5 border-destructive/10">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Status</p>
                <p className="text-xl font-bold text-destructive flex items-center justify-center"><CheckCircle2 className="w-5 h-5 mr-1" /> Available</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Completed</p>
                <p className="text-2xl font-bold">{volunteerAnalytics.requestsCompleted}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Reputation</p>
                <p className="text-2xl font-bold text-amber-500">{volunteerAnalytics.reputation} / 5</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Rank</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center justify-center mt-2"><Award className="w-4 h-4 mr-1" /> {volunteerAnalytics.rank}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-bold flex items-center"><Award className="w-4 h-4 mr-2 text-amber-500" /> Gamification & Badges</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-wrap gap-2">
              {badges.map(b => (
                <span key={b} className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold flex items-center">
                  <Award className="w-3 h-3 mr-1" /> {b}
                </span>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-destructive" /> Emergency Requests Near You</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {emergencyRequests.map((req, idx) => (
                <div key={idx} className="p-4 border-b last:border-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", req.urgency === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400')}>{req.urgency}</span>
                      <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {req.time}</span>
                    </div>
                    <h3 className="font-bold mt-1 text-slate-900 dark:text-slate-100">{req.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> {req.distance}</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none">Reject</Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1 md:flex-none text-white">Accept & Navigate</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "Network" && (
        <div className="space-y-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search by blood group, skill, or name..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {volunteers.map((vol, idx) => (
              <VolunteerCard 
                key={vol.id}
                id={vol.id}
                name={vol.name}
                type={vol.type}
                location={vol.location}
                phone={vol.phone}
                available={vol.available}
                idx={idx}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "NGOs" && (
        <div className="grid gap-4 md:grid-cols-2">
          {ngos.map((ngo) => (
            <Card key={ngo.id} className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{ngo.name}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{ngo.type}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground"><MapPin className="w-4 h-4 mr-2" /> {ngo.location}</div>
                  <div className="flex items-center text-sm text-muted-foreground"><PhoneCall className="w-4 h-4 mr-2" /> {ngo.contact}</div>
                </div>
                <Button className="w-full mt-4" variant="outline">Contact Organization</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Profile" && isVolunteer && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto flex items-center justify-center overflow-hidden">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.email ? user.email.split('@')[0] : "Volunteer"}</h2>
                <p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                  <Droplet className="w-3 h-3 mr-1 text-destructive" /> O+ Blood Group
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-2 rounded-lg text-sm font-medium flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 mr-2" /> Identity Verified
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Verification Workflow & Certificates</CardTitle>
              <CardDescription>Complete these steps to unlock QR-verifiable certificates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div>
                  <p className="font-semibold text-sm">Identity Verification (Aadhaar/ID)</p>
                  <p className="text-xs text-muted-foreground">Required for all volunteers</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div>
                  <p className="font-semibold text-sm">QR-Verifiable Certificate</p>
                  <p className="text-xs text-muted-foreground">Blockchain-secured Volunteer Certificate</p>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">View QR Certificate</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "NGO Ops" && isNgo && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Active Campaigns</p>
                <p className="text-2xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Relief Kits</p>
                <p className="text-2xl font-bold text-emerald-600">1,250</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Volunteers</p>
                <p className="text-2xl font-bold text-blue-600">84</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Warehouses</p>
                <p className="text-2xl font-bold">2</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg flex items-center"><Building2 className="w-5 h-5 mr-2" /> Distribution History</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h4 className="font-bold">Flood Relief Phase 1</h4>
                    <p className="text-sm text-muted-foreground">North District • 500 Beneficiaries</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">Medical Equipment Drive</h4>
                    <p className="text-sm text-muted-foreground">City Hospital • 20 Oxygen Concentrators</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">In Progress</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
