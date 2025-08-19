import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, DollarSign, Building2, ExternalLink, Bookmark, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthState } from "@/hooks/useAuthState";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo: string;
  location: string;
  job_type: string;
  work_mode: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  description: string;
  requirements: string[];
  skills: string[];
  posted_date: string;
  apply_url: string;
  is_active: boolean;
}

export default function Jobs() {
  const { user } = useAuthState();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("posted_date", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === "all" || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = experienceFilter === "all" || job.experience_level === experienceFilter;
    const matchesWorkMode = workModeFilter === "all" || job.work_mode === workModeFilter;
    return matchesSearch && matchesLocation && matchesExperience && matchesWorkMode;
  });

  const formatSalary = (min: number, max: number, currency: string) => {
    if (!min && !max) return "Not disclosed";
    const formatNumber = (num: number) => {
      if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    
    if (min && max) {
      return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`;
    }
    return `${formatNumber(min || max)} ${currency}`;
  };

  const getExperienceColor = (level: string) => {
    const colors = {
      "Entry Level": "bg-success text-success-foreground",
      "Mid Level": "bg-warning text-warning-foreground",
      "Senior Level": "bg-destructive text-destructive-foreground",
      "Lead": "bg-primary text-primary-foreground",
    };
    return colors[level as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const getWorkModeColor = (mode: string) => {
    const colors = {
      "Remote": "bg-accent text-accent-foreground",
      "Hybrid": "bg-info text-info-foreground",
      "On-site": "bg-muted text-muted-foreground",
    };
    return colors[mode as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading jobs...</p>
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
                Tech Job Portal
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover your next career opportunity. Find jobs at top tech companies and startups.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  {jobs.length} Active Jobs
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Updated Daily
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Entry Level">Entry Level</SelectItem>
                <SelectItem value="Mid Level">Mid Level</SelectItem>
                <SelectItem value="Senior Level">Senior Level</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
              </SelectContent>
            </Select>
            <Select value={workModeFilter} onValueChange={setWorkModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={`${job.company_name} logo`}
                            className="h-8 w-8 object-contain"
                          />
                        ) : (
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {job.title}
                          </CardTitle>
                          <p className="text-lg font-medium text-muted-foreground">
                            {job.company_name}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(job.posted_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatSalary(job.salary_min, job.salary_max, job.currency)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user && (
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getExperienceColor(job.experience_level)}>
                        {job.experience_level}
                      </Badge>
                      <Badge className={getWorkModeColor(job.work_mode)}>
                        {job.work_mode}
                      </Badge>
                      <Badge variant="outline">
                        {job.job_type}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 6 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Posted {new Date(job.posted_date).toLocaleDateString()}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm" asChild>
                          <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find relevant job opportunities.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}