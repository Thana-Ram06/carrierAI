import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, FileText } from "lucide-react";
import { useGenerateResume } from "@workspace/api-client-react";
import { WarningBanner } from "@/components/WarningBanner";
import { OutputCard } from "@/components/OutputCard";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  skills: z.string().min(5, "Please list some skills"),
  experience: z.string().min(10, "Please describe your experience"),
  education: z.string().min(5, "Please describe your education"),
  targetRole: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ResumeGenerator() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const mutation = useGenerateResume();

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ data });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Resume Generator</h1>
        </div>
        <p className="text-muted-foreground mb-8">Let AI craft a professional resume tailored for your industry.</p>
        
        <WarningBanner />

        <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Full Name</label>
                <input 
                  {...register("name")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. Jane Doe"
                />
                {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">Target Role (Optional)</label>
                <input 
                  {...register("targetRole")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Skills</label>
              <textarea 
                {...register("skills")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-24 resize-y"
                placeholder="List your technical and soft skills..."
              />
              {errors.skills && <p className="text-destructive text-xs">{errors.skills.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Experience</label>
              <textarea 
                {...register("experience")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-32 resize-y"
                placeholder="Describe your past roles, companies, and achievements..."
              />
              {errors.experience && <p className="text-destructive text-xs">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Education</label>
              <textarea 
                {...register("education")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-24 resize-y"
                placeholder="Degrees, universities, bootcamps..."
              />
              {errors.education && <p className="text-destructive text-xs">{errors.education.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {mutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating Resume...</>
              ) : (
                <><FileText className="w-5 h-5" /> Generate Resume</>
              )}
            </button>
          </form>
        </div>

        {mutation.isError && (
          <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Failed to generate resume. Please try again later.
          </div>
        )}

        {mutation.data && (
          <OutputCard title="Your AI-Generated Resume" content={mutation.data.content} />
        )}
      </motion.div>
    </div>
  );
}
