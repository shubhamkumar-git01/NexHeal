"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, MapPin, Phone, Droplet } from "lucide-react";

export default function VolunteersPage() {
  const volunteers = [
    { id: 1, name: "Aman Gupta", type: "Blood Donor (O+)", location: "2 km away", phone: "+91 9876543210", available: true },
    { id: 2, name: "Sneha Reddy", type: "Medical Volunteer", location: "5 km away", phone: "+91 9876543211", available: false },
    { id: 3, name: "Karan Singh", type: "Ambulance Driver", location: "1 km away", phone: "+91 9876543212", available: true },
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
            <HeartHandshake className="w-8 h-8 mr-3 text-red-500" />
            Volunteer & Donor Network
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Connect with local blood donors and emergency medical volunteers.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white shadow-sm">
          Request Assistance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {volunteers.map((vol, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={vol.id}
          >
            <Card className="dark:bg-[#09090b] dark:border-slate-800 shadow-sm hover:border-red-200 dark:hover:border-red-900/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    {vol.type.includes("Blood") ? <Droplet className="w-6 h-6 fill-current" /> : <HeartHandshake className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${vol.available ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {vol.available ? 'Available Now' : 'Busy'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{vol.name}</h3>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">{vol.type}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4 mr-2" /> {vol.location}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Phone className="w-4 h-4 mr-2" /> {vol.phone}
                  </div>
                </div>
                
                <Button variant={vol.available ? "default" : "outline"} className={`w-full mt-6 ${vol.available ? 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white' : ''}`} disabled={!vol.available}>
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
