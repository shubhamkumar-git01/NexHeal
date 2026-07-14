"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/lib/auth";
import { fetchApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { HeartPulse, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "PATIENT"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetchApi(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || payload.message || "Registration failed");
      }

      const responseData = payload.data;
      authService.setSession(responseData.accessToken, responseData.user);
      
      toast.success("Account created successfully!");
      if (responseData.user?.role === "DOCTOR") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unknown error occurred";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#09090b] relative overflow-hidden transition-colors selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Background Orbs for Premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg p-6 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">
              NexHeal
            </h1>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Create an Account</h2>
          <p className="text-slate-500 dark:text-slate-400">Join NexHeal to manage your healthcare seamlessly.</p>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-6" aria-label="Registration form">
            {error && (
              <div className="p-4 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50 flex items-center gap-2" role="alert">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500"></div>
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="font-semibold text-slate-700 dark:text-slate-300">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required 
                  className="h-12 bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-slate-800 rounded-xl px-4 focus-visible:ring-blue-600"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="font-semibold text-slate-700 dark:text-slate-300">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required 
                  className="h-12 bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-slate-800 rounded-xl px-4 focus-visible:ring-blue-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
                className="h-12 bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-slate-800 rounded-xl px-4 focus-visible:ring-blue-600"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="font-semibold text-slate-700 dark:text-slate-300">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
                className="h-12 bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-slate-800 rounded-xl px-4 focus-visible:ring-blue-600"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="role" className="font-semibold text-slate-700 dark:text-slate-300">I am a...</Label>
              <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val || "PATIENT"})}>
                <SelectTrigger className="h-12 bg-slate-50 dark:bg-[#09090b] border-slate-200 dark:border-slate-800 rounded-xl px-4 focus:ring-blue-600">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PATIENT">Patient</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full h-12 text-md font-semibold transition-all rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 group mt-2">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
