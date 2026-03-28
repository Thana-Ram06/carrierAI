import { Link } from "wouter";
import { FileText, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Dashboard() {
  const cards = [
    {
      title: "Resume Generator",
      description: "Create a professional, ATS-optimized resume from scratch by inputting your basic details.",
      icon: FileText,
      href: "/resume-generator",
      delay: 0.1
    },
    {
      title: "Resume Improver",
      description: "Paste your existing resume and let AI rewrite it to be more impactful and professional.",
      icon: Sparkles,
      href: "/resume-improver",
      delay: 0.2
    },
    {
      title: "Interview Prep",
      description: "Generate targeted behavioral and technical interview questions with model answers.",
      icon: MessageSquare,
      href: "/interview",
      delay: 0.3
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          Your Career Dashboard
        </h1>
        <p className="text-muted-foreground">
          Select a tool below to start optimizing your professional presence.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5 }}
          >
            <Link 
              href={card.href}
              className="block group relative bg-card border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-serif">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {card.description}
              </p>
              
              <div className="flex items-center text-sm font-medium text-primary mt-auto">
                Get Started 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
