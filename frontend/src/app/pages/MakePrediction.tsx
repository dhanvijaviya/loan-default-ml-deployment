import { useMemo, useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";

type PredictionResponse = {
  model_used: string;
  prediction: number;
  prediction_label: string;
  probability_default: number;
  probability_no_default: number;
  confidence: number;
};

type FormDataShape = {
  Age: string;
  Income: string;
  LoanAmount: string;
  CreditScore: string;
  MonthsEmployed: string;
  NumCreditLines: string;
  InterestRate: string;
  LoanTerm: string;
  DTIRatio: string;
  Education: string;
  EmploymentType: string;
  MaritalStatus: string;
  HasMortgage: string;
  HasDependents: string;
  LoanPurpose: string;
  HasCoSigner: string;
};

const EDUCATION_OPTIONS = ["Bachelor's", "High School", "Master's", "PhD"];
const EMPLOYMENT_OPTIONS = ["Full-time", "Part-time", "Self-employed", "Unemployed"];
const MARITAL_OPTIONS = ["Divorced", "Married", "Single"];
const YES_NO_OPTIONS = ["No", "Yes"];
const LOAN_PURPOSE_OPTIONS = ["Auto", "Business", "Education", "Home", "Other"];
const NUMERIC_PLACEHOLDERS: Partial<Record<keyof FormDataShape, string>> = {
  Age: "e.g. 22",
  Income: "e.g. 18000",
  LoanAmount: "e.g. 45000",
  CreditScore: "e.g. 520",
  MonthsEmployed: "e.g. 2",
  NumCreditLines: "e.g. 8",
  InterestRate: "e.g. 22.0",
  LoanTerm: "e.g. 60",
  DTIRatio: "e.g. 0.75",
};

const initialFormData: FormDataShape = {
  Age: "",
  Income: "",
  LoanAmount: "",
  CreditScore: "",
  MonthsEmployed: "",
  NumCreditLines: "",
  InterestRate: "",
  LoanTerm: "",
  DTIRatio: "",
  Education: EDUCATION_OPTIONS[0],
  EmploymentType: EMPLOYMENT_OPTIONS[0],
  MaritalStatus: MARITAL_OPTIONS[0],
  HasMortgage: YES_NO_OPTIONS[0],
  HasDependents: YES_NO_OPTIONS[0],
  LoanPurpose: LOAN_PURPOSE_OPTIONS[0],
  HasCoSigner: YES_NO_OPTIONS[0],
};

export function MakePrediction() {
  const [formData, setFormData] = useState<FormDataShape>(initialFormData);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numericFields: Array<{ key: keyof FormDataShape; label: string }> = useMemo(
    () => [
      { key: "Age", label: "Age" },
      { key: "Income", label: "Income" },
      { key: "LoanAmount", label: "Loan Amount" },
      { key: "CreditScore", label: "Credit Score" },
      { key: "MonthsEmployed", label: "Months Employed" },
      { key: "NumCreditLines", label: "Number of Credit Lines" },
      { key: "InterestRate", label: "Interest Rate" },
      { key: "LoanTerm", label: "Loan Term" },
      { key: "DTIRatio", label: "DTI Ratio" },
    ],
    [],
  );

  const isFormValid = numericFields.every((field) => formData[field.key] !== "");

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        Age: Number(formData.Age),
        Income: Number(formData.Income),
        LoanAmount: Number(formData.LoanAmount),
        CreditScore: Number(formData.CreditScore),
        MonthsEmployed: Number(formData.MonthsEmployed),
        NumCreditLines: Number(formData.NumCreditLines),
        InterestRate: Number(formData.InterestRate),
        LoanTerm: Number(formData.LoanTerm),
        DTIRatio: Number(formData.DTIRatio),
        Education: formData.Education,
        EmploymentType: formData.EmploymentType,
        MaritalStatus: formData.MaritalStatus,
        HasMortgage: formData.HasMortgage,
        HasDependents: formData.HasDependents,
        LoanPurpose: formData.LoanPurpose,
        HasCoSigner: formData.HasCoSigner,
      };

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Prediction failed");
      }

      setPrediction(result as PredictionResponse);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Prediction failed";
      setError(message);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const confidencePercent = prediction ? prediction.confidence * 100 : 0;
  const isApproved = prediction ? prediction.prediction === 0 : false;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Make Prediction</h1>
        <p className="mt-2 text-slate-400">Enter loan applicant details and get live model prediction from Flask backend</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-xl font-semibold text-white">Input Features</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {numericFields.map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">{field.label}</label>
                <input
                  type="number"
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleNumericChange}
                  placeholder={NUMERIC_PLACEHOLDERS[field.key]}
                  className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            ))}

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Education</label>
              <select name="Education" value={formData.Education} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {EDUCATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Employment Type</label>
              <select name="EmploymentType" value={formData.EmploymentType} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {EMPLOYMENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Marital Status</label>
              <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {MARITAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Has Mortgage</label>
              <select name="HasMortgage" value={formData.HasMortgage} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Has Dependents</label>
              <select name="HasDependents" value={formData.HasDependents} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Loan Purpose</label>
              <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {LOAN_PURPOSE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-300">Has Co-Signer</label>
              <select name="HasCoSigner" value={formData.HasCoSigner} onChange={handleSelectChange} className="h-9 w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                {YES_NO_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePredict}
              disabled={!isFormValid || loading}
              className="sm:col-span-2 mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              <Sparkles className="size-5" />
              {loading ? "Predicting..." : "Predict"}
            </button>

            {error && <p className="sm:col-span-2 text-sm text-red-400">{error}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-xl font-semibold text-white">Prediction Result</h2>

          {prediction ? (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm text-slate-400">Prediction</p>
                <div className={`flex items-center gap-3 rounded-lg p-4 shadow-lg ${
                  isApproved
                    ? "bg-emerald-500/20 text-emerald-100 shadow-emerald-500/20"
                    : "bg-rose-500/20 text-rose-100 shadow-rose-500/20"
                }`}>
                  <TrendingUp className="size-6" />
                  <span className="text-2xl font-bold">
                    {isApproved ? "Loan Approved" : "Loan Will Default"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Algorithm used: {prediction.model_used}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-400">Confidence</p>
                <div className="rounded-lg bg-slate-800/50 p-4">
                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-sm text-slate-400">Model confidence</span>
                    <span className="text-2xl font-bold text-blue-400">{confidencePercent.toFixed(1)}%</span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${confidencePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-slate-800/30 p-4 text-sm text-slate-300">
                <p>Default Risk: {(prediction.probability_default * 100).toFixed(2)}%</p>
                <p>No-Default Chance: {(prediction.probability_no_default * 100).toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-slate-800/50">
                  <Sparkles className="size-8 text-slate-600" />
                </div>
                <p className="text-slate-500">Fill all required fields and click Predict to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
