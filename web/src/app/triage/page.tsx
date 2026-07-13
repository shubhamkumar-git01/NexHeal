"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Stethoscope, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  recommendation?: {
    specialty: string;
    urgency: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
    advice: string;
  };
}

export default function AITriagePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Hello! I am NexHeal's AI Triage Assistant. Please describe your symptoms or how you are feeling today, and I will help you find the right specialist."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetchApi('/ai/triage', { 
        method: 'POST', 
        body: JSON.stringify({ symptoms: input }) 
      });
      
      const res = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: res.recommendation?.advice || "Please consult a doctor.",
        recommendation: res.recommendation
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      console.error(e);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Sorry, I am having trouble connecting to my systems right now. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "CRITICAL": return "text-red-600 bg-red-100 border-red-200";
      case "HIGH": return "text-orange-600 bg-orange-100 border-orange-200";
      case "MODERATE": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      default: return "text-blue-600 bg-blue-100 border-blue-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      <div className="bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Smart Triage</h1>
          <p className="text-sm text-muted-foreground">Describe your symptoms to get instantly matched with the right specialist.</p>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${msg.role === "user" ? "border-blue-100 bg-white dark:border-blue-900/50 dark:bg-slate-800 text-blue-600 dark:text-blue-400" : "border-emerald-100 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"}`}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] space-y-3 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-4 rounded-2xl text-[15px] shadow-sm leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm shadow-blue-600/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200"}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                
                {msg.recommendation && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col md:flex-row gap-3 mt-2 w-full">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-sm">Suggested Specialty</span>
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{msg.recommendation.specialty}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 ${msg.recommendation.urgency === 'CRITICAL' ? 'text-red-600' : msg.recommendation.urgency === 'HIGH' ? 'text-orange-500' : 'text-yellow-500'}`} />
                        <span className="font-semibold text-sm">Urgency Level</span>
                      </div>
                      <p className={`text-sm font-bold ${msg.recommendation.urgency === 'CRITICAL' ? 'text-red-600' : msg.recommendation.urgency === 'HIGH' ? 'text-orange-600' : 'text-yellow-600'}`}>
                        {msg.recommendation.urgency} URGENCY
                      </p>
                    </div>
                  </motion.div>
                )}
                {msg.recommendation && (
                    <div className="pt-2 mt-2">
                      <Button onClick={() => router.push(`/dashboard/appointments/book?specialty=${msg.recommendation?.specialty}&urgency=${msg.recommendation?.urgency}&reason=${encodeURIComponent(msg.content)}`)} className="w-full">
                        Book {msg.recommendation.specialty} Now
                      </Button>
                    </div>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-100 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white dark:bg-[#09090b] border-t border-slate-200 dark:border-slate-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., I've been having a severe headache and dizziness..."
              className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl px-4 focus-visible:ring-blue-600"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
