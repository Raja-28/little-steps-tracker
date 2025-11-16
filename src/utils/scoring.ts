// CLINICAL NOTE: This is a screening tool — not a diagnosis.
// Professional evaluation is required for any diagnosis.

export interface AssessmentAnswers {
  [questionId: string]: number;
}

export interface ScoringResult {
  inattentionCount: number;
  hyperactivityCount: number;
  hasImpairment: boolean;
  adhdSubtype: 'none' | 'predominantly-inattentive' | 'predominantly-hyperactive' | 'combined';
  oddPositive: boolean;
  conductPositive: boolean;
  anxietyPositive: boolean;
  oddCount: number;
  conductCount: number;
  anxietyCount: number;
}

/**
 * Score the Vanderbilt ADHD Parent Assessment
 * Based on DSM-5 criteria and Vanderbilt scoring guidelines
 */
export function scoreAssessment(answers: AssessmentAnswers): ScoringResult {
  // Count symptoms scored ≥2 (Often or Very Often)
  
  // Inattention symptoms (questions 1-9)
  const inattentionCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .filter(q => (answers[`q${q}`] || 0) >= 2)
    .length;

  // Hyperactivity/Impulsivity symptoms (questions 10-18)
  const hyperactivityCount = [10, 11, 12, 13, 14, 15, 16, 17, 18]
    .filter(q => (answers[`q${q}`] || 0) >= 2)
    .length;

  // Performance impairment (questions 48-55)
  // ANY item scored ≥4 (Somewhat Problem or Problematic)
  const hasImpairment = [48, 49, 50, 51, 52, 53, 54, 55]
    .some(q => (answers[`q${q}`] || 0) >= 4);

  // Determine ADHD subtype
  let adhdSubtype: ScoringResult['adhdSubtype'] = 'none';
  
  if (inattentionCount >= 6 && hyperactivityCount >= 6 && hasImpairment) {
    adhdSubtype = 'combined';
  } else if (inattentionCount >= 6 && hasImpairment) {
    adhdSubtype = 'predominantly-inattentive';
  } else if (hyperactivityCount >= 6 && hasImpairment) {
    adhdSubtype = 'predominantly-hyperactive';
  }

  // ODD screening (questions 19-26)
  const oddCount = [19, 20, 21, 22, 23, 24, 25, 26]
    .filter(q => (answers[`q${q}`] || 0) >= 2)
    .length;
  const oddPositive = oddCount >= 4 && hasImpairment;

  // Conduct disorder screening (questions 27-40)
  const conductCount = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    .filter(q => (answers[`q${q}`] || 0) >= 2)
    .length;
  const conductPositive = conductCount >= 3 && hasImpairment;

  // Anxiety/Depression screening (questions 41-47)
  const anxietyCount = [41, 42, 43, 44, 45, 46, 47]
    .filter(q => (answers[`q${q}`] || 0) >= 2)
    .length;
  const anxietyPositive = anxietyCount >= 3 && hasImpairment;

  return {
    inattentionCount,
    hyperactivityCount,
    hasImpairment,
    adhdSubtype,
    oddPositive,
    conductPositive,
    anxietyPositive,
    oddCount,
    conductCount,
    anxietyCount,
  };
}

export function getSubtypeDescription(subtype: ScoringResult['adhdSubtype']): string {
  switch (subtype) {
    case 'combined':
      return 'Combined Presentation';
    case 'predominantly-inattentive':
      return 'Predominantly Inattentive Presentation';
    case 'predominantly-hyperactive':
      return 'Predominantly Hyperactive/Impulsive Presentation';
    default:
      return 'Screening Does Not Meet Criteria';
  }
}

export function getSubtypeExplanation(subtype: ScoringResult['adhdSubtype']): string {
  switch (subtype) {
    case 'combined':
      return 'Screening suggests significant symptoms in both inattention and hyperactivity/impulsivity domains with functional impairment.';
    case 'predominantly-inattentive':
      return 'Screening suggests significant symptoms primarily in the inattention domain with functional impairment.';
    case 'predominantly-hyperactive':
      return 'Screening suggests significant symptoms primarily in the hyperactivity/impulsivity domain with functional impairment.';
    default:
      return 'Screening results do not meet the threshold criteria for ADHD. This does not rule out other concerns.';
  }
}
