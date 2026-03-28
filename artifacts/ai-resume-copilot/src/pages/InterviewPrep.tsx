import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, MessageSquare, HelpCircle } from "lucide-react";
import { useGenerateInterviewQuestions } from "@workspace/api-client-react";
import { WarningBanner } from "@/components/WarningBanner";

const schema = z.object({
  role: z.string().min(2, "Role is required"),
  skills: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function InterviewPrep() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const mutation = useGenerateInterviewQuestions();

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ data });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 text-primary rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Interview Prep</h1>
        </div>
        <p className="text-muted-foreground mb-8">Generate likely interview questions and model answers for any role.</p>
        
        <WarningBanner />

        <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Role to prepare for</label>
              <input 
                {...register("role")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="e.g. Data Scientist, Account Executive"
              />
              {errors.role && <p className="text-destructive text-xs">{errors.role.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Specific skills or requirements (Optional)</label>
              <textarea 
                {...register("skills")}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-24 resize-y"
                placeholder="e.g. Python, SQL, A/B Testing, Machine Learning"
              />
            </div>

            <button 
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {mutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating Questions...</>
              ) : (
                <><MessageSquare className="w-5 h-5" /> Generate Practice Q&A</>
              )}
            </button>
          </form>
        </div>

        {mutation.isError && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Failed to generate interview questions. Please try again later.
          </div>
        )}

        {mutation.data?.questions && mutation.data.questions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-8"
          >
            <h2 className="text-2xl font-serif font-bold text-white border-b border-white/10 pb-4 mb-6">
              Practice Questions & Model Answers
            </h2>
            
            {mutation.data.questions.map((qa, i) => (
              <div key={i} className="bg-card border border-white/10 rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    Q{i + 1}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug">
                    {qa.question}
                  </h3>
                </div>
                
                <div className="ml-12 pl-4 border-l-2 border-white/10">
                  <p className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Model Answer Approach
                  </p>
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {qa.answer}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
