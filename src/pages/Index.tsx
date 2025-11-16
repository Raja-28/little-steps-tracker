import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KidsFocus
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Link to="/about">
              <Button variant="ghost" size="sm" className="mr-1">
                About
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-[var(--shadow-soft)] animate-bounce-gentle">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent px-4">
            Understanding Your Child Better
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
            A gentle, evidence-based screening tool to help identify potential attention, 
            hyperactivity, and behavioral concerns in children.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
            <Link to="/assessment" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-xl transition-all duration-200 group"
              >
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 hover:bg-accent/10"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-16 px-4">
            {[
              {
                icon: Brain,
                title: "Evidence-Based",
                description: "Based on the validated Vanderbilt Assessment Scale used by healthcare professionals."
              },
              {
                icon: Heart,
                title: "Child-Friendly",
                description: "Designed with care and sensitivity for families navigating behavioral concerns."
              },
              {
                icon: Sparkles,
                title: "Easy to Use",
                description: "Clear questions, simple interface, immediate results to discuss with your doctor."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[var(--shadow-card)] border border-border hover:shadow-[var(--shadow-soft)] transition-all duration-200"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Clinical Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 md:mt-16 mx-4 p-4 md:p-6 bg-secondary/30 border-2 border-secondary rounded-xl md:rounded-2xl"
          >
            <p className="text-xs md:text-sm text-foreground/80 font-medium">
              <span className="font-bold text-primary">Important:</span> This is a screening tool, 
              not a diagnostic instrument. Results should be discussed with a qualified healthcare provider 
              for proper evaluation and diagnosis.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
