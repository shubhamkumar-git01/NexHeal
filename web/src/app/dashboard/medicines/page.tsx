"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import DashboardLoading from "../loading";

export default function MedicinesPage() {
  const [loading, setLoading] = useState(true);

  const medicines = [
    { id: 1, name: "Metformin", dosage: "500mg", instruction: "After dinner", time: "08:00 PM", taken: false, type: "daily" },
    { id: 2, name: "Vitamin D3", dosage: "60k IU", instruction: "After breakfast", time: "09:00 AM", taken: true, type: "weekly" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", instruction: "Before bed", time: "10:00 PM", taken: false, type: "daily" },
  ];

  useEffect(() => {
    // Instant fetch
    setLoading(false);
  }, []);

  if (loading) return <DashboardLoading />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-5xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <Pill className="w-6 h-6 mr-3 text-primary" />
            Medicines
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your active prescriptions and daily schedule.</p>
        </div>
        <Button className="shadow-sm w-full sm:w-auto">
          Add Reminder
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicines.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${med.taken ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{med.name} <span className="text-sm font-normal text-muted-foreground ml-1">({med.dosage})</span></h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {med.time} • {med.instruction}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {med.taken ? (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 mr-1" /> Taken
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="shadow-sm hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20">
                        Mark Taken
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-muted-foreground">Yesterday</span>
                  <span className="font-medium text-emerald-600">100% Taken</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-muted-foreground">2 Days Ago</span>
                  <span className="font-medium text-amber-600 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Missed 1
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
