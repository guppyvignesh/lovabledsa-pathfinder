import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Building2, 
  Briefcase, 
  FileText, 
  Map, 
  Calculator,
  Users,
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Curated DSA Sheets",
    description: "Access premium sheets like Striver A2Z, Neetcode 150, and Blind 75. Track your progress with difficulty-based categorization.",
    tier: "Free: 5 sheets • Pro: 10 sheets • Premium: 20 sheets"
  },
  {
    icon: Building2,
    title: "900+ Companies",
    description: "Explore interview questions from top tech companies. Filter by difficulty, topics, and company size.",
    tier: "Complete company database with detailed insights"
  },
  {
    icon: Briefcase,
    title: "Job Portal",
    description: "Discover opportunities with advanced filters for remote work, experience level, and job type. Track your applications.",
    tier: "100 pages of curated opportunities"
  },
  {
    icon: FileText,
    title: "Articles & News",
    description: "Stay updated with trending articles, categorized by technology and career advice. Expert insights and tutorials.",
    tier: "Daily updates from industry experts"
  },
  {
    icon: Map,
    title: "Career Roadmaps",
    description: "Follow structured learning paths for Software Engineer, Frontend, Backend, Data Analyst, and more specialized roles.",
    tier: "Comprehensive guides with progress tracking"
  },
  {
    icon: Calculator,
    title: "Income Tax Calculator",
    description: "Plan your finances with our built-in calculator. Understand your take-home salary for different job offers.",
    tier: "Free financial planning tool"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join our WhatsApp community for peer support, doubt clearing, and networking with like-minded professionals.",
    tier: "24/7 active community support"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Track your coding journey with detailed analytics, streak counters, and performance insights across different topics.",
    tier: "Detailed progress tracking and insights"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to 
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Succeed in Tech
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed to take you from beginner to expert, 
            with tools for every stage of your coding journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{feature.description}</p>
                <div className="text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1 inline-block">
                  {feature.tier}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};