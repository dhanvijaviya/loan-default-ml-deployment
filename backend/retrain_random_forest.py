from __future__ import annotations

import csv
import pickle
from pathlib import Path

import numpy as np
from sklearn.ensemble import RandomForestClassifier

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DATA_PATH = PROJECT_ROOT / "loan_cleaned.csv"
MODEL_PATH = BASE_DIR / "loan_random_forest.pkl"

NUMERIC_COLUMNS = [
    "Age",
    "Income",
    "LoanAmount",
    "CreditScore",
    "MonthsEmployed",
    "NumCreditLines",
    "InterestRate",
    "LoanTerm",
    "DTIRatio",
]

CATEGORICAL_LEVELS = {
    "Education": ["Bachelor's", "High School", "Master's", "PhD"],
    "EmploymentType": ["Full-time", "Part-time", "Self-employed", "Unemployed"],
    "MaritalStatus": ["Divorced", "Married", "Single"],
    "HasMortgage": ["No", "Yes"],
    "HasDependents": ["No", "Yes"],
    "LoanPurpose": ["Auto", "Business", "Education", "Home", "Other"],
    "HasCoSigner": ["No", "Yes"],
}


def load_training_matrix() -> tuple[np.ndarray, np.ndarray]:
    features: list[list[float]] = []
    target: list[int] = []

    with DATA_PATH.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        if "Default" not in (reader.fieldnames or []):
            raise ValueError("Expected target column 'Default' in loan_cleaned.csv")

        for row in reader:
            vec: list[float] = []
            for col in NUMERIC_COLUMNS:
                vec.append(float(row[col]))

            for col, levels in CATEGORICAL_LEVELS.items():
                value = row[col]
                for level in levels[1:]:
                    vec.append(1.0 if value == level else 0.0)

            features.append(vec)
            target.append(int(row["Default"]))

    return np.array(features, dtype=float), np.array(target, dtype=int)


def main() -> None:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset not found: {DATA_PATH}")

    x, y = load_training_matrix()

    model = RandomForestClassifier(
        n_estimators=400,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced_subsample",
    )
    model.fit(x, y)

    with MODEL_PATH.open("wb") as file:
        pickle.dump(model, file)

    unique, counts = np.unique(y, return_counts=True)
    print(f"Saved model to {MODEL_PATH}")
    print("Class balance:", {int(k): int(v) for k, v in zip(unique, counts)})


if __name__ == "__main__":
    main()
