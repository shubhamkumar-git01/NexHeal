"use client";

import { useState } from "react";
import { Key, Copy, Check, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function EHRAccessPage() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateToken = () => {
    setLoading(true);
    // Mocking API call to backend generateAccessKey endpoint
    setTimeout(() => {
      const randomToken = "NEX-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      setToken(randomToken);
      setLoading(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">EHR Access Control</h1>
          <p className="text-sm text-muted-foreground">Generate a secure token to share your medical records with a new doctor.</p>
        </div>
      </div>

      <Card className="p-8 border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 mx-auto flex items-center justify-center">
            <Key className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold">Generate Access Token</h2>
            <p className="text-sm text-muted-foreground mt-2">
              This token will give a doctor temporary access to your entire medical timeline and vitals. It expires in 24 hours.
            </p>
          </div>

          {!token ? (
            <Button 
              onClick={generateToken} 
              disabled={loading} 
              className="w-full h-12 text-md"
            >
              {loading ? "Generating..." : "Generate Secure Token"}
            </Button>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-mono text-xl font-bold tracking-widest text-slate-800 dark:text-slate-200">{token}</span>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} className="text-slate-500 hover:text-primary">
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              <div className="flex items-start gap-3 text-left bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700 dark:text-yellow-500 font-medium">
                  Do not share this token with anyone except your verified healthcare provider. They will use this code to access your records.
                </p>
              </div>
              <Button variant="outline" onClick={() => setToken(null)} className="w-full">
                Revoke & Generate New
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
