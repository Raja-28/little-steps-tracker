import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Stepper } from "@/components/Stepper";
import { WelcomeModal } from "@/components/WelcomeModal";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { AnswerSummary } from "@/components/AnswerSummary";
import { ArrowLeft, ArrowRight, Save, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import questionsData from "@/data/questions.json";
import { saveAssessment, StoredAssessment } from "@/utils/storage";

const sections = [
  { key: 'inattention', label: 'Inattention', questions: questionsData.filter(q => q.section === 'inattention') },
  { key: 'hyperactivity', label: 'Hyperactivity', questions: questionsData.filter(q => q.section === 'hyperactivity') },
  { key: 'odd', label: 'Oppositional', questions: questionsData.filter(q => q.section === 'odd') },
  { key: 'conduct', label: 'Conduct', questions: questionsData.filter(q => q.section === 'conduct') },
  { key: 'anxiety', label: 'Anxiety', questions: questionsData.filter(q => q.section === 'anxiety') },
  { key: 'performance', label: 'Performance', questions: questionsData.filter(q => q.section === 'performance') },
];

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [assessmentId] = useState(() => `assessment-${Date.now()}`);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const allQuestions = questionsData;
  const totalQuestions = allQuestions.length;
  const currentQuestionData = allQuestions[currentQuestion];
  const isPerformance = currentQuestionData?.section === 'performance';

  // Auto-save to localStorage
  useEffect(() => {
    const assessment: StoredAssessment = {
      id: assessmentId,
      timestamp: new Date().toISOString(),
      answers,
      completed: false,
    };
    saveAssessment(assessment);
  }, [answers, assessmentId]);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionData.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Update section if needed
      const nextQuestion = allQuestions[currentQuestion + 1];
      const nextSectionIndex = sections.findIndex(s => s.key === nextQuestion.section);
      if (nextSectionIndex !== currentSection) {
        setCurrentSection(nextSectionIndex);
      }
    } else {
      // Show summary before completion
      setShowSummary(true);
    }
  };

  const handleComplete = () => {
    const assessment: StoredAssessment = {
      id: assessmentId,
      timestamp: new Date().toISOString(),
      answers,
      completed: true,
    };
    saveAssessment(assessment);
    navigate(`/results/${assessmentId}`);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
    const question = allQuestions[index];
    const sectionIndex = sections.findIndex(s => s.key === question.section);
    if (sectionIndex !== currentSection) {
      setCurrentSection(sectionIndex);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const prevQuestion = allQuestions[currentQuestion - 1];
      const prevSectionIndex = sections.findIndex(s => s.key === prevQuestion.section);
      if (prevSectionIndex !== currentSection) {
        setCurrentSection(prevSectionIndex);
      }
    }
  };

  const handleSave = () => {
    toast({
      title: "Progress Saved",
      description: "Your answers have been saved. You can continue later.",
    });
  };

  const canProceed = answers[currentQuestionData?.id] !== undefined;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && canProceed && currentQuestion < totalQuestions - 1) {
        handleNext();
      } else if (e.key >= '0' && e.key <= '3' && !isPerformance) {
        handleAnswer(parseInt(e.key));
      } else if (e.key >= '1' && e.key <= '5' && isPerformance) {
        handleAnswer(parseInt(e.key));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, canProceed, isPerformance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Modals */}
      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
      <AnswerSummary
        open={showSummary}
        onClose={() => setShowSummary(false)}
        onConfirm={handleComplete}
        answers={answers}
        totalQuestions={totalQuestions}
      />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <QuestionNavigation
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              answers={answers}
              onQuestionSelect={handleQuestionSelect}
              sections={sections}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-6 md:mb-8">
          <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
        </div>

        {/* Stepper - Hidden on mobile */}
        <div className="hidden md:block">
          <Stepper
            steps={sections.map(s => ({ label: s.label }))}
            currentStep={currentSection}
          />
        </div>

        {/* Mobile Section Indicator */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
            <span className="text-sm font-medium text-muted-foreground">Current Section:</span>
            <span className="text-sm font-bold text-primary">{sections[currentSection]?.label}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="my-6 md:my-8">
          <AnimatePresence mode="wait">
            {currentQuestionData && (
              <QuestionCard
                key={currentQuestionData.id}
                question={currentQuestionData}
                value={answers[currentQuestionData.id]}
                onChange={handleAnswer}
                isPerformance={isPerformance}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard Shortcuts Hint - Desktop Only */}
        <div className="hidden lg:block text-center mb-4">
          <p className="text-xs text-muted-foreground">
            💡 Use arrow keys to navigate • Press number keys to answer
          </p>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* Mobile Navigation */}
          <div className="flex md:hidden gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              size="sm"
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              onClick={handleSave}
              size="sm"
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {currentQuestion === totalQuestions - 1 ? "Done" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              variant="outline"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Progress
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-primary hover:bg-primary/90"
            >
              {currentQuestion === totalQuestions - 1 ? "Complete Assessment" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Helper Text */}
        {!canProceed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground mt-4"
          >
            Please select an answer to continue
          </motion.p>
        )}
      </main>
    </div>
  );
};

export default Assessment;
