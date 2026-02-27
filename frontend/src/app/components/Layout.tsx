import { Outlet, NavLink } from "react-router";
import { BarChart3, Target, GitCompare, Activity, Info, Brain } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3, exact: true },
  { to: "/predict", label: "Make Prediction", icon: Target },
  { to: "/comparison", label: "Model Comparison", icon: GitCompare },
  { to: "/metrics", label: "Performance Metrics", icon: Activity },
  { to: "/about", label: "About Project", icon: Info },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50">
              <Brain className="size-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">ML Classifier</h1>
              <p className="text-xs text-slate-400">Analytics Pro</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="size-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-3">
              <p className="text-xs text-slate-400">
                Powered by{" "}
                <span className="font-semibold text-blue-400">Analytics Suite</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}
