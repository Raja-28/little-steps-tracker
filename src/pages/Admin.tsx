import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Trash2, Eye } from "lucide-react";
import { getAllAssessments, deleteAssessment, exportToJSON, exportToCSV } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [assessments, setAssessments] = useState(getAllAssessments());

  const refreshData = () => {
    setAssessments(getAllAssessments());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      deleteAssessment(id);
      refreshData();
      toast({
        title: "Assessment Deleted",
        description: "The assessment has been removed.",
      });
    }
  };

  const handleExportJSON = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessments-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export Complete",
      description: "JSON file has been downloaded.",
    });
  };

  const handleExportCSV = () => {
    const csv = exportToCSV();
    if (!csv) {
      toast({
        title: "No Data",
        description: "There are no assessments to export.",
        variant: "destructive",
      });
      return;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessments-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export Complete",
      description: "CSV file has been downloaded.",
    });
  };

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

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                View and export assessment data
              </p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button onClick={handleExportJSON} variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button onClick={handleExportCSV} variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stored Assessments ({assessments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {assessments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm md:text-base text-muted-foreground mb-4">No assessments found</p>
                  <Link to="/assessment">
                    <Button size="sm" className="md:text-base">Start New Assessment</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {assessments.map((assessment) => (
                    <motion.div
                      key={assessment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl border border-border hover:bg-muted/50 transition-colors gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm md:text-base truncate">{assessment.id}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {new Date(assessment.timestamp).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Status: {assessment.completed ? (
                            <span className="text-accent font-medium">Completed</span>
                          ) : (
                            <span className="text-secondary font-medium">In Progress</span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        {assessment.completed && (
                          <Link to={`/results/${assessment.id}`} className="flex-1 sm:flex-none">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(assessment.id)}
                          className="flex-1 sm:flex-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Data Preview - Hidden on mobile for better performance */}
          {assessments.length > 0 && (
            <Card className="hidden md:block">
              <CardHeader>
                <CardTitle>JSON Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                  {exportToJSON()}
                </pre>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
