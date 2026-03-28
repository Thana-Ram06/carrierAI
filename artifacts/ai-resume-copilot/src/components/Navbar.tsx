import { Link, useRoute } from "wouter";
import { Briefcase } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isActive] = useRoute(href);

  return (
    <Link 
      href={href} 
      className={twMerge(
        clsx(
          "text-sm font-medium transition-colors hover:text-primary relative py-2",
          isActive ? "text-primary" : "text-muted-foreground"
        )
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
      )}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Briefcase size={18} />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            CareerAI
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/resume-generator">Generator</NavLink>
          <NavLink href="/resume-improver">Improver</NavLink>
          <NavLink href="/interview">Interview Prep</NavLink>
        </nav>
      </div>
    </header>
  );
}
