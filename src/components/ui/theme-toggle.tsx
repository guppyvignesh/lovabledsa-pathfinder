import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    // Add the roll animation overlay
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    document.body.appendChild(overlay);
    
    // Start the animation
    requestAnimationFrame(() => {
      overlay.classList.add("active");
    });

    setTimeout(() => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      
      setTimeout(() => {
        overlay.remove();
        setIsAnimating(false);
      }, 100);
    }, 400);
  };

  useEffect(() => {
    // Add CSS for the roll animation
    const style = document.createElement("style");
    style.textContent = `
      .theme-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: hsl(var(--background));
        z-index: 9999;
        pointer-events: none;
        clip-path: circle(0% at 0% 0%);
        transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .theme-transition-overlay.active {
        clip-path: circle(150% at 0% 0%);
      }
      
      .dark .theme-transition-overlay {
        background: hsl(var(--background));
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      disabled={isAnimating}
      className="relative overflow-hidden"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}