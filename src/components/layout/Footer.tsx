import { Link } from "react-router-dom";
import { Code2, MessageCircle, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                DSA Pathfinder
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your ultimate destination for mastering Data Structures & Algorithms.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <div className="space-y-2 text-sm">
              <Link to="/sheets" className="block hover:text-primary transition-colors">DSA Sheets</Link>
              <Link to="/companies" className="block hover:text-primary transition-colors">Companies</Link>
              <Link to="/jobs" className="block hover:text-primary transition-colors">Jobs</Link>
              <Link to="/articles" className="block hover:text-primary transition-colors">Articles</Link>
              <Link to="/roadmaps" className="block hover:text-primary transition-colors">Roadmaps</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Community</h4>
            <div className="space-y-2 text-sm">
              <a href="https://chat.whatsapp.com/community" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="block hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DSA Pathfinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}