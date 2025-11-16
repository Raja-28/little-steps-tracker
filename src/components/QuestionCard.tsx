import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: {
    id: string;
    number: number;
    text: string;
    options: number[];
  };
  value?: number;
  onChange: (value: number) => void;
  isPerformance?: boolean;
}

const optionLabels = ['Never', 'Occasionally', 'Often', 'Very Often'];
const performanceLabels = ['Excellent', 'Above Average', 'Average', 'Somewhat Problem', 'Problematic'];

export function QuestionCard({ question, value, onChange, isPerformance = false }: QuestionCardProps) {
  const labels = isPerformance ? performanceLabels : optionLabels;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[var(--shadow-card)] border border-border"
    >
      <div className="mb-4 md:mb-6">
        <span className="inline-block px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-2 md:mb-3">
          Question {question.number}
        </span>
        <h3 className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
          {question.text}
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {question.options.map((option) => (
          <motion.button
            key={option}
            onClick={() => onChange(option)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-200",
              "flex flex-col items-center gap-1 md:gap-2 text-center",
              "hover:shadow-[var(--shadow-soft)] min-h-[80px] md:min-h-[90px]",
              value === option
                ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-soft)]"
                : "bg-background border-border hover:border-primary/50"
            )}
          >
            <span className="text-xl md:text-2xl font-bold">{option}</span>
            <span className="text-xs md:text-sm font-medium leading-tight">{labels[option]}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
