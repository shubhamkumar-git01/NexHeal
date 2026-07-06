"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Activity, FileText } from "lucide-react";

export default function PatientsPage() {
  const dummyPatients = [
    { id: "P-1001", name: "Rahul Sharma", age: 34, gender: "Male", condition: "Hypertension", lastVisit: "2 days ago", risk: "Medium" },
    { id: "P-1002", name: "Priya Singh", age: 28, gender: "Female", condition: "PCOS", lastVisit: "1 week ago", risk: "Low" },
    { id: "P-1003", name: "Anil Verma", age: 56, gender: "Male", condition: "Type 2 Diabetes", lastVisit: "Today", risk: "High" },
    { id: "P-1004", name: "Sunita Devi", age: 45, gender: "Female", condition: "Asthma", lastVisit: "3 weeks ago", risk: "Low" },
    { id: "P-1005", name: "Vikram Malhotra", age: 62, gender: "Male", condition: "Cardiac Arrhythmia", lastVisit: "Yesterday", risk: "High" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Patient Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your patients, view medical history, and analyze risks.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          + Add New Patient
        </Button>
      </div>

      <Card className="dark:bg-[#09090b] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search patients by name, ID, or condition..." className="pl-9 dark:bg-slate-900 dark:border-slate-800" />
            </div>
            <Button variant="outline" className="dark:border-slate-700 dark:hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filter Records
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 uppercase border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Patient Info</th>
                  <th className="px-6 py-4 font-medium">Primary Condition</th>
                  <th className="px-6 py-4 font-medium">AI Risk Level</th>
                  <th className="px-6 py-4 font-medium">Last Visit</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {dummyPatients.map((patient, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    key={patient.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{patient.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{patient.id} • {patient.age} yrs • {patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                      {patient.condition}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        patient.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50' :
                        patient.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50'
                      }`}>
                        <Activity className="w-3 h-3 mr-1" />
                        {patient.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
