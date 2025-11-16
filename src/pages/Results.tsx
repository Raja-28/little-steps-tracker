import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { getAssessment, StoredAssessment } from "@/utils/storage";
import { scoreAssessment, getSubtypeDescription, getSubtypeExplanation } from "@/utils/scoring";

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<StoredAssessment | null>(null);

  useEffect(() => {
    if (id) {
      const data = getAssessment(id);
      if (data) {
        setAssessment(data);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  if (!assessment) {
    return <div>Loading...</div>;
  }

  const results = scoreAssessment(assessment.answers);

  const handleDownload = () => {
    const resultText = `
ADHD SCREENING RESULTS
Generated: ${new Date(assessment.timestamp).toLocaleString()}

CLINICAL NOTE: This is a screening tool — not a diagnosis.
Professional evaluation is required for any diagnosis.

=== ADHD SCREENING ===
Inattention Symptoms: ${results.inattentionCount}/9 (≥6 needed)
Hyperactivity/Impulsivity Symptoms: ${results.hyperactivityCount}/9 (≥6 needed)
Functional Impairment: ${results.hasImpairment ? 'YES' : 'NO'}

Result: ${getSubtypeDescription(results.adhdSubtype)}
${getSubtypeExplanation(results.adhdSubtype)}

=== COMORBID SCREENS ===
ODD Screen: ${results.oddPositive ? 'POSITIVE' : 'NEGATIVE'} (${results.oddCount}/8 symptoms)
Conduct Screen: ${results.conductPositive ? 'POSITIVE' : 'NEGATIVE'} (${results.conductCount}/14 symptoms)
Anxiety/Depression Screen: ${results.anxietyPositive ? 'POSITIVE' : 'NEGATIVE'} (${results.anxietyCount}/7 symptoms)

=== NEXT STEPS ===
Share these results with your child's healthcare provider for professional evaluation.
    `.trim();

    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-results-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getResultIcon = (positive: boolean) => {
    return positive ? (
      <AlertCircle className="w-6 h-6 text-destructive" />
    ) : (
      <CheckCircle2 className="w-6 h-6 text-accent" />
    );
  };

  const adhdPositive = results.adhdSubtype !== 'none';

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
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-4">
              Assessment Results
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Completed on {new Date(assessment.timestamp).toLocaleDateString()}
            </p>
          </div>

          {/* Clinical Warning */}
          <Card className="border-2 border-secondary bg-secondary/20">
            <CardContent className="pt-4 md:pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm md:text-base text-foreground mb-2">Important Clinical Note</p>
                  <p className="text-xs md:text-sm text-foreground/80">
                    This is a screening tool, not a diagnostic instrument. These results should be 
                    discussed with a qualified healthcare provider for proper evaluation and diagnosis. 
                    Multiple factors must be considered for an accurate diagnosis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ADHD Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getResultIcon(adhdPositive)}
                ADHD Screening Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-muted/50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Inattention</p>
                  <p className="text-xl md:text-2xl font-bold">{results.inattentionCount}/9</p>
                  <p className="text-xs text-muted-foreground">symptoms (≥6 needed)</p>
                </div>
                <div className="bg-muted/50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Hyperactivity</p>
                  <p className="text-xl md:text-2xl font-bold">{results.hyperactivityCount}/9</p>
                  <p className="text-xs text-muted-foreground">symptoms (≥6 needed)</p>
                </div>
                <div className="bg-muted/50 p-3 md:p-4 rounded-lg md:rounded-xl col-span-2 md:col-span-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Impairment</p>
                  <p className="text-xl md:text-2xl font-bold">{results.hasImpairment ? 'Yes' : 'No'}</p>
                  <p className="text-xs text-muted-foreground">functional impact</p>
                </div>
              </div>

              <div className="p-3 md:p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg md:rounded-xl border-2 border-primary/20">
                <p className="font-semibold text-base md:text-lg mb-2">{getSubtypeDescription(results.adhdSubtype)}</p>
                <p className="text-xs md:text-sm text-foreground/80">{getSubtypeExplanation(results.adhdSubtype)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Comorbid Screens */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Behavioral Screens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl">
                <div>
                  <p className="font-semibold text-sm md:text-base">Oppositional Defiant Disorder (ODD)</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{results.oddCount}/8 symptoms</p>
                </div>
                {results.oddPositive ? (
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl">
                <div>
                  <p className="font-semibold text-sm md:text-base">Conduct Disorder</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{results.conductCount}/14 symptoms</p>
                </div>
                {results.conductPositive ? (
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl">
                <div>
                  <p className="font-semibold text-sm md:text-base">Anxiety / Depression</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{results.anxietyCount}/7 symptoms</p>
                </div>
                {results.anxietyPositive ? (
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-2 border-accent/30">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs md:text-sm">
                1. <strong>Download your results</strong> and bring them to your child's healthcare provider
              </p>
              <p className="text-xs md:text-sm">
                2. <strong>Schedule an appointment</strong> with a pediatrician, psychiatrist, or psychologist
              </p>
              <p className="text-xs md:text-sm">
                3. <strong>Discuss these findings</strong> along with other observations and concerns
              </p>
              <p className="text-xs md:text-sm">
                4. <strong>Consider teacher input</strong> - your provider may request a teacher rating scale
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Results
            </Button>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Results;
