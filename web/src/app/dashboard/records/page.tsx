"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, FileArchive } from "lucide-react";

export default function RecordsPage() {
  const records = [
    { id: "REC-1", type: "Blood Report", date: "Oct 12, 2026", size: "1.2 MB", uploadedBy: "City Lab" },
    { id: "REC-2", type: "MRI Scan", date: "Sep 28, 2026", size: "14.5 MB", uploadedBy: "Dr. Sharma" },
    { id: "REC-3", type: "Prescription", date: "Sep 15, 2026", size: "450 KB", uploadedBy: "Dr. Smith" },
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center">
            <FileArchive className="w-8 h-8 mr-3 text-blue-600" />
            Medical Records
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Securely manage and share patient medical history and lab reports.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Upload className="w-4 h-4 mr-2" /> Upload Record
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={record.id}
          >
            <Card className="dark:bg-[#09090b] dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-5 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">{record.type}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{record.date} • {record.size}</p>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Download className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
