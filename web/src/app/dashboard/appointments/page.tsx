"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarCheck, Clock, Video, MapPin, Search, Filter, Plus, FileText, CheckCircle2, XCircle, UserCheck, Stethoscope } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Calendar } from "@/components/ui/calendar";
import DashboardLoading from "../loading";
import Link from "next/link";

export default function AppointmentsPage() {
  const { user } = useAuth(false);
  const isPatient = user?.role?.toLowerCase() === 'patient';
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Upcoming");
  const [date, setDate] = useState<Date | undefined>(new Date());

  interface Appointment {
    id: number;
    name: string;
    time: string;
    type: string;
    status: string;
    color: string;
    date: string;
    queuePosition?: number;
    expectedTime?: string;
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Synchronously set data so it doesn't hang
    setAppointments([
      { id: 1, name: isPatient ? "Dr. Rahul Sharma" : "Rahul Sharma", time: "10:30 AM - 11:00 AM", type: "Video Consult", status: "IN_CONSULTATION", color: "blue", date: "Today" },
      { id: 2, name: isPatient ? "Dr. Priya Singh" : "Priya Singh", time: "11:15 AM - 11:45 AM", type: "Clinic Visit", status: "CHECKED_IN", color: "amber", date: "Today", queuePosition: 2, expectedTime: "11:20 AM" },
      { id: 3, name: isPatient ? "Dr. Amit Kumar" : "Amit Kumar", time: "01:00 PM - 01:30 PM", type: "Video Consult", status: "CONFIRMED", color: "emerald", date: "Today" },
      { id: 4, name: "Dr. Smith", time: "10:00 AM - 10:30 AM", type: "Clinic Visit", status: "COMPLETED", color: "slate", date: "Yesterday" },
    ]);
    setLoading(false);
  }, [isPatient]);

  if (loading) return <DashboardLoading />;

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || apt.status.includes(filter) || (filter === "History" && (apt.status === "COMPLETED" || apt.status === "CANCELLED" || apt.status === "NO_SHOW")) || (filter === "Upcoming" && ["REQUESTED", "CONFIRMED", "CHECKED_IN", "IN_CONSULTATION"].includes(apt.status));
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-6xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <CalendarCheck className="w-6 h-6 mr-3 text-primary" />
            Appointments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your consultations, history, and bookings.</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          {isPatient && (
            <Link href="/dashboard/appointments/book" className="w-full sm:w-auto">
              <Button className="w-full shadow-sm">
                <Plus className="w-4 h-4 mr-2" /> Book Consult
              </Button>
            </Link>
          )}
          {!isPatient && (
            <Button variant="outline" className="w-full sm:w-auto shadow-sm">
              <CalendarCheck className="w-4 h-4 mr-2" /> Sync Calendar
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder={`Search ${isPatient ? 'doctors' : 'patients'}...`} 
            className="pl-10 bg-white dark:bg-[#09090b] shadow-sm border-slate-200 dark:border-slate-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["Upcoming", "REQUESTED", "CONFIRMED", "CHECKED_IN", "History", "All"].map((f) => (
            <Button 
              key={f} 
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="shrink-0 rounded-full"
              onClick={() => setFilter(f)}
            >
              {f === "All" && <Filter className="w-3 h-3 mr-2" />}
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Timeline View */}
        <Card className="md:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>{filter === 'History' ? 'Past Consultations' : 'Schedule Timeline'}</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-xl border-slate-300 dark:border-slate-700">
                <CalendarCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold">No appointments found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or booking a new consultation.</p>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                {filteredAppointments.map((apt, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={apt.id} 
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] ${apt.status === 'IN_CONSULTATION' ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-all ${apt.status === 'IN_CONSULTATION' ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-${apt.color}-600 bg-${apt.color}-100 dark:text-${apt.color}-400 dark:bg-${apt.color}-900/30`}>
                          {apt.date} • {apt.time}
                        </span>
                        {apt.type.includes('Video') ? <Video className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mt-2">{apt.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{apt.type} • Status: <span className="font-bold text-foreground">{apt.status.replace("_", " ")}</span></p>
                      
                      {apt.queuePosition && (
                        <div className="mt-2 mb-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-md p-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Queue Position: #{apt.queuePosition}</span>
                          <span className="text-xs text-amber-600 dark:text-amber-500">Exp: {apt.expectedTime}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-4">
                        {isPatient ? (
                          <>
                            {apt.status === "IN_CONSULTATION" && (
                              <Link href={`/consult/${apt.id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                  <Video className="w-4 h-4 mr-2" /> Join Call
                                </Button>
                              </Link>
                            )}
                            {apt.status === "CONFIRMED" && (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex-1">
                                <UserCheck className="w-4 h-4 mr-2" /> Check-in
                              </Button>
                            )}
                            {apt.status === "REQUESTED" && (
                              <Button size="sm" variant="outline" className="shadow-sm flex-1 text-amber-600 border-amber-200">Awaiting Approval</Button>
                            )}
                            {["REQUESTED", "CONFIRMED", "CHECKED_IN"].includes(apt.status) && (
                              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive flex-1">Cancel</Button>
                            )}
                            {apt.status === "COMPLETED" && (
                              <Button size="sm" variant="outline" className="flex-1"><FileText className="w-4 h-4 mr-2" /> Download Rx</Button>
                            )}
                          </>
                        ) : (
                          <>
                            {apt.status === "REQUESTED" && (
                              <>
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex-1"><CheckCircle2 className="w-4 h-4 mr-2" /> Approve</Button>
                                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 flex-1"><XCircle className="w-4 h-4 mr-2" /> Reject</Button>
                              </>
                            )}
                            {apt.status === "CHECKED_IN" && (
                              <Link href={`/consult/${apt.id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"><Stethoscope className="w-4 h-4 mr-2" /> Start Consult</Button>
                              </Link>
                            )}
                            {apt.status === "IN_CONSULTATION" && (
                              <Link href={`/consult/${apt.id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"><Video className="w-4 h-4 mr-2" /> Join Call</Button>
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mini Calendar & Stats */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 h-fit">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 h-fit bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-primary-foreground">Queue Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-primary-foreground/20 pb-2">
                  <span>Checked In</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary-foreground/20 pb-2">
                  <span>In Consultation</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Waiting</span>
                  <span className="font-bold">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
