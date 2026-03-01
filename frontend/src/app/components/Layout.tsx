// import { Outlet, NavLink } from "react-router";
// import { BarChart3, Target, GitCompare, Activity, Info, Brain } from "lucide-react";

// const navItems = [
//   { to: "/", label: "Dashboard", icon: BarChart3, exact: true },
//   { to: "/predict", label: "Make Prediction", icon: Target },
//   { to: "/comparison", label: "Model Comparison", icon: GitCompare },
//   { to: "/metrics", label: "Performance Metrics", icon: Activity },
//   { to: "/about", label: "About Project", icon: Info },
// ];

// export function Layout() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
//       {/* Sidebar */}
//       <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl">
//         <div className="flex h-full flex-col">
//           {/* Logo */}
//           <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
//             <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50">
//               <Brain className="size-6 text-white" />
//             </div>
//             <div>
//               <h1 className="font-semibold text-white">ML Classifier</h1>
//               <p className="text-xs text-slate-400">Analytics Pro</p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 space-y-1 px-3 py-4">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.exact}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 shadow-lg shadow-blue-500/20"
//                       : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <item.icon className="size-5" />
//                     <span className="font-medium">{item.label}</span>
//                     {isActive && (
//                       <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Footer */}
//           <div className="border-t border-white/10 p-4">
//             <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-3">
//               <p className="text-xs text-slate-400">
//                 Powered by{" "}
//                 <span className="font-semibold text-blue-400">Analytics Suite</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 min-h-screen p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { BarChart3, Target, GitCompare, Activity, Info, Brain, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3, exact: true },
  { to: "/predict", label: "Make Prediction", icon: Target },
  { to: "/comparison", label: "Model Comparison", icon: GitCompare },
  { to: "/metrics", label: "Performance Metrics", icon: Activity },
  { to: "/about", label: "About Project", icon: Info },
];

export function Layout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/40">
              <Brain className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">ML Classifier</h1>
              <p className="text-xs text-slate-400">Analytics Pro</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-200 transition hover:bg-slate-800/70"
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {isMobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:bg-slate-950/50 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50">
              <Brain className="size-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">CreditGuard</h1>
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
      <main className="min-h-screen p-4 pt-20 sm:p-6 sm:pt-24 lg:ml-64 lg:p-8 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
