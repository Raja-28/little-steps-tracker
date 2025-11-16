import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Your Assessment</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Before you begin, here's what you need to know:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Set aside 15-20 minutes</p>
              <p className="text-sm text-muted-foreground">Find a quiet place without interruptions</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Think about the past 6 months</p>
              <p className="text-sm text-muted-foreground">Consider typical behavior, not occasional incidents</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Be honest and thorough</p>
              <p className="text-sm text-muted-foreground">There are no wrong answers</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Your progress is saved</p>
              <p className="text-sm text-muted-foreground">You can take breaks and return later</p>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-xl border border-secondary mt-6">
            <p className="text-sm font-medium">
              <span className="font-bold text-primary">Rating Scale:</span>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>0 - Never:</strong> Behavior does not occur</li>
              <li><strong>1 - Occasionally:</strong> Less than weekly</li>
              <li><strong>2 - Often:</strong> Multiple times per week</li>
              <li><strong>3 - Very Often:</strong> Almost daily</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">
            I'm Ready to Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
