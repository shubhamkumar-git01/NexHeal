"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  const { user, isLoading } = useAuth(true);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" /> Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="w-4 h-4 mr-2" /> Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" /> Alerts</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2" /> UI</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-sm">
                    {user?.firstName?.charAt(0) || "D"}{user?.lastName?.charAt(0) || "R"}
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue={user.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue={user.lastName} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue={user.email} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Security Preferences</CardTitle>
                <CardDescription>Manage your password and authentication.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-6">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control what alerts you receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Emergency Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified for critical patient SOS.</p>
                  </div>
                  <div className="h-5 w-9 bg-primary rounded-full relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" tabIndex={0}>
                    <div className="h-4 w-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Use the theme toggle in the top navigation bar to switch between Light, Dark, and System modes.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
