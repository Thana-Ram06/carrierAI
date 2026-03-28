import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useImproveResume } from "@workspace/api-client-react";
import { WarningBanner } from "@/components/WarningBanner";
import { OutputCard } from "@/components/OutputCard";

const schema = z.object({
  resume: z.string().min(50, "Please paste a complete resume to improve"),
  targetRole: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ResumeImprover() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const mutation = useImproveResume();

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ data });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Resume Improver</h1>
        </div>
        <p className="text-muted-foreground mb-8">Paste your current resume and get a polished, high-impact rewrite.</p>
        
        <WarningBanner />

        <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Target Role (Optional)</label>
              <input 
                {...register("targetRole")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="e.g. Product Manager"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Current Resume</label>
              <textarea 
                {...register("resume")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-64 resize-y font-mono text-sm"
                placeholder="Paste your current resume text here..."
              />
              {errors.resume && <p className="text-destructive text-xs">{errors.resume.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {mutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Improving Resume...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Improve My Resume</>
              )}
            </button>
          </form>
        </div>

        {mutation.isError && (
          <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Failed to improve resume. Please try again later.
          </div>
        )}

        {mutation.data && (
          <OutputCard title="Your Improved Resume" content={mutation.data.content} />
        )}
      </motion.div>
    </div>
  );
}
