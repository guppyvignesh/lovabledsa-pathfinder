import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Building2,
  Trophy,
  TrendingUp,
  Calendar,
  Plus,
  ExternalLink,
} from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  username: string;
  email: string;
  plan_type: string;
  sheets_created: number;
}

export default function Dashboard() {
  const { user, isLoading } = useAuthState();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, email, plan_type, sheets_created")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const planLimits = {
    free: 5,
    pro: 10,
    premium: 20,
  };

  const currentLimit =
    planLimits[profile?.plan_type as keyof typeof planLimits] || 5;
  const sheetsUsed = profile?.sheets_created || 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.username || "Developer"}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Continue your DSA journey and track your progress
              </p>
            </div>
            <Badge
              variant={profile?.plan_type === "free" ? "secondary" : "default"}
              className="text-sm"
            >
              {profile?.plan_type?.toUpperCase() || "FREE"} Plan
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DSA Sheets</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sheetsUsed}/{currentLimit}
              </div>
              <Progress
                value={(sheetsUsed / currentLimit) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Problems Solved
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Companies Explored
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Out of 900+</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Sheets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your DSA Sheets</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Sheet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Striver A2Z",
                      progress: 45,
                      total: 180,
                      difficulty: "Mixed",
                    },
                    {
                      name: "Neetcode 150",
                      progress: 78,
                      total: 150,
                      difficulty: "Medium-Hard",
                    },
                    {
                      name: "My Custom Sheet",
                      progress: 12,
                      total: 50,
                      difficulty: "Easy-Medium",
                    },
                  ].map((sheet, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{sheet.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {sheet.progress}/{sheet.total} problems •{" "}
                          {sheet.difficulty}
                        </p>
                        <Progress
                          value={(sheet.progress / sheet.total) * 100}
                          className="w-40"
                        />
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Solved",
                      problem: "Two Sum",
                      company: "Google",
                      time: "2 hours ago",
                    },
                    {
                      action: "Started",
                      problem: "Binary Tree Inorder",
                      company: "Microsoft",
                      time: "5 hours ago",
                    },
                    {
                      action: "Completed",
                      problem: "Valid Parentheses",
                      company: "Facebook",
                      time: "1 day ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-accent rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          {activity.problem}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.company} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Sheets
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Building2 className="h-4 w-4 mr-2" />
                  Explore Companies
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Practice Today
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {profile?.plan_type === "free" && (
              <Card className="bg-gradient-primary text-white">
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90 mb-4">
                    Get access to 10 sheets, advanced analytics, and priority
                    support.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Progress Insights */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Problems Solved</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Study Time</span>
                    <span className="font-medium">8.5 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-medium text-green-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
