"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, MapPin, Video, Building2, UserPlus, Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Stethoscope, AlertTriangle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from "next/navigation";

function BookAppointmentContent() {
  const { user } = useAuth(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSpecialty = searchParams.get("specialty")?.toLowerCase().includes("cardio") ? "cardio" 
    : searchParams.get("specialty")?.toLowerCase().includes("derma") ? "derma" 
    : searchParams.get("specialty") ? "general" 
    : "";

  const [step, setStep] = useState(searchParams.get("specialty") ? 2 : 1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Form State
  const [consultType, setConsultType] = useState<"video" | "clinic" | null>(searchParams.get("specialty") ? "video" : null);
  const [specialization, setSpecialization] = useState(initialSpecialty);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState(searchParams.get("reason") || "");
  const [priority, setPriority] = useState(searchParams.get("urgency") === "CRITICAL" || searchParams.get("urgency") === "HIGH" ? "Emergency" : "Routine");
  
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dummy Data
  const doctors = [
    { id: 1, name: "Dr. Rahul Sharma", spec: "Cardiologist", exp: "12 Yrs", available: true, rating: 4.8 },
    { id: 2, name: "Dr. Priya Singh", spec: "General Physician", exp: "8 Yrs", available: true, rating: 4.9 },
    { id: 3, name: "Dr. Amit Kumar", spec: "Dermatologist", exp: "15 Yrs", available: false, rating: 4.7 },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "04:00 PM"
  ];

  const handleNext = () => {
    if (step === 1 && !consultType) return;
    if (step === 2 && !doctorId) return;
    if (step === 3 && (!date || !timeSlot)) return;
    if (step === 4 && !reason) return;
    
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate API Booking
    setTimeout(() => {
      setIsConfirming(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-lg mx-auto text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold">Appointment Confirmed!</h1>
        <p className="text-muted-foreground">Your booking with {doctors.find(d => d.id === doctorId)?.name} for {date && format(date, "PPP")} at {timeSlot} has been successfully scheduled.</p>
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => router.push("/dashboard/appointments")}>View Appointments</Button>
          <Button onClick={() => window.print()}>Download Summary</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Book Appointment</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule a consultation with our healthcare experts.</p>
        </div>
        <div className="flex items-center text-sm font-medium text-slate-400">
          <span className={cn("px-2", step >= 1 ? "text-primary" : "")}>Type</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className={cn("px-2", step >= 2 ? "text-primary" : "")}>Doctor</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className={cn("px-2", step >= 3 ? "text-primary" : "")}>Slot</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className={cn("px-2", step >= 4 ? "text-primary" : "")}>Details</span>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Select Consultation Type</CardTitle>
                <CardDescription>How would you like to consult the doctor?</CardDescription>
              </CardHeader>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <button 
                  onClick={() => setConsultType("clinic")}
                  className={cn("flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all", consultType === "clinic" ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900/50")}
                >
                  <Building2 className={cn("w-12 h-12 mb-4", consultType === "clinic" ? "text-primary" : "text-slate-400")} />
                  <h3 className="font-bold text-lg mb-1">Clinic Visit</h3>
                  <p className="text-sm text-slate-500 text-center">In-person consultation at the hospital.</p>
                </button>
                <button 
                  onClick={() => setConsultType("video")}
                  className={cn("flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all", consultType === "video" ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900/50")}
                >
                  <Video className={cn("w-12 h-12 mb-4", consultType === "video" ? "text-primary" : "text-slate-400")} />
                  <h3 className="font-bold text-lg mb-1">Video Consult</h3>
                  <p className="text-sm text-slate-500 text-center">Online consultation from your home.</p>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 h-full flex flex-col">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Find a Doctor</CardTitle>
                <CardDescription>Search by name, specialty or hospital.</CardDescription>
              </CardHeader>
              
              <div className="flex gap-3 my-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search doctors..." className="pl-9" />
                </div>
                <Select value={specialization} onValueChange={(v) => setSpecialization(v || "")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Physician</SelectItem>
                    <SelectItem value="cardio">Cardiologist</SelectItem>
                    <SelectItem value="derma">Dermatologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 mt-2 overflow-y-auto pr-2 max-h-[300px]">
                {doctors.map(doc => (
                  <div 
                    key={doc.id} 
                    onClick={() => doc.available && setDoctorId(doc.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer", 
                      doctorId === doc.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 dark:border-slate-800 hover:border-primary/30",
                      !doc.available && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.spec} • {doc.exp} Exp • ⭐ {doc.rating}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {doc.available ? (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">Available</span>
                      ) : (
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">Unavailable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose an available slot for {doctors.find(d => d.id === doctorId)?.name}.</CardDescription>
              </CardHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Select Date</h4>
                  <div className="border rounded-xl p-2 inline-block">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Available Time Slots</h4>
                  {date ? (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={cn(
                            "py-2 px-3 text-sm rounded-lg border transition-all text-center",
                            timeSlot === slot ? "bg-primary text-primary-foreground border-primary" : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground border border-dashed rounded-xl">
                      Select a date first to see available slots.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Patient Details & Reason</CardTitle>
                <CardDescription>Provide information about your consultation.</CardDescription>
              </CardHeader>
              
              <div className="space-y-4 mt-4 max-w-xl">
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input value={`${user?.firstName || "Patient"} ${user?.lastName || ""}`} disabled />
                  <p className="text-xs text-muted-foreground">Booking for yourself. To book for family members, go to Profile.</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Consultation Priority</Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v || "")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Routine">Routine Checkup</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Emergency">Emergency (Immediate attention)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Reason for Visit (Required)</Label>
                  <Textarea 
                    placeholder="Briefly describe your symptoms or reason for consultation..." 
                    className="min-h-[120px] resize-none"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Review & Confirm</CardTitle>
                <CardDescription>Please review your appointment details before confirming.</CardDescription>
              </CardHeader>
              
              <div className="mt-4 space-y-4 border rounded-xl p-4 md:p-6 bg-slate-50 dark:bg-slate-900/30">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-sm text-muted-foreground">Doctor</p>
                    <p className="font-bold">{doctors.find(d => d.id === doctorId)?.name}</p>
                    <p className="text-sm text-slate-500">{doctors.find(d => d.id === doctorId)?.spec}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-bold capitalize flex items-center">
                      {consultType === 'video' ? <Video className="w-4 h-4 mr-2 text-blue-500" /> : <Building2 className="w-4 h-4 mr-2 text-emerald-500" />}
                      {consultType} Visit
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-bold">{date ? format(date, "PPP") : ""}</p>
                    <p className="text-sm text-slate-500">{timeSlot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <p className={cn("font-bold", priority === 'Emergency' ? "text-red-500 flex items-center" : "text-amber-500")}>
                      {priority === 'Emergency' && <AlertTriangle className="w-4 h-4 mr-1" />}
                      {priority}
                    </p>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-muted-foreground">Reason</p>
                    <p className="font-medium text-sm mt-1">{reason}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={handleBack} disabled={step === 1 || isConfirming}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        {step < 5 ? (
          <Button onClick={handleNext} disabled={
            (step === 1 && !consultType) || 
            (step === 2 && !doctorId) || 
            (step === 3 && (!date || !timeSlot)) ||
            (step === 4 && !reason)
          }>
            Continue <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleConfirm} disabled={isConfirming} className="bg-primary hover:bg-primary/90 text-white min-w-[120px]">
            {isConfirming ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> 
                Processing
              </span>
            ) : "Confirm Booking"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="flex h-[50vh] items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <BookAppointmentContent />
    </Suspense>
  );
}
