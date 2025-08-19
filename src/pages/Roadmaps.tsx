import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Map, Clock, BarChart, Star, CheckCircle, Filter, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Roadmap {
  id: string;
  title: string;
  description: string;
  role_type: string;
  difficulty_level: string;
  estimated_duration: string;
  completion_rate: number;
  skills: string[];
  prerequisites: string[];
  steps: any;
  icon_url: string;
  banner_url: string;
  is_published: boolean;
  is_coming_soon: boolean;
}

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("is_published", true)
        .order("completion_rate", { ascending: false });

      if (error) throw error;
      setRoadmaps(data || []);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.role_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || roadmap.role_type === roleFilter;
    const matchesDifficulty = difficultyFilter === "all" || roadmap.difficulty_level === difficultyFilter;
    return matchesSearch && matchesRole && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Beginner": "bg-success text-success-foreground",
      "Intermediate": "bg-warning text-warning-foreground",
      "Advanced": "bg-destructive text-destructive-foreground",
      "Expert": "bg-primary text-primary-foreground",
    };
    return colors[difficulty as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const getRoleColor = (role: string) => {
    const colors = {
      "Frontend Developer": "bg-accent text-accent-foreground",
      "Backend Developer": "bg-info text-info-foreground",
      "Full Stack Developer": "bg-primary text-primary-foreground",
      "Data Scientist": "bg-success text-success-foreground",
      "DevOps Engineer": "bg-warning text-warning-foreground",
      "Mobile Developer": "bg-destructive text-destructive-foreground",
    };
    return colors[role as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading roadmaps...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-subtle">
        {/* Hero Section */}
        <div className="bg-background border-b">
          <div className="container py-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Career Roadmaps
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Navigate your tech career with structured learning paths. From beginner to expert level guidance.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  {roadmaps.length} Roadmaps
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Expert Curated
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roadmaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Roadmaps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                {roadmap.banner_url && (
                  <div className="aspect-video overflow-hidden bg-gradient-primary">
                    <img
                      src={roadmap.banner_url}
                      alt={roadmap.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getRoleColor(roadmap.role_type)}>
                        {roadmap.role_type}
                      </Badge>
                      {roadmap.is_coming_soon ? (
                        <Badge variant="outline">Coming Soon</Badge>
                      ) : (
                        <Badge className={getDifficultyColor(roadmap.difficulty_level)}>
                          {roadmap.difficulty_level}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {roadmap.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {roadmap.description}
                  </p>

                  {/* Duration and Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {roadmap.estimated_duration}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <BarChart className="h-4 w-4 mr-1" />
                        {roadmap.completion_rate}% completion
                      </div>
                    </div>
                    <Progress value={roadmap.completion_rate} className="h-2" />
                  </div>

                  {/* Skills */}
                  {roadmap.skills && roadmap.skills.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">You'll learn:</h4>
                      <div className="flex flex-wrap gap-1">
                        {roadmap.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {roadmap.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{roadmap.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Prerequisites:</h4>
                      <div className="space-y-1">
                        {roadmap.prerequisites.slice(0, 3).map((prereq, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 mr-1 text-success" />
                            {prereq}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t">
                    {roadmap.is_coming_soon ? (
                      <Button variant="outline" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    ) : (
                      <Button className="w-full group">
                        Start Learning
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRoadmaps.length === 0 && (
            <div className="text-center py-12">
              <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No roadmaps found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find relevant career roadmaps.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}