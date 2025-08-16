import { Link } from "react-router-dom";
import { Code, Github, Twitter, MessageCircle } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                DSA Pathfinder
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your ultimate platform for mastering Data Structures and Algorithms. 
              Practice, learn, and land your dream job.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platform</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/sheets" className="block hover:text-foreground transition-colors">
                DSA Sheets
              </Link>
              <Link to="/companies" className="block hover:text-foreground transition-colors">
                Companies
              </Link>
              <Link to="/jobs" className="block hover:text-foreground transition-colors">
                Jobs
              </Link>
              <Link to="/articles" className="block hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link to="/roadmaps" className="block hover:text-foreground transition-colors">
                Roadmaps
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="block hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="#" className="block hover:text-foreground transition-colors">
                Community
              </a>
              <a href="#" className="block hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="flex space-x-4">
              <a
                href="https://chat.whatsapp.com/DSAPathfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/dsapathfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/dsapathfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <a
                href="https://chat.whatsapp.com/DSAPathfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join WhatsApp Community</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DSA Pathfinder. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};