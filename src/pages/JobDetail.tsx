import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  ExternalLink, 
  Calendar,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Sample job data - will be replaced with actual API call
const sampleJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company_name: "TechCorp",
    company_logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=64&h=64&fit=crop&crop=center",
    location: "Bangalore, India",
    job_type: "Full-time",
    work_mode: "Hybrid",
    experience_level: "Senior Level",
    salary_min: 1500000,
    salary_max: 2500000,
    currency: "INR",
    posted_date: "2024-01-15T08:00:00Z",
    apply_url: "https://techcorp.com/apply/123",
    eligible_years: ["2020", "2021", "2022"],
    description: "We are looking for a Senior Software Engineer to join our dynamic team and work on cutting-edge projects.",
    overview: "Join our engineering team to build scalable web applications that serve millions of users worldwide. You'll work with modern technologies and contribute to architectural decisions.",
    key_responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and architectural discussions"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of software development experience",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/Azure)"
    ],
    technical_skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
    why_join_us: "Join a team of passionate engineers working on products that impact millions of users. We offer competitive compensation, flexible work arrangements, and opportunities for professional growth.",
    educational_requirements: "Bachelor's or Master's degree in Computer Science, Engineering, or related field",
    company_description: "TechCorp is a leading technology company focused on building innovative solutions for the modern world.",
    company_details: {
      industry: "Technology",
      company_size: "1000-5000 employees",
      founded: "2010",
      headquarters: "Bangalore, India"
    },
    company_tags: ["Technology", "Innovation", "Startup", "Remote Work"],
    connect_with_us: {
      website: "https://techcorp.com",
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp"
    },
    notes: "This is a great opportunity for experienced developers looking to make a significant impact."
  }
];

const similarJobs = [
  {
    id: "2",
    title: "Frontend Developer",
    company_name: "WebTech",
    location: "Mumbai, India",
    experience_level: "Mid Level",
    salary_range: "₹8L - ₹15L",
    posted_date: "2 days ago"
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company_name: "InnovateLabs",
    location: "Remote",
    experience_level: "Senior Level",
    salary_range: "₹15L - ₹25L",
    posted_date: "1 week ago"
  }
];

export default function JobDetail() {
  const { id } = useParams();
  
  // Find job by ID (in real app, this would be an API call)
  const job = sampleJobs.find(j => j.id === id) || sampleJobs[0];

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`;
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-subtle">
        <div className="container py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/jobs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={`${job.company_name} logo`}
                            className="h-12 w-12 object-contain"
                          />
                        ) : (
                          <Building2 className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <CardTitle className="text-2xl">{job.title}</CardTitle>
                          <p className="text-xl font-medium text-muted-foreground">
                            {job.company_name}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(job.posted_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatSalary(job.salary_min, job.salary_max, job.currency)}
                          </div>
                        </div>
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
                          {job.eligible_years && (
                            <Badge variant="secondary">
                              Batch: {job.eligible_years.join(", ")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button asChild>
                        <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                          Apply Now
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save Job
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Job Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.overview}</p>
                </CardContent>
              </Card>

              {/* Key Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.key_responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Technical Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.technical_skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Why Join Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Join Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.why_join_us}</p>
                </CardContent>
              </Card>

              {/* Educational Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Educational Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-muted-foreground">{job.educational_requirements}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>About {job.company_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.company_description}</p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Industry:</span>
                        <span className="text-sm text-muted-foreground">{job.company_details.industry}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Size:</span>
                        <span className="text-sm text-muted-foreground">{job.company_details.company_size}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Founded:</span>
                        <span className="text-sm text-muted-foreground">{job.company_details.founded}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">HQ:</span>
                        <span className="text-sm text-muted-foreground">{job.company_details.headquarters}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.company_tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Connect With Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" asChild>
                      <a href={job.connect_with_us.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={job.connect_with_us.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={job.connect_with_us.twitter} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {job.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="space-y-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-medium text-sm">{similarJob.title}</h4>
                      <p className="text-sm text-muted-foreground">{similarJob.company_name}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{similarJob.location}</span>
                        <span>{similarJob.posted_date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {similarJob.experience_level}
                        </Badge>
                        <span className="text-xs font-medium">{similarJob.salary_range}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link to={`/jobs/${similarJob.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}