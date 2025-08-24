import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    // Get the button position for starting the animation from where user clicked
    const button = document.querySelector('.theme-toggle-btn');
    const rect = button?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth * 100 : 10;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight * 100 : 10;
    
    // Add the smooth grainy roll animation overlay
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    overlay.style.setProperty('--start-x', `${x}%`);
    overlay.style.setProperty('--start-y', `${y}%`);
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
      }, 150);
    }, 500);
  };

  useEffect(() => {
    // Add CSS for the smooth grainy roll animation
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
        clip-path: circle(0% at var(--start-x, 50%) var(--start-y, 50%));
        transition: clip-path 0.8s cubic-bezier(0.23, 1, 0.320, 1);
        opacity: 0.98;
        backdrop-filter: blur(1px);
      }
      
      .theme-transition-overlay::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
          radial-gradient(circle at 45% 15%, rgba(255,255,255,0.08) 0%, transparent 40%);
        mix-blend-mode: overlay;
        opacity: 0.6;
      }
      
      .theme-transition-overlay.active {
        clip-path: circle(150% at var(--start-x, 50%) var(--start-y, 50%));
      }
      
      .dark .theme-transition-overlay {
        background: hsl(var(--background));
        opacity: 0.95;
      }
      
      .dark .theme-transition-overlay::before {
        background: 
          radial-gradient(circle at 30% 40%, rgba(100,100,255,0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(150,100,255,0.06) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(100,150,255,0.04) 0%, transparent 40%);
        opacity: 0.4;
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
      className="theme-toggle-btn relative overflow-hidden hover:bg-accent/10 transition-all duration-300"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 text-blue-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}