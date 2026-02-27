# Deployment Guide

## 1) Deploy backend (Render)

1. Push this project to GitHub.
2. In Render, click `New +` -> `Blueprint`.
3. Select your repository and deploy.
4. Render will read `render.yaml` and create `loan-default-api`.
5. After deployment, open:
   - `https://<your-render-service>.onrender.com/health`
   - You should see `"status": "ok"`.

## 2) Deploy frontend (Vercel)

1. In Vercel, import the same GitHub repository.
2. Set `Root Directory` to `frontend`.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://<your-render-service>.onrender.com`
4. Deploy.

## 3) Verify

1. Open the Vercel URL.
2. Go to `Make Prediction`.
3. Submit form values and confirm prediction appears.

## Notes

- Keep `backend/loan_random_forest.pkl` committed in the repo for backend startup.
- If the backend is sleeping on free plan, first request can take longer.
