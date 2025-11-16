import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: { [key: string]: number };
  onQuestionSelect: (index: number) => void;
  sections: Array<{ key: string; label: string; questions: any[] }>;
}

export function QuestionNavigation({
  currentQuestion,
  totalQuestions,
  answers,
  onQuestionSelect,
  sections
}: QuestionNavigationProps) {
  let questionIndex = 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <Menu className="w-4 h-4 mr-2" />
          Navigate
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Question Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-6 pr-4">
            {sections.map((section) => (
              <div key={section.key}>
                <h3 className="font-semibold text-sm mb-3 text-primary">
                  {section.label}
                </h3>
                <div className="space-y-2">
                  {section.questions.map((q) => {
                    const idx = questionIndex++;
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = idx === currentQuestion;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => onQuestionSelect(idx)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-all",
                          "flex items-start gap-3 hover:bg-muted/50",
                          isCurrent && "bg-primary/10 border-primary",
                          !isCurrent && isAnswered && "bg-accent/10 border-accent/30",
                          !isCurrent && !isAnswered && "border-border"
                        )}
                      >
                        {isAnswered ? (
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-primary">Q{q.number}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {q.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
