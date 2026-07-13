"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Stethoscope, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

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
      // TODO: Connect to real AI backend
      // const res = await fetchApi('/ai/triage', { method: 'POST', body: JSON.stringify({ symptoms: input }) });
      
      // Mocking AI Response for now
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Based on what you described, this requires medical attention.",
          recommendation: {
            specialty: "Cardiologist",
            urgency: "HIGH",
            advice: "Please consult a cardiologist immediately. Do not ignore severe chest pain."
          }
        };
        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }, 1500);

    } catch (e) {
      console.error(e);
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200" : "bg-primary text-white"}`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] space-y-3 ${msg.role === "user" ? "items-end" : ""}`}>
                <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm"}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                
                {msg.recommendation && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-primary" />
                      <span className="font-bold">Recommended Specialist:</span>
                      <span className="font-medium text-primary">{msg.recommendation.specialty}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${getUrgencyColor(msg.recommendation.urgency).split(' ')[0]}`} />
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getUrgencyColor(msg.recommendation.urgency)}`}>
                          {msg.recommendation.urgency} URGENCY
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{msg.recommendation.advice}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                      <Button onClick={() => router.push(`/dashboard/appointments/book?specialty=${msg.recommendation?.specialty}`)} className="w-full">
                        Book {msg.recommendation.specialty} Now
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
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
              className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-12 rounded-xl px-4"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} className="h-12 px-6 rounded-xl">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
