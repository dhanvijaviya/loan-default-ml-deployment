import { FileText, Database, Cog, CheckCircle2 } from "lucide-react";

export function AboutProject() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">About Project</h1>
        <p className="mt-2 text-slate-400">
          Comprehensive overview of the machine learning classification project
        </p>
      </div>

      {/* Project Sections */}
      <div className="space-y-6">
        {/* Problem Statement */}
        <Section
          icon={FileText}
          title="Problem Statement"
          color="from-blue-500 to-blue-600"
        >
          <p className="text-slate-300 leading-relaxed">
            This project aims to develop a robust machine learning classification
            system capable of accurately predicting target classes based on a set of
            input features. The goal is to build and compare multiple classification
            algorithms to identify the most effective model for this specific dataset.
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            The classification task involves predicting one of three distinct classes
            (Class A, Class B, Class C) using 12 different features extracted from the
            dataset. This multi-class classification problem requires careful model
            selection and hyperparameter tuning to achieve optimal performance.
          </p>
        </Section>

        {/* Dataset Details */}
        <Section
          icon={Database}
          title="Dataset Details"
          color="from-purple-500 to-purple-600"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Total Samples" value="1,000 instances" />
            <DetailItem label="Number of Features" value="12 features" />
            <DetailItem label="Target Classes" value="3 classes (A, B, C)" />
            <DetailItem label="Class Distribution" value="Balanced" />
            <DetailItem label="Missing Values" value="None" />
            <DetailItem label="Data Split" value="80% Train / 20% Test" />
          </div>
          <div className="mt-4 rounded-lg bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-300">Feature Types:</span> The
              dataset consists of numerical features with varying scales, all of which
              were standardized during preprocessing to ensure optimal model
              performance.
            </p>
          </div>
        </Section>

        {/* Methodology */}
        <Section
          icon={Cog}
          title="Methodology"
          color="from-cyan-500 to-cyan-600"
        >
          <div className="space-y-4">
            <MethodologyStep
              number={1}
              title="Data Preprocessing"
              description="Applied data cleaning, handled outliers, and performed feature scaling using StandardScaler to normalize all features."
            />
            <MethodologyStep
              number={2}
              title="Model Selection"
              description="Evaluated five different classification algorithms: Random Forest, XGBoost, Support Vector Machine (SVM), Logistic Regression, and Decision Tree."
            />
            <MethodologyStep
              number={3}
              title="Cross-Validation"
              description="Implemented 5-fold cross-validation to assess model generalization and prevent overfitting."
            />
            <MethodologyStep
              number={4}
              title="Hyperparameter Tuning"
              description="Utilized GridSearchCV to optimize hyperparameters for each model, ensuring best possible performance."
            />
            <MethodologyStep
              number={5}
              title="Model Evaluation"
              description="Assessed models using multiple metrics including accuracy, precision, recall, F1-score, and ROC-AUC."
            />
          </div>
        </Section>

        {/* Conclusion */}
        <Section
          icon={CheckCircle2}
          title="Conclusion"
          color="from-green-500 to-green-600"
        >
          <p className="text-slate-300 leading-relaxed">
            After comprehensive evaluation and comparison of multiple classification
            algorithms, <span className="font-semibold text-blue-400">Random Forest</span>{" "}
            emerged as the best-performing model with an impressive accuracy of{" "}
            <span className="font-semibold text-blue-400">96.2%</span> on the test set.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ResultItem
              label="Best Model"
              value="Random Forest"
              highlight
            />
            <ResultItem label="Test Accuracy" value="96.2%" highlight />
            <ResultItem label="Cross-Validation Score" value="94.8%" />
            <ResultItem label="ROC-AUC Score" value="0.975" />
          </div>
          <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-400">
              ✓ The model demonstrates excellent generalization with minimal overfitting
              (1.6% difference between train and test accuracy), making it suitable for
              production deployment.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

interface SectionProps {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, color, children }: SectionProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex size-12 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-lg`}
        >
          <Icon className="size-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-lg bg-slate-800/50 p-3">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

interface MethodologyStepProps {
  number: number;
  title: string;
  description: string;
}

function MethodologyStep({ number, title, description }: MethodologyStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/50">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

interface ResultItemProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function ResultItem({ label, value, highlight }: ResultItemProps) {
  return (
    <div
      className={`rounded-lg p-3 ${
        highlight
          ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30"
          : "bg-slate-800/50"
      }`}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-1 font-semibold ${highlight ? "text-blue-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
