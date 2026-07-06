"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, FileText, Sparkles, AlertCircle } from "lucide-react";

export default function AIAssistantPage() {
  const [formData, setFormData] = useState({ patientName: "", age: "", symptoms: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [prescription, setPrescription] = useState<any>(null);
  const [error, setError] = useState("");

  const generatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPrescription(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/ai/generate-prescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to generate AI Prescription");
      
      setPrescription(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
            AI Prescription Assistant
          </h2>
          <p className="text-slate-500">Automatically generate accurate draft prescriptions based on symptoms.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="border-t-4 border-t-purple-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2 text-purple-600" /> Input Patient Data
            </CardTitle>
            <CardDescription>Enter the patient's symptoms reported during the consultation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={generatePrescription} className="space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">{error}</div>}
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input 
                    id="patientName" 
                    placeholder="e.g. Rahul Sharma" 
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    placeholder="32" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms & Doctor's Notes</Label>
                <textarea 
                  id="symptoms"
                  className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Patient reports high fever (102F) since 3 days, accompanied by severe dry cough and slight headache. No history of asthma."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  required
                ></textarea>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 h-11">
                {isLoading ? (
                  <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2 animate-spin" /> Analyzing Data...</span>
                ) : (
                  <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2" /> Generate AI Prescription</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* AI Output Result */}
        <Card className={`shadow-lg border-2 ${prescription ? 'border-emerald-500' : 'border-slate-200 border-dashed'}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-slate-700" /> Generated Draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!prescription ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p>Output will appear here</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-bold text-xl text-slate-800">{prescription.patientName} <span className="text-sm font-normal text-slate-500 ml-2">({prescription.age} yrs)</span></h3>
                  <p className="text-emerald-600 font-medium mt-1">AI Diagnosis: {prescription.diagnosis}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
                    Prescribed Medicines
                  </h4>
                  <ul className="space-y-3">
                    {prescription.medicines.map((med: any, idx: number) => (
                      <li key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="font-bold text-blue-700 text-sm">{med.name}</p>
                        <div className="flex text-xs text-slate-600 mt-1 space-x-4">
                          <span><strong className="text-slate-500 font-medium">Dose:</strong> {med.dosage}</span>
                          <span><strong className="text-slate-500 font-medium">Freq:</strong> {med.frequency}</span>
                          <span><strong className="text-slate-500 font-medium">Dur:</strong> {med.duration}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800 text-sm mb-1">Doctor's Advice / Diet</h4>
                  <p className="text-sm text-blue-700">{prescription.advice}</p>
                </div>
                
                <div className="flex items-start bg-amber-50 p-3 rounded-md text-amber-800 text-xs mt-4">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{prescription.disclaimer}</p>
                </div>
              </div>
            )}
          </CardContent>
          {prescription && (
            <CardFooter className="flex space-x-3 bg-slate-50 border-t border-slate-100 mt-auto">
              <Button variant="outline" className="flex-1">Edit</Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Approve & Send</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
