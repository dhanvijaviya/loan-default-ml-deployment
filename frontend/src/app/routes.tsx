import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { MakePrediction } from "./pages/MakePrediction";
import { ModelComparison } from "./pages/ModelComparison";
import { PerformanceMetrics } from "./pages/PerformanceMetrics";
import { AboutProject } from "./pages/AboutProject";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "predict", Component: MakePrediction },
      { path: "comparison", Component: ModelComparison },
      { path: "metrics", Component: PerformanceMetrics },
      { path: "about", Component: AboutProject },
    ],
  },
]);
