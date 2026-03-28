import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface OutputCardProps {
  title?: string;
  content: string;
}

export function OutputCard({ title = "Generated Content", content }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-8 rounded-2xl bg-card border border-white/10 shadow-2xl overflow-hidden relative group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-emerald-800/50" />
      
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4" />
          <h3 className="font-medium font-sans text-sm tracking-wide text-white">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-muted-foreground hover:text-white transition-colors border border-white/5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
      </div>
      
      <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="prose prose-invert prose-emerald max-w-none text-muted-foreground whitespace-pre-wrap font-sans text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
