import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Filter, Star, Users, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthState } from "@/hooks/useAuthState";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface DSASheet {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  total_problems: number;
  solved_problems: number;
  is_featured: boolean;
  tags: string[];
  user_id: string;
}

export default function DSASheets() {
  const { user } = useAuthState();
  const [sheets, setSheets] = useState<DSASheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      const { data, error } = await supabase
        .from("dsa_sheets")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSheets(data || []);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSheets = sheets.filter((sheet) => {
    const matchesSearch = sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sheet.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || sheet.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-success text-success-foreground",
      medium: "bg-warning text-warning-foreground",
      hard: "bg-destructive text-destructive-foreground",
      mixed: "bg-info text-info-foreground",
      "easy-medium": "bg-success/80 text-success-foreground",
      "medium-hard": "bg-warning/80 text-warning-foreground"
    };
    return colors[difficulty as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading DSA sheets...</p>
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
                DSA Practice Sheets
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Curated problem sets to master Data Structures & Algorithms. From beginner-friendly to interview-ready challenges.
              </p>
              {user && (
                <Button size="lg" className="mt-6">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your Sheet
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sheets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
                <SelectItem value="easy-medium">Easy-Medium</SelectItem>
                <SelectItem value="medium-hard">Medium-Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sheets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSheets.map((sheet) => (
              <Card key={sheet.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {sheet.is_featured && (
                          <Star className="h-4 w-4 text-warning fill-warning" />
                        )}
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {sheet.name}
                        </CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(sheet.difficulty)}>
                        {sheet.difficulty}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {sheet.description}
                  </p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{sheet.solved_problems}/{sheet.total_problems}</span>
                    </div>
                    <Progress
                      value={(sheet.solved_problems / sheet.total_problems) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Tags */}
                  {sheet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {sheet.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {sheet.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{sheet.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Public</span>
                    </div>
                    <Button size="sm">
                      Start Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSheets.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sheets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find DSA sheets.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}