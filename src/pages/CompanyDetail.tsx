import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Users, 
  ExternalLink, 
  Globe,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QuestionsTable } from "@/components/ui/questions-table";

// Sample company data with logos
const sampleCompanies = [
  {
    id: "1",
    name: "Google",
    description: "Multinational technology company that specializes in Internet-related services and products.",
    logo_url: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=64&h=64&fit=crop&crop=center",
    headquarters: "Mountain View, CA",
    industry: "Technology",
    company_size: "Large",
    total_problems: 450,
    easy_problems: 120,
    medium_problems: 230,
    hard_problems: 100,
    is_hiring: true,
    featured: true,
    website_url: "https://google.com"
  },
  {
    id: "2", 
    name: "Microsoft",
    description: "American multinational technology corporation known for Windows, Office, and cloud services.",
    logo_url: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=64&h=64&fit=crop&crop=center",
    headquarters: "Redmond, WA",
    industry: "Technology", 
    company_size: "Large",
    total_problems: 380,
    easy_problems: 110,
    medium_problems: 200,
    hard_problems: 70,
    is_hiring: true,
    featured: true,
    website_url: "https://microsoft.com"
  }
];

export default function CompanyDetail() {
  const { id } = useParams();
  
  // Find company by ID (in real app, this would be an API call)
  const company = sampleCompanies.find(c => c.id === id) || sampleCompanies[0];

  const getCompanySizeColor = (size: string) => {
    const colors = {
      "Startup": "bg-accent text-accent-foreground",
      "Small": "bg-success text-success-foreground",
      "Medium": "bg-warning text-warning-foreground",
      "Large": "bg-primary text-primary-foreground",
      "Enterprise": "bg-destructive text-destructive-foreground"
    };
    return colors[size as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-subtle">
        <div className="container py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/companies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Company Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-6">
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          className="h-16 w-16 object-contain"
                        />
                      ) : (
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <CardTitle className="text-3xl">{company.name}</CardTitle>
                        <p className="text-lg text-muted-foreground mt-2">
                          {company.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {company.headquarters}
                        </div>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2" />
                          {company.industry}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {company.company_size} Company
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getCompanySizeColor(company.company_size)}>
                          {company.company_size}
                        </Badge>
                        {company.is_hiring && (
                          <Badge variant="outline" className="text-success border-success">
                            Hiring
                          </Badge>
                        )}
                        {company.featured && (
                          <Badge variant="outline" className="text-primary border-primary">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button asChild>
                      <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Jobs
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Problems Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{company.total_problems}</div>
                  <div className="text-sm text-muted-foreground">Total Problems</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-success">{company.easy_problems}</div>
                  <div className="text-sm text-muted-foreground">Easy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-warning">{company.medium_problems}</div>
                  <div className="text-sm text-muted-foreground">Medium</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-destructive">{company.hard_problems}</div>
                  <div className="text-sm text-muted-foreground">Hard</div>
                </CardContent>
              </Card>
            </div>

            {/* Questions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionsTable 
                  companyId={company.id}
                  showPagination={true}
                  title={`${company.name} Interview Questions`}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}