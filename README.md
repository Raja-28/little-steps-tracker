# KidsFocus - Pediatric ADHD Assessment Tool

A comprehensive, child-friendly web application for screening ADHD and related behavioral concerns in children ages 6-12, based on the validated Vanderbilt ADHD Parent Assessment Scale.

## 🎯 Overview

**CLINICAL NOTE:** This is a screening tool — not a diagnostic instrument. Professional evaluation is required for any diagnosis.

KidsFocus provides:
- Evidence-based ADHD screening using Vanderbilt Assessment Scale
- Screening for comorbid conditions (ODD, Conduct Disorder, Anxiety/Depression)
- Functional impairment assessment
- Immediate results with clinical interpretation
- Data export capabilities for healthcare providers

## 🚀 Features

### Core Functionality
- **Multi-step Assessment**: 55-question questionnaire organized into 6 sections
- **Real-time Progress**: Visual progress tracking and stepper navigation
- **Auto-save**: Answers automatically saved to localStorage
- **Instant Scoring**: Immediate results based on DSM-5 criteria
- **Beautiful UI**: Child-friendly design with smooth animations

### Pages
1. **Home** - Landing page with overview and call-to-action
2. **Assessment** - Multi-step questionnaire with progress tracking
3. **Results** - Detailed scoring breakdown and clinical interpretation
4. **About** - Information about the tool and proper usage
5. **Admin** - View, export, and manage assessment data

### Technical Features
- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form + Zod for validation
- LocalStorage for data persistence
- CSV/JSON export functionality

## 📋 Questionnaire Structure

### Symptom Sections (Questions 1-47)
- **Inattention** (Q1-9): Attention and focus symptoms
- **Hyperactivity/Impulsivity** (Q10-18): Motor activity and impulsivity
- **Oppositional Defiant Disorder** (Q19-26): ODD screening
- **Conduct Disorder** (Q27-40): Conduct problem screening
- **Anxiety/Depression** (Q41-47): Emotional concerns

### Performance Section (Questions 48-55)
- Academic performance (reading, writing, math)
- Social relationships (parents, siblings, peers)
- Participation in activities

## 🎯 Scoring Algorithm

### ADHD Criteria
Based on DSM-5 diagnostic criteria:

- **Predominantly Inattentive**: ≥6 inattention symptoms (scored ≥2) + impairment
- **Predominantly Hyperactive/Impulsive**: ≥6 hyperactivity symptoms (scored ≥2) + impairment
- **Combined**: ≥6 in both domains + impairment
- **Impairment**: ANY performance item scored ≥4

### Comorbid Screens
- **ODD**: ≥4/8 symptoms (scored ≥2) + impairment
- **Conduct**: ≥3/14 symptoms (scored ≥2) + impairment
- **Anxiety/Depression**: ≥3/7 symptoms (scored ≥2) + impairment

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Quick Start
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd kidsfocus

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── QuestionCard.tsx # Individual question display
│   ├── ProgressBar.tsx  # Assessment progress indicator
│   └── Stepper.tsx      # Section navigation stepper
├── data/
│   └── questions.json   # Complete Vanderbilt questionnaire
├── pages/
│   ├── Index.tsx        # Home/landing page
│   ├── Assessment.tsx   # Multi-step questionnaire
│   ├── Results.tsx      # Scoring and interpretation
│   ├── About.tsx        # Information and resources
│   └── Admin.tsx        # Data management panel
├── utils/
│   ├── scoring.ts       # Scoring algorithm implementation
│   └── storage.ts       # LocalStorage helpers
└── hooks/
    └── use-toast.ts     # Toast notifications
```

## 🎨 Design System

### Color Palette (HSL)
- **Primary**: Sky Blue (210, 70%, 65%)
- **Secondary**: Sunshine Yellow (45, 85%, 75%)
- **Accent**: Mint Green (150, 55%, 70%)
- **Background**: Light Blue-Gray (210, 40%, 98%)
- **Foreground**: Soft Dark (210, 20%, 20%)

### Key Features
- Rounded corners and soft shadows
- Smooth animations with framer-motion
- Respects `prefers-reduced-motion`
- Mobile-responsive design
- Accessible ARIA labels

## 🧪 Testing

The scoring algorithm has been thoroughly tested against DSM-5 criteria. To run tests:

```bash
npm run test
```

### Test Coverage
- Inattention symptom counting
- Hyperactivity symptom counting
- Impairment detection
- ADHD subtype classification
- Comorbid condition screening

## 📊 Data Management

### LocalStorage Schema
```typescript
interface StoredAssessment {
  id: string;              // Unique assessment ID
  timestamp: string;       // ISO 8601 timestamp
  childName?: string;      // Optional child name
  childAge?: number;       // Optional age
  answers: {               // Question responses
    [questionId: string]: number;
  };
  completed: boolean;      // Completion status
}
```

### Export Options
- **JSON**: Full data structure with all answers
- **CSV**: Tabular format for analysis in Excel/R/Python

## 🔒 Privacy & Security

- **No server**: All data stored locally in browser
- **No tracking**: No analytics or third-party scripts
- **HIPAA considerations**: Not HIPAA-compliant as-is (local storage only)
- **User control**: Users can delete their data anytime

## 📖 Clinical Guidelines

### When to Use
- Initial screening for ADHD concerns
- Pre-appointment preparation
- Progress monitoring over time
- Teacher/parent comparison (separate assessments)

### When NOT to Use
- As sole basis for diagnosis
- For children under 6 or over 12
- Without clinical follow-up
- For legal/custody proceedings

### Next Steps After Screening
1. Download and print results
2. Schedule appointment with:
   - Pediatrician
   - Child psychiatrist
   - Clinical psychologist
3. Request teacher rating scale
4. Discuss comprehensive evaluation plan

## 🤝 Contributing

This is an educational/clinical tool. Contributions welcome for:
- Bug fixes
- UI/UX improvements
- Additional languages
- Accessibility enhancements
- Documentation improvements

## 📚 References

- American Academy of Pediatrics (AAP) ADHD Guidelines
- DSM-5 Diagnostic Criteria for ADHD
- Vanderbilt ADHD Diagnostic Rating Scale
- National Institute of Mental Health (NIMH)

## 📄 License

This project is for educational and clinical screening purposes. Not for commercial use without proper validation and approval.

## ⚠️ Disclaimer

This tool is for screening purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper evaluation and diagnosis of ADHD and related conditions.

## 🔗 Resources

- [CHADD (Children and Adults with ADHD)](https://chadd.org)
- [CDC - ADHD Information](https://www.cdc.gov/adhd/)
- [NIMH - ADHD](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd)
- [AAP Clinical Practice Guideline](https://publications.aap.org/pediatrics/article/144/4/e20192528/81590/Clinical-Practice-Guideline-for-the-Diagnosis)

---

**Built with ❤️ for families navigating ADHD concerns**
