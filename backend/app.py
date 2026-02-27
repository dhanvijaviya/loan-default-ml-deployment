from __future__ import annotations

import os
import pickle
from pathlib import Path

import numpy as np
from flask import Flask, jsonify, request

try:
    from flask_cors import CORS
except ModuleNotFoundError:
    CORS = None

BASE_DIR = Path(__file__).resolve().parent
MODEL_KEY = "gradient_boosting"
MODEL_FILE = BASE_DIR / "loan_gradient_boosting.pkl"
DEFAULT_RISK_THRESHOLD = float(os.getenv("DEFAULT_RISK_THRESHOLD", "0.40"))

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

DUMMY_COLUMNS = [
    f"{col}_{level}"
    for col, levels in CATEGORICAL_LEVELS.items()
    for level in levels[1:]
]

MODEL_COLUMNS = NUMERIC_COLUMNS + DUMMY_COLUMNS

app = Flask(__name__)
if CORS is not None:
    CORS(app)

MODEL = None
if MODEL_FILE.exists():
    with MODEL_FILE.open("rb") as file:
        MODEL = pickle.load(file)


def _vector_from_payload(payload: dict) -> np.ndarray:
    if "features" in payload:
        values = payload["features"]
        if not isinstance(values, list) or len(values) != len(MODEL_COLUMNS):
            raise ValueError(f"'features' must be a list of {len(MODEL_COLUMNS)} numbers")
        return np.array(values, dtype=float)

    missing = [
        key
        for key in [*NUMERIC_COLUMNS, *CATEGORICAL_LEVELS.keys()]
        if key not in payload
    ]
    if missing:
        raise ValueError(f"Missing fields: {', '.join(missing)}")

    vec = []
    for col in NUMERIC_COLUMNS:
        vec.append(float(payload[col]))

    for col, levels in CATEGORICAL_LEVELS.items():
        value = payload[col]
        if value not in levels:
            raise ValueError(f"Invalid value for {col}: {value}. Allowed: {levels}")
        for level in levels[1:]:
            vec.append(1.0 if value == level else 0.0)

    return np.array(vec, dtype=float)

@app.get("/")
def home():
    return jsonify(
        {
            "message": "Loan default prediction API is running",
            "predict_endpoint": "/predict",
            "method": "POST",
            "available_models": [MODEL_KEY] if MODEL is not None else [],
            "default_model": MODEL_KEY if MODEL is not None else None,
            "expected_fields": [*NUMERIC_COLUMNS, *CATEGORICAL_LEVELS.keys()],
        }
    )


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "available_models": [MODEL_KEY] if MODEL is not None else [],
            "model_file": MODEL_FILE.name if MODEL is not None else None,
        }
    )


@app.post("/predict")
def predict():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Request body must be JSON object"}), 400

    if MODEL is None:
        return jsonify({"error": f"Model file not found: {MODEL_FILE.name}"}), 500

    try:
        raw_features = _vector_from_payload(data).reshape(1, -1)
        probability_default = float(MODEL.predict_proba(raw_features)[0][1])
        prediction = 1 if probability_default >= DEFAULT_RISK_THRESHOLD else 0
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": f"Prediction failed: {exc}"}), 500

    return jsonify(
        {
            "model_used": MODEL_KEY,
            "prediction": prediction,
            "prediction_label": "Default" if prediction == 1 else "No Default",
            "probability_default": probability_default,
            "probability_no_default": 1.0 - probability_default,
            "confidence": max(probability_default, 1.0 - probability_default),
            "threshold_used": DEFAULT_RISK_THRESHOLD,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
