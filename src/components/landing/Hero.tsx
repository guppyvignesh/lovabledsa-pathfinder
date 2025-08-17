import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, BookOpen, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlatformStats {
  community_members: number;
  monthly_readers: number;
  linkedin_followers: number;
  registered_users: number;
}

export const Hero = () => {
  const [stats, setStats] = useState<PlatformStats>({
    community_members: 37119,
    monthly_readers: 923117,
    linkedin_followers: 42528,
    registered_users: 97058
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('platform_stats')
        .select('stat_name, stat_value')
        .eq('is_active', true)
        .order('display_order');

      if (data) {
        const statsObj = data.reduce((acc, stat) => {
          acc[stat.stat_name as keyof PlatformStats] = stat.stat_value;
          return acc;
        }, {} as PlatformStats);
        setStats(statsObj);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="DSA Practice Platform"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-subtle" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm font-medium">
            <Target className="h-4 w-4 text-accent" />
            <span>Master DSA • Land Your Dream Job</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Path to
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                DSA Mastery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice with curated sheets, explore 900+ company problems, track your progress, 
              and get hired by top tech companies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth?tab=signup">
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/companies">
                <Play className="h-5 w-5 mr-2" />
                Explore Companies
              </Link>
            </Button>
          </div>

          {/* Platform Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center text-3xl font-bold text-accent">
                <Users className="h-6 w-6 mr-2" />
                {formatNumber(stats.community_members)}+
              </div>
              <div className="text-sm text-muted-foreground">Active Community Members</div>
              <div className="text-xs text-accent">Freshers helping freshers</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center text-3xl font-bold text-accent">
                <BookOpen className="h-6 w-6 mr-2" />
                {formatNumber(stats.monthly_readers)}+
              </div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
              <div className="text-xs text-accent">Tech career content</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center text-3xl font-bold text-accent">
                <TrendingUp className="h-6 w-6 mr-2" />
                {formatNumber(stats.linkedin_followers)}+
              </div>
              <div className="text-sm text-muted-foreground">LinkedIn Followers</div>
              <div className="text-xs text-accent">Professional network</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center text-3xl font-bold text-accent">
                <Target className="h-6 w-6 mr-2" />
                {formatNumber(stats.registered_users)}+
              </div>
              <div className="text-sm text-muted-foreground">Registered Users</div>
              <div className="text-xs text-accent">Career focused freshers</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by students from</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              <div className="text-lg font-semibold">IITs</div>
              <div className="text-lg font-semibold">NITs</div>
              <div className="text-lg font-semibold">IIITs</div>
              <div className="text-lg font-semibold">Engineering Colleges</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};