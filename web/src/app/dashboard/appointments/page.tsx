"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, Video, MapPin } from "lucide-react";

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, name: "Rahul Sharma", time: "10:30 AM - 11:00 AM", type: "Video Consult", status: "Upcoming", color: "blue" },
    { id: 2, name: "Priya Singh", time: "11:15 AM - 11:45 AM", type: "Clinic Visit", status: "Confirmed", color: "emerald" },
    { id: 3, name: "Amit Kumar", time: "01:00 PM - 01:30 PM", type: "Video Consult", status: "Waiting", color: "amber" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Schedule</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your daily appointments and consultations.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="dark:border-slate-800 dark:hover:bg-slate-900">
            <CalendarCheck className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Slot
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Timeline View */}
        <Card className="md:col-span-2 dark:bg-[#09090b] dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Today's Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
              {appointments.map((apt, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  key={apt.id} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-all ${idx === 0 ? 'ring-1 ring-blue-500/50 border-blue-500/50' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-${apt.color}-600 dark:text-${apt.color}-400`}>
                        {apt.time}
                      </span>
                      {apt.type.includes('Video') ? <Video className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mt-2">{apt.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{apt.type}</p>
                    {idx === 0 && (
                      <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        <Video className="w-4 h-4 mr-2" /> Join Call
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mini Calendar */}
        <Card className="dark:bg-[#09090b] dark:border-slate-800 h-fit shadow-sm">
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
              [Calendar Component Placeholder]
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
