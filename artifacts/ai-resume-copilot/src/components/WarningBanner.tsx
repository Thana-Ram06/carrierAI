import { AlertTriangle } from "lucide-react";

export function WarningBanner() {
  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 mb-8">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-amber-500 font-medium text-sm">Don't refresh the page</h4>
        <p className="text-amber-500/80 text-sm mt-1">
          Your data is not automatically saved. Refreshing the page will cause you to lose your progress.
        </p>
      </div>
    </div>
  );
}
