"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Siren, PhoneCall, AlertTriangle, Navigation } from "lucide-react";

export default function EmergencyPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] space-y-8 text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
        <Siren className="w-24 h-24 text-red-600 relative z-10" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Emergency Assistance</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          If you or someone else is experiencing a life-threatening medical emergency, call for help immediately.
        </p>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-8 flex flex-col items-center">
            <PhoneCall className="w-12 h-12 text-red-600 dark:text-red-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">Call Ambulance</h3>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-2">Dial the national emergency number (108)</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/20 overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-8 flex flex-col items-center">
            <Navigation className="w-12 h-12 text-orange-600 dark:text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400">Nearby Hospitals</h3>
            <p className="text-sm text-orange-600/80 dark:text-orange-400/80 mt-2">Locate the closest emergency rooms</p>
          </CardContent>
        </Card>
      </div>

      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-950/30">
        <AlertTriangle className="w-4 h-4 mr-2" />
        Trigger SOS to Emergency Contacts
      </Button>
    </motion.div>
  );
}
