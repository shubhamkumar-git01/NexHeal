"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue={user.firstName} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue={user.lastName} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user.email} disabled />
              <p className="text-xs text-slate-500">Email cannot be changed.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
            <CardDescription>Your role and system access level.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={user.role} disabled className="capitalize font-semibold text-blue-700" />
            </div>
            <div className="space-y-2">
              <Label>Account ID</Label>
              <Input defaultValue={user.id} disabled className="font-mono text-xs" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
