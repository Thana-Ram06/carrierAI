import { Link } from "wouter";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center z-10 py-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 w-fit">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Your Next Chapter Starts Here</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif leading-[1.1] text-white">
            Build your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200">
              AI-powered
            </span> <br />
            career
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl font-sans leading-relaxed">
            Stand out in today's competitive job market. Generate ATS-optimized resumes, improve your existing credentials, and prep for tough interviews—all powered by cutting-edge AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> ATS-Friendly
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Instant Results
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-card hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10 mix-blend-multiply" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="AI abstract technology visualization"
            className="w-full h-full object-cover aspect-[4/3] opacity-80"
          />
        </motion.div>
      </div>
    </div>
  );
}
