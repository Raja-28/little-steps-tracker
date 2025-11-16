import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface AnswerSummaryProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answers: { [key: string]: number };
  totalQuestions: number;
}

export function AnswerSummary({ open, onClose, onConfirm, answers, totalQuestions }: AnswerSummaryProps) {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const isComplete = unansweredCount === 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isComplete ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-accent" />
                Ready to View Results
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6 text-secondary" />
                Assessment Incomplete
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isComplete 
              ? "You've answered all questions. Review your progress below."
              : `You have ${unansweredCount} unanswered question${unansweredCount !== 1 ? 's' : ''}.`
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[300px] pr-4">
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-accent/10 rounded-xl border border-accent/30">
                <p className="text-sm text-muted-foreground mb-1">Answered</p>
                <p className="text-3xl font-bold text-accent">{answeredCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                <p className="text-3xl font-bold">{unansweredCount}</p>
              </div>
            </div>

            {!isComplete && (
              <div className="p-4 bg-secondary/20 rounded-xl border border-secondary">
                <p className="text-sm font-medium text-foreground">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  For accurate results, please answer all questions.
                </p>
              </div>
            )}

            {isComplete && (
              <div className="p-4 bg-accent/20 rounded-xl border border-accent/30">
                <p className="text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  All questions answered! You'll see detailed results on the next page.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {isComplete ? "Review Answers" : "Continue"}
          </Button>
          {isComplete && (
            <Button onClick={onConfirm} className="w-full sm:w-auto">
              View Results
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
