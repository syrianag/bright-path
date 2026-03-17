import { useState } from "react";
import { CheckCircle2, Wrench, ArrowRight, RotateCcw, Send, Wifi, RefreshCw, Trash2, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";

const steps = [
  {
    title: "Check Your Internet",
    description: "Make sure you're connected to Wi-Fi or ethernet. Try opening another website to confirm.",
    icon: Wifi,
  },
  {
    title: "Refresh the Page",
    description: "Press Ctrl+R (or Cmd+R on Mac) to reload. Sometimes a simple refresh fixes things.",
    icon: RefreshCw,
  },
  {
    title: "Clear Browser Cache",
    description: "Go to your browser settings → Privacy → Clear browsing data. Then try again.",
    icon: Trash2,
  },
  {
    title: "Try a Different Browser",
    description: "If the issue persists, try Chrome, Firefox, or Edge to rule out browser-specific problems.",
    icon: Globe,
  },
];

const TroubleshootTool = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allDone = completedSteps.length === steps.length;
  const progressPercent = (completedSteps.length / steps.length) * 100;

  const reset = () => {
    setCompletedSteps([]);
    setShowReport(false);
    setReportText("");
  };

  const submitReport = () => {
    toast.success("Issue reported! Our support team will get back to you soon.");
    setReportText("");
    setShowReport(false);
  };

  return (
    <div className="space-y-6">

      {/* Progress Header */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Wrench className="h-6 w-6" />
            </div>

            <div>
              <h2 className="font-display text-lg font-extrabold text-foreground">
                Quick Troubleshoot
              </h2>

              <p className="text-sm text-muted-foreground">
                {allDone
                  ? "All steps completed!"
                  : `${completedSteps.length} of ${steps.length} steps done`}
              </p>
            </div>
          </div>

          {completedSteps.length > 0 && (
            <Button
              size="sm"
              onClick={reset}
              className="rounded-xl text-muted-foreground"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Start Over
            </Button>
          )}
        </div>

        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const done = completedSteps.includes(i);
          const StepIcon = step.icon;

          return (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className={`w-full text-left rounded-2xl border bg-card p-5 transition-all hover:shadow-md ${
                done
                  ? "border-success/30"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    done
                      ? "bg-success/10 text-success"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      done ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    Step {i + 1}
                  </span>

                  <p
                    className={`mt-0.5 font-display font-bold ${
                      done ? "text-success" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-success bg-success text-success-foreground"
                      : "border-border"
                  }`}
                >
                  {done && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Report Section */}

      {allDone && !showReport && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="mb-1 font-display text-base font-bold text-foreground">
            Still having trouble?
          </p>

          <p className="mb-4 text-sm text-muted-foreground">
            Let our support team know what's going on and we'll help you out.
          </p>

          <Button onClick={() => setShowReport(true)} className="rounded-xl">
            <Send className="mr-2 h-4 w-4" />
            Report an Issue
          </Button>
        </div>
      )}

      {showReport && (
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <label className="mb-2 block font-display text-sm font-bold text-foreground">
              Describe your issue
            </label>

            <Textarea
              placeholder="e.g., 'Quiz page shows a blank screen after I click Start'..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              rows={4}
              className="rounded-xl"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={submitReport}
              disabled={!reportText.trim()}
              className="rounded-xl"
            >
              Submit Report
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <Button
              onClick={() => setShowReport(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootTool;