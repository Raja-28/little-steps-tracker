import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Users, AlertTriangle, ExternalLink } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-4">
              About This Assessment
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Understanding the Vanderbilt ADHD Assessment Scale and how to use this tool effectively
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                What is the Vanderbilt Assessment?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm md:text-base">
                The Vanderbilt ADHD Diagnostic Parent Rating Scale is a validated screening tool 
                used by healthcare professionals to assess symptoms of Attention-Deficit/Hyperactivity 
                Disorder (ADHD) in children ages 6-12.
              </p>
              <p className="text-sm md:text-base">
                It was developed at Vanderbilt University and is widely used because it:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm md:text-base">
                <li>Follows DSM-5 diagnostic criteria for ADHD</li>
                <li>Screens for comorbid conditions (ODD, conduct disorder, anxiety/depression)</li>
                <li>Assesses functional impairment in multiple settings</li>
                <li>Provides standardized, quantifiable results</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                How to Use This Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Before you begin:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Set aside 15-20 minutes in a quiet environment</li>
                <li>Think about your child's behavior over the past 6 months</li>
                <li>Answer based on typical behavior, not occasional incidents</li>
                <li>Be honest - there are no "wrong" answers</li>
              </ul>

              <p className="mt-4">
                <strong>Rating scale:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Never (0):</strong> Behavior does not occur</li>
                <li><strong>Occasionally (1):</strong> Happens sometimes, but less than weekly</li>
                <li><strong>Often (2):</strong> Occurs frequently, multiple times per week</li>
                <li><strong>Very Often (3):</strong> Happens almost daily or constantly</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-6 h-6" />
                Important Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">
                This is a SCREENING tool, not a diagnostic instrument.
              </p>
              <p>
                A positive screening result does not mean your child has ADHD. Many factors must 
                be considered for diagnosis, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Clinical interview and developmental history</li>
                <li>Teacher/school observations and ratings</li>
                <li>Medical examination to rule out other conditions</li>
                <li>Cognitive and academic testing when indicated</li>
                <li>Family history and environmental factors</li>
              </ul>
              <p className="font-semibold mt-4">
                Always consult with a qualified healthcare provider for proper evaluation and diagnosis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="https://chadd.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                CHADD - Children and Adults with ADHD
              </a>
              <a
                href="https://www.aap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                American Academy of Pediatrics
              </a>
              <a
                href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                NIMH - ADHD Information
              </a>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Start Assessment
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
