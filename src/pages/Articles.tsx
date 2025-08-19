import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Clock, Eye, Heart, Filter, User, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_avatar: string;
  category: string;
  tags: string[];
  featured_image: string;
  read_time: number;
  views: number;
  likes: number;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      "DSA": "bg-primary text-primary-foreground",
      "Interview": "bg-warning text-warning-foreground",
      "Career": "bg-success text-success-foreground",
      "Technology": "bg-accent text-accent-foreground",
      "Tips": "bg-info text-info-foreground",
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading articles...</p>
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
                Tech Career Articles
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest insights, tips, and strategies for your tech career journey.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {articles.length} Articles
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Expert Authors
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
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="DSA">DSA</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Tips">Tips</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Article */}
          {filteredArticles.length > 0 && filteredArticles[0].is_featured && (
            <Card className="mb-8 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {filteredArticles[0].featured_image && (
                    <img
                      src={filteredArticles[0].featured_image}
                      alt={filteredArticles[0].title}
                      className="h-64 md:h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Featured</Badge>
                      <Badge className={getCategoryColor(filteredArticles[0].category)}>
                        {filteredArticles[0].category}
                      </Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {filteredArticles[0].author_name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(filteredArticles[0].published_at)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {filteredArticles[0].read_time} min read
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(filteredArticles[0]?.is_featured ? 1 : 0).map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                {article.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      {article.is_featured && (
                        <Badge variant="outline">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.read_time}m
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {article.likes}
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-2 pt-2 border-t">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {article.author_avatar ? (
                        <img
                          src={article.author_avatar}
                          alt={article.author_name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{article.author_name}</div>
                      <div className="text-muted-foreground">
                        {formatDate(article.published_at)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find relevant articles.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}