import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-200",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-secondary text-secondary-foreground ring-4 ring-secondary/30",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <p className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-1 mx-2",
                  isCompleted ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
