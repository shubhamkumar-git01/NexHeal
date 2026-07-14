"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, AlertTriangle, Sparkles, Copy, RotateCcw, Trash2, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { fetchApi } from "@/lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
  metadata?: {
    confidenceScore?: number;
    requiresHumanReview?: boolean;
    timestamp?: string;
  };
}

export default function AIAssistantPage() {
  const { user } = useAuth(false);
  const role = user?.role?.toLowerCase() || 'patient';
  const isPatient = role === 'patient';
  const isDoctor = role === 'doctor';
  const isAdmin = ['admin', 'super_admin', 'hospital_admin'].includes(role);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const patientTemplates = [
    "Explain my recent blood report",
    "Symptom Checker",
    "Explain my prescription",
    "How to prepare for my upcoming appointment?"
  ];

  const doctorTemplates = [
    "Generate SOAP Note Draft",
    "Summarize Patient History",
    "Consultation Summary",
    "Check Drug Interactions"
  ];

  const adminTemplates = [
    "Predict Bed Occupancy",
    "Hospital Resource Forecast",
    "Emergency Surge Probability",
    "Staff Requirements Prediction"
  ];

  let templates = patientTemplates;
  if (isDoctor) templates = doctorTemplates;
  if (isAdmin) templates = adminTemplates;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsProcessing(true);

    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, role: "assistant", content: "", isTyping: true }]);

    try {
      // Map messages for the backend API
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetchApi('/api/v1/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: apiMessages })
      });
      const payload = await res.json();
      
      const aiResponse = payload.response;
      
      const assistantMsg: Message = { 
        id: typingId, 
        role: "assistant", 
        content: aiResponse?.text || "Sorry, I couldn't process your request.", 
        isTyping: false,
        metadata: {
          confidenceScore: aiResponse?.confidence || 0.9,
          requiresHumanReview: aiResponse?.confidence < 0.8,
          timestamp: new Date().toLocaleTimeString()
        }
      };
      
      setMessages(prev => prev.map(msg => msg.id === typingId ? assistantMsg : msg));
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMsg: Message = { 
        id: typingId, 
        role: "assistant", 
        content: "I am experiencing technical difficulties reaching the AI servers. Please try again later.", 
        isTyping: false,
        metadata: {
          confidenceScore: 0,
          requiresHumanReview: true,
          timestamp: new Date().toLocaleTimeString()
        }
      };
      setMessages(prev => prev.map(msg => msg.id === typingId ? errorMsg : msg));
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const regenerateLast = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      setMessages(prev => prev.filter(m => m.id !== messages[messages.length - 1].id));
      handleSend(lastUserMsg.content);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-3 flex items-start gap-3 mb-4 shrink-0">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
          This AI provides informational support only. It is not a medical diagnosis. A qualified professional must review clinical recommendations.
        </p>
      </div>

      <Card className="flex-1 flex flex-col shadow-sm border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader className="border-b dark:border-slate-800 py-4 px-6 flex flex-row items-center justify-between shrink-0">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              NexHeal Intelligence Copilot
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {isAdmin ? "Enterprise AI Gateway" : isPatient ? "Your personal health assistant" : "Clinical intelligence assistant"}
            </CardDescription>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground">
              <Trash2 className="w-4 h-4 mr-2" /> Clear Chat
            </Button>
          )}
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col relative bg-slate-50/50 dark:bg-slate-900/20">
          <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-12">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">How can I help you today?</h3>
                  <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
                    Select a quick action below or type your query in the chat box.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-4">
                  {templates.map((template, idx) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      className="h-auto py-3 px-4 justify-start text-left whitespace-normal text-sm hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                      onClick={() => handleSend(template)}
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className={`w-8 h-8 shrink-0 ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800' : 'bg-primary/10'}`}>
                        {msg.role === 'user' ? (
                          <User className="w-4 h-4 m-auto text-slate-600 dark:text-slate-300" />
                        ) : (
                          <Bot className="w-4 h-4 m-auto text-primary" />
                        )}
                      </Avatar>
                      
                      <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div 
                          className={`rounded-2xl px-4 py-3 text-sm ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm'
                          }`}
                        >
                          {msg.isTyping ? (
                            <div className="flex gap-1.5 py-1.5 items-center">
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                              <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap leading-relaxed">
                              {msg.content}
                            </div>
                          )}
                        </div>

                        {msg.role === 'assistant' && !msg.isTyping && msg.metadata && (
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground ml-2 mt-1 w-full max-w-full">
                            <span className="flex items-center gap-1 font-semibold text-emerald-600">
                              <CheckCircle2 className="w-3 h-3" /> Confidence: {Math.round((msg.metadata.confidenceScore || 0) * 100)}%
                            </span>
                            {msg.metadata.requiresHumanReview && (
                              <span className="flex items-center gap-1 font-semibold text-amber-600">
                                <AlertTriangle className="w-3 h-3" /> Human Review Required
                              </span>
                            )}
                            <span className="text-slate-400">{msg.metadata.timestamp}</span>
                            <div className="flex gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: 1 }}>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(msg.content)} title="Copy">
                                <Copy className="w-3 h-3 text-muted-foreground" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={regenerateLast} title="Regenerate">
                                <RotateCcw className="w-3 h-3 text-muted-foreground" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t dark:border-slate-800 bg-white dark:bg-[#09090b] shrink-0">
          <form 
            className="flex w-full items-end gap-2"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <div className="relative flex-1">
              <Input 
                placeholder="Ask NexHeal Intelligence..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isProcessing}
                className="pr-12 rounded-xl border-slate-300 dark:border-slate-700 focus-visible:ring-primary h-12"
              />
            </div>
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isProcessing} 
              size="icon"
              className="h-12 w-12 rounded-xl shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
