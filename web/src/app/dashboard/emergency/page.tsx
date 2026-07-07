"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Siren, PhoneCall, Navigation, Droplet, HeartHandshake, Users, AlertTriangle, CheckCircle2, Clock, MapPin, Ambulance } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EmergencyPage() {
  const { user } = useAuth(false);
  const role = user?.role?.toLowerCase() || 'patient';
  const isPatient = role === 'patient';
  const isDoctor = role === 'doctor';
  const isVolunteer = role === 'volunteer';
  const isAdmin = role === 'admin';
  
  const [loading, setLoading] = useState(true);
  
  // Patient State
  const [isSosDialogOpen, setIsSosDialogOpen] = useState(false);
  const [sosReason, setSosReason] = useState("");
  const [sosPriority, setSosPriority] = useState("Critical");
  const [isSosSubmitting, setIsSosSubmitting] = useState(false);
  const [activeIncident, setActiveIncident] = useState<any>(null);

  // Global State (For non-patients)
  const [incidents, setIncidents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Active");

  const contacts = [
    { name: "Rahul Sharma (Brother)", phone: "+91 9876543210", type: "Family" },
    { name: "Dr. Anil (Family Doc)", phone: "+91 9123456789", type: "Doctor" },
    { name: "City Hospital", phone: "108", type: "Hospital" },
    { name: "Police", phone: "100", type: "Police" }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (!isPatient) {
        setIncidents([
          { id: "EMG-102", patient: "Rahul Sharma", reason: "Heart Attack", priority: "Critical", status: "Ambulance Assigned", time: "10 mins ago", location: "Sector 4, City Center" },
          { id: "EMG-101", patient: "Sneha Patel", reason: "Accident", priority: "High", status: "Pending", time: "2 mins ago", location: "Highway 12" },
        ]);
      }
      setLoading(false);
    }, 800);
  }, [isPatient]);

  const handleSosTrigger = () => {
    setIsSosDialogOpen(true);
  };

  const handleSosConfirm = () => {
    if (!sosReason) return;
    setIsSosSubmitting(true);
    setTimeout(() => {
      setIsSosSubmitting(false);
      setIsSosDialogOpen(false);
      setActiveIncident({
        id: "EMG-103",
        reason: sosReason,
        priority: sosPriority,
        status: "Created",
        timeline: [
          { status: "Created", time: new Date().toLocaleTimeString(), completed: true },
          { status: "Accepted by Command Center", time: "", completed: false },
          { status: "Ambulance Assigned", time: "", completed: false },
          { status: "Hospital Assigned", time: "", completed: false },
          { status: "Resolved", time: "", completed: false },
        ]
      });
    }, 1500);
  };

  const cancelSos = () => {
    setActiveIncident(null);
  };

  if (loading) return <DashboardLoading />;

  // -------------------------------------------------------------
  // PATIENT VIEW
  // -------------------------------------------------------------
  if (isPatient) {
    if (activeIncident) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 pb-12">
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-200 dark:border-red-900 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 animate-pulse">
                <Siren className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">Emergency Active</h1>
                <p className="font-medium text-red-600/80">ID: {activeIncident.id} • {activeIncident.reason}</p>
              </div>
            </div>
            <Button variant="destructive" onClick={cancelSos}>Cancel Emergency</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Timeline</CardTitle>
                <CardDescription>Track the status of your emergency request.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {activeIncident.timeline.map((step: any, i: number) => (
                    <div key={i} className="relative flex items-center gap-4">
                      <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] z-10 shrink-0", step.completed ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400")}>
                        {step.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className={cn("font-semibold", step.completed ? "text-slate-900 dark:text-slate-100" : "text-slate-500")}>{step.status}</h4>
                        {step.time && <p className="text-xs text-muted-foreground">{step.time}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border">
                    <Ambulance className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-medium">Ambulance Status</p>
                      <p className="text-sm text-muted-foreground">Searching for nearest ambulance...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border">
                    <HeartHandshake className="w-8 h-8 text-emerald-500" />
                    <div>
                      <p className="font-medium">Volunteer Status</p>
                      <p className="text-sm text-muted-foreground">Alert broadcasted to nearby volunteers.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contacts.slice(0,2).map((c, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </div>
                      <Button size="sm" variant="outline"><PhoneCall className="w-3 h-3 mr-2" /> Call</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6 bg-red-50 dark:bg-red-950/20 py-12 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-10 rounded-full animate-pulse"></div>
          
          <Button 
            variant="destructive" 
            size="lg"
            onClick={handleSosTrigger}
            className="w-32 h-32 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all relative z-10 flex flex-col items-center justify-center space-y-2 bg-red-600 hover:bg-red-700"
          >
            <Siren className="w-10 h-10 animate-pulse" />
            <span className="font-extrabold text-xl tracking-wider">SOS</span>
          </Button>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl font-extrabold tracking-tight text-red-700 dark:text-red-400">Emergency Assistance</h1>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-2 font-medium">
              Pressing SOS will instantly alert your emergency contacts, nearby hospitals, and assigned volunteers.
            </p>
          </div>
        </div>

        <Dialog open={isSosDialogOpen} onOpenChange={setIsSosDialogOpen}>
          <DialogContent className="sm:max-w-md border-red-200 dark:border-red-900">
            <DialogHeader>
              <DialogTitle className="text-red-600 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Confirm Emergency</DialogTitle>
              <DialogDescription>Please provide a quick reason so responders know how to help.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nature of Emergency</label>
                <Select value={sosReason} onValueChange={(v) => setSosReason(v || "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                    <SelectItem value="Accident">Accident / Trauma</SelectItem>
                    <SelectItem value="Heart Attack">Suspected Heart Attack</SelectItem>
                    <SelectItem value="Stroke">Suspected Stroke</SelectItem>
                    <SelectItem value="Pregnancy">Pregnancy / Labor</SelectItem>
                    <SelectItem value="Fire">Fire / Burn</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority Level</label>
                <Select value={sosPriority} onValueChange={(v) => setSosPriority(v || "")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical (Life Threatening)</SelectItem>
                    <SelectItem value="High">High (Urgent Care Needed)</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="ghost" onClick={() => setIsSosDialogOpen(false)}>Cancel</Button>
              <Button type="button" variant="destructive" onClick={handleSosConfirm} disabled={!sosReason || isSosSubmitting}>
                {isSosSubmitting ? "Broadcasting..." : "Broadcast SOS"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Call Ambulance</h3>
              <p className="text-xs text-muted-foreground">Dial national emergency 108</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                <Navigation className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Nearest Hospital</h3>
              <p className="text-xs text-muted-foreground">Locate closest emergency rooms</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                <Droplet className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Blood Requirement</h3>
              <p className="text-xs text-muted-foreground">Request emergency blood donors</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 dark:border-emerald-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Request Volunteer</h3>
              <p className="text-xs text-muted-foreground">Ask local volunteers for help</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Emergency Contacts
            </CardTitle>
            <Button variant="outline" size="sm">Add Contact</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact, i) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{contact.name}</p>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">{contact.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{contact.phone}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 flex-1 sm:flex-none">
                      <PhoneCall className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // DOCTOR / ADMIN / VOLUNTEER VIEW
  // -------------------------------------------------------------
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-red-600 flex items-center">
            <Siren className="w-6 h-6 mr-3" /> Emergency Command Center
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor and respond to active emergency incidents.</p>
        </div>
      </div>

      <div className="flex gap-2 pb-2">
        {["Active", "Pending", "Resolved", "History"].map((tab) => (
          <Button 
            key={tab} 
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveTab(tab)}
          >
            {tab} {tab === "Active" && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{incidents.length}</span>}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {incidents.length === 0 ? (
          <div className="p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            No active emergencies at the moment.
          </div>
        ) : (
          incidents.map((inc) => (
            <Card key={inc.id} className={cn("overflow-hidden transition-all hover:shadow-md", inc.priority === 'Critical' ? "border-red-300 dark:border-red-900/50" : "")}>
              <div className={cn("h-1 w-full", inc.priority === 'Critical' ? "bg-red-500" : "bg-orange-500")} />
              <CardContent className="p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{inc.patient}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600">{inc.id}</span>
                  </div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">{inc.reason} • {inc.priority}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {inc.location}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {inc.time}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                    {inc.status}
                  </span>
                  <div className="flex gap-2 w-full mt-2">
                    {isDoctor && (
                      <Link href="/dashboard/patients/PT-001" className="flex-1 md:flex-none">
                        <Button size="sm" variant="outline" className="w-full">View Records</Button>
                      </Link>
                    )}
                    {isVolunteer && (
                      <>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 md:flex-none">Accept Request</Button>
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none text-destructive">Reject</Button>
                      </>
                    )}
                    {isAdmin && (
                      <Button size="sm" className="flex-1 md:flex-none">Manage Incident</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
