export interface StoredAssessment {
  id: string;
  timestamp: string;
  childName?: string;
  childAge?: number;
  answers: { [key: string]: number };
  completed: boolean;
}

const STORAGE_KEY = 'adhd-assessments';

export function saveAssessment(assessment: StoredAssessment): void {
  try {
    const stored = getAllAssessments();
    const existingIndex = stored.findIndex(a => a.id === assessment.id);
    
    if (existingIndex >= 0) {
      stored[existingIndex] = assessment;
    } else {
      stored.push(assessment);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    console.error('Failed to save assessment:', error);
  }
}

export function getAllAssessments(): StoredAssessment[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load assessments:', error);
    return [];
  }
}

export function getAssessment(id: string): StoredAssessment | undefined {
  const assessments = getAllAssessments();
  return assessments.find(a => a.id === id);
}

export function deleteAssessment(id: string): void {
  try {
    const stored = getAllAssessments();
    const filtered = stored.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete assessment:', error);
  }
}

export function exportToJSON(): string {
  const assessments = getAllAssessments();
  return JSON.stringify(assessments, null, 2);
}

export function exportToCSV(): string {
  const assessments = getAllAssessments();
  if (assessments.length === 0) return '';

  // CSV headers
  const headers = ['ID', 'Timestamp', 'Child Name', 'Child Age', 'Completed'];
  
  // Add question columns (q1-q55)
  for (let i = 1; i <= 55; i++) {
    headers.push(`Q${i}`);
  }

  const rows = assessments.map(assessment => {
    const row = [
      assessment.id,
      assessment.timestamp,
      assessment.childName || '',
      assessment.childAge?.toString() || '',
      assessment.completed.toString(),
    ];
    
    // Add answers for each question
    for (let i = 1; i <= 55; i++) {
      row.push((assessment.answers[`q${i}`] || '').toString());
    }
    
    return row.join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
