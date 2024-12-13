"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Mail, UserCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    // <div className="max-w-md mx-auto p-4 bg-green-50 rounded-lg shadow-md">
    //   <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
    //   <p>Welcome, {user.name}!</p>
    //   <p>Email: {user.email}</p>
    //   <p>Role: {user.role}</p>
    //   <button
    //     onClick={handleLogout}
    //     className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //   >
    //     Logout
    //   </button>
    // </div>
    //newcode
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              User Dashboard
            </CardTitle>
            <CardDescription>Welcome back, {user.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <UserCircle className="h-10 w-10 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-lg capitalize break-all">{user.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <Mail className="h-10 w-10 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-lg break-all">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <CalendarDays className="h-10 w-10 text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-lg break-all">
                        {new Date(user.createdAt).toLocaleString()}
                        {/* {format(new Date(user.createdAt), "MMM d, yyyy")} */}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
               <TabsList>  {/*className="w-full justify-start overflow-x-auto" */}
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <h3 className="text-lg font-medium">System Overview</h3>
                <p className="text-gray-600">
                  Welcome to your personalized dashboard. Here you can manage
                  your farming operations, view analytics, and access important
                  reports.
                </p>
              </TabsContent>
              <TabsContent value="analytics" className="p-4">
                Analytics content
              </TabsContent>
              <TabsContent value="reports" className="p-4">
                Reports content
              </TabsContent>
            </Tabs>
            <Button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
