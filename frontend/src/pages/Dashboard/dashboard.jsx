

// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// const initialForm = {
//   electricity: "",
//   water: "",
//   ewaste: "",
//   aiUsage: "",
// };

// const metrics = [
//   {
//     key: "electricity",
//     label: "Electricity usage",
//     unit: "kWh",
//     icon: "⚡",
//     description: "Energy consumed",
//   },
//   {
//     key: "water",
//     label: "Water usage",
//     unit: "litres",
//     icon: "💧",
//     description: "Water consumed",
//   },
//   {
//     key: "ewaste",
//     label: "E-waste",
//     unit: "kg",
//     icon: "♻️",
//     description: "Electronic waste recorded",
//   },
//   {
//     key: "aiUsage",
//     label: "AI usage",
//     unit: "prompts",
//     icon: "🤖",
//     description: "AI prompts recorded",
//   },
// ];

// const navigation = [
//   { id: "overview", label: "My tracker", icon: "◉", path: "/dashboard" },
//   { id: "tips", label: "Eco tips", icon: "♧", path: "/eco-tips" },
//   {
//     id: "green-optimizer",
//     label: "Green Optimizer",
//     icon: "✿",
//     path: "/green-optimization",
//   },
//   {
//     id: "prompt-studio",
//     label: "Prompt studio",
//     icon: "✧",
//     badge: "NEW",
//     path: "/prompt-studio",
//   },
//   { id: "reports", label: "Reports", icon: "▥", path: "/reports" },
//   { id: "rewards", label: "Rewards", icon: "★", path: "/rewards" },
//   { id: "profile", label: "Profile", icon: "♙", path: "/profile" },
//   { id: "settings", label: "Settings", icon: "⚙", path: "/settings" },
// ];

// function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const userEmail =
//     sessionStorage.getItem("userEmail") || "EcoAI User";

//   const [form, setForm] = useState(initialForm);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [workspace, setWorkspace] = useState("personal");

//   // Fetch saved usage records from the backend
//   const fetchUsage = async () => {
//     setError("");

//     try {
//       const response = await fetch(`${API_BASE}/api/usage`);
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to load usage records."
//         );
//       }

//       setRecords(data.records || []);
//     } catch (err) {
//       console.error("Fetch usage error:", err);
//       setError(
//         "Could not load usage records. Check that your backend is running."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsage();
//   }, []);

//   // Calculate totals from the records returned by Firebase
//   const totals = records.reduce(
//     (sum, record) => ({
//       electricity:
//         sum.electricity + Number(record.electricity || 0),
//       water: sum.water + Number(record.water || 0),
//       ewaste: sum.ewaste + Number(record.ewaste || 0),
//       aiUsage: sum.aiUsage + Number(record.aiUsage || 0),
//     }),
//     {
//       electricity: 0,
//       water: 0,
//       ewaste: 0,
//       aiUsage: 0,
//     }
//   );

//   const handleNavigation = (event, item) => {
//     event.preventDefault();
//     navigate(item.path);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   // Save new usage data through the backend
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setMessage("");

//     if (Object.values(form).some((value) => value.trim() === "")) {
//       setError("Please fill in all usage fields.");
//       return;
//     }

//     const payload = {
//       electricity: Number(form.electricity),
//       water: Number(form.water),
//       ewaste: Number(form.ewaste),
//       aiUsage: Number(form.aiUsage),
//     };

//     const hasInvalidValue = Object.values(payload).some(
//       (value) => !Number.isFinite(value) || value < 0
//     );

//     if (hasInvalidValue) {
//       setError("Please enter valid, non-negative numbers.");
//       return;
//     }

//     if (!Number.isInteger(payload.aiUsage)) {
//       setError("AI prompts must be a whole number.");
//       return;
//     }

//     setSaving(true);

//     try {
//       const response = await fetch(`${API_BASE}/api/usage`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.error || result.message || "Failed to save usage data."
//         );
//       }

//       setForm(initialForm);
//       setMessage("Usage data saved successfully!");

//       // Reload the real totals after saving
//       await fetchUsage();
//     } catch (err) {
//       console.error("Save usage error:", err);
//       setError(
//         err.message === "Failed to fetch"
//           ? "Cannot connect to the backend. Check that your server is running."
//           : err.message || "Unable to save usage data."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setMessage("");
//     await fetchUsage();
//     setMessage("Dashboard refresh completed.");
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("rememberMe");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="eco-dashboard">
//       <aside className="eco-sidebar">
//         <a
//           className="eco-brand"
//           href="/dashboard"
//           onClick={(event) => {
//             event.preventDefault();
//             navigate("/dashboard");
//           }}
//         >
//           <span className="eco-brand-icon">🌿</span>
//           <span>
//             <strong>verdant.ai</strong>
//             <small>Sustainability Workspace</small>
//           </span>
//         </a>

//         <div
//           className="workspace-toggle"
//           role="group"
//           aria-label="Select workspace"
//         >
//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "personal" ? "active" : ""
//             }`}
//             aria-pressed={workspace === "personal"}
//             onClick={() => setWorkspace("personal")}
//           >
//             Personal
//           </button>

//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "organization" ? "active" : ""
//             }`}
//             aria-pressed={workspace === "organization"}
//             onClick={() => setWorkspace("organization")}
//           >
//             Organization
//           </button>
//         </div>

//         <nav className="eco-nav" aria-label="Main navigation">
//           {navigation.map((item) => (
//             <a
//               key={item.id}
//               className={`eco-nav-link ${
//                 location.pathname === item.path ? "active" : ""
//               }`}
//               href={item.path}
//               aria-current={
//                 location.pathname === item.path ? "page" : undefined
//               }
//               onClick={(event) => handleNavigation(event, item)}
//             >
//               <span className="eco-nav-icon">{item.icon}</span>
//               <span>{item.label}</span>
//               {item.badge && (
//                 <span className="eco-nav-badge">{item.badge}</span>
//               )}
//             </a>
//           ))}
//         </nav>

//         <div className="eco-sidebar-bottom">
//           <div className="eco-user">
//             <div className="eco-avatar">
//               {userEmail.charAt(0).toUpperCase()}
//             </div>
//             <div className="eco-user-info">
//               <strong>{userEmail}</strong>
//               <small>EcoAI user</small>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="eco-logout"
//             onClick={handleLogout}
//           >
//             ↪ Log out
//           </button>
//         </div>
//       </aside>

//       <main className="eco-main" id="overview">
//         <header className="eco-header">
//           <div>
//             <p className="eco-eyebrow">YOUR SUSTAINABILITY SPACE</p>
//             <h1>Good to see you again 🌿</h1>
//             <p className="eco-subtitle">
//               Understand your usage and make more sustainable choices.
//             </p>
//           </div>

//           <div className="eco-status">
//             <span className="eco-status-dot" />
//             EcoAI dashboard
//           </div>
//         </header>

//         {error && (
//           <div className="eco-alert eco-alert-error" role="alert">
//             {error}
//           </div>
//         )}

//         {message && (
//           <div className="eco-alert eco-alert-success" role="status">
//             {message}
//           </div>
//         )}

//         <section className="eco-section">
//           <div className="eco-section-heading">
//             <div>
//               <p className="eco-eyebrow">YOUR IMPACT AT A GLANCE</p>
//               <h2>Usage overview</h2>
//             </div>

//             <button
//               type="button"
//               className="eco-refresh"
//               onClick={handleRefresh}
//               disabled={loading}
//             >
//               ↻ Refresh
//             </button>
//           </div>

//           <div className="eco-metrics">
//             {metrics.map((metric) => (
//               <article className="eco-metric-card" key={metric.key}>
//                 <div className="eco-metric-top">
//                   <span className="eco-metric-icon">
//                     {metric.icon}
//                   </span>
//                   <span className="eco-metric-unit">
//                     {metric.unit}
//                   </span>
//                 </div>

//                 <p className="eco-metric-label">{metric.label}</p>

//                 <div className="eco-metric-value">
//                   {loading
//                     ? "..."
//                     : Number(totals[metric.key] || 0).toLocaleString(
//                         undefined,
//                         { maximumFractionDigits: 2 }
//                       )}
//                 </div>

//                 <p className="eco-metric-description">
//                   {metric.description}
//                 </p>
//               </article>
//             ))}
//           </div>

//           <p className="eco-record-count">
//             {loading
//               ? "Loading records..."
//               : `${records.length} usage record(s)`}
//           </p>
//         </section>

//         <section className="eco-content-grid">
//           <div className="eco-panel" id="usage">
//             <div className="eco-panel-heading">
//               <div>
//                 <p className="eco-eyebrow">TRACK YOUR FOOTPRINT</p>
//                 <h2>Record your usage</h2>
//               </div>
//               <span className="eco-panel-emoji">📝</span>
//             </div>

//             <p className="eco-panel-description">
//               Enter your usage figures below. Use zero for any
//               category you don't want to record right now.
//             </p>

//             <form className="eco-usage-form" onSubmit={handleSubmit}>
//               <label>
//                 Electricity (kWh)
//                 <input
//                   type="number"
//                   name="electricity"
//                   min="0"
//                   step="any"
//                   value={form.electricity}
//                   onChange={handleChange}
//                   placeholder="e.g. 120"
//                   required
//                 />
//               </label>

//               <label>
//                 Water (litres)
//                 <input
//                   type="number"
//                   name="water"
//                   min="0"
//                   step="any"
//                   value={form.water}
//                   onChange={handleChange}
//                   placeholder="e.g. 500"
//                   required
//                 />
//               </label>

//               <label>
//                 E-waste (kg)
//                 <input
//                   type="number"
//                   name="ewaste"
//                   min="0"
//                   step="any"
//                   value={form.ewaste}
//                   onChange={handleChange}
//                   placeholder="e.g. 2"
//                   required
//                 />
//               </label>

//               <label>
//                 AI prompts
//                 <input
//                   type="number"
//                   name="aiUsage"
//                   min="0"
//                   step="1"
//                   value={form.aiUsage}
//                   onChange={handleChange}
//                   placeholder="e.g. 15"
//                   required
//                 />
//               </label>

//               <button
//                 className="eco-submit"
//                 type="submit"
//                 disabled={saving}
//               >
//                 {saving ? "Saving..." : "Save usage data →"}
//               </button>
//             </form>
//           </div>

//           <div className="eco-panel eco-tips-panel">
//             <p className="eco-eyebrow">SMALL STEPS, REAL CHANGE</p>
//             <h2>Green tips for you</h2>

//             <p className="eco-panel-description">
//               Simple habits can help reduce unnecessary resource use.
//             </p>

//             <div className="eco-tip">
//               <span>⚡</span>
//               <div>
//                 <strong>Save energy</strong>
//                 <p>
//                   Switch off devices and lights when they aren't needed.
//                 </p>
//               </div>
//             </div>

//             <div className="eco-tip">
//               <span>💧</span>
//               <div>
//                 <strong>Use water mindfully</strong>
//                 <p>
//                   Fix leaks and avoid letting water run unnecessarily.
//                 </p>
//               </div>
//             </div>

//             <div className="eco-tip">
//               <span>♻️</span>
//               <div>
//                 <strong>Extend device life</strong>
//                 <p>
//                   Repair, reuse, or responsibly recycle electronics.
//                 </p>
//               </div>
//             </div>

//             <div className="eco-tip">
//               <span>🤖</span>
//               <div>
//                 <strong>Make AI prompts count</strong>
//                 <p>
//                   Write clear prompts to reduce repeated requests.
//                 </p>
//               </div>
//             </div>

//             <p className="eco-disclaimer">
//               Totals reflect saved usage records. They are not
//               independently measured environmental impact estimates.
//             </p>
//           </div>
//         </section>

//         <footer className="eco-footer">
//           verdant.ai · Track thoughtfully. Choose sustainably.
//         </footer>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import './dashboard.css'

const weeklyData = [
  { day: 'Mon', usage: 32 },
  { day: 'Tue', usage: 46 },
  { day: 'Wed', usage: 37 },
  { day: 'Thu', usage: 55 },
  { day: 'Fri', usage: 42 },
  { day: 'Sat', usage: 28 },
  { day: 'Sun', usage: 35 },
]

function MetricCard({ label, value, unit, icon, note }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <div className="metric-value">
        {value}<small> {unit}</small>
      </div>
      <p>{note}</p>
    </article>
  )
}

export default function Dashboard({ workspace, onNavigate }) {
  const [showNote, setShowNote] = useState(false)
  const isOrg = workspace === 'organization'

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">
            {isOrg ? 'ORGANIZATION OVERVIEW' : 'PERSONAL OVERVIEW'}
          </span>
          <h2>{isOrg ? 'A greener team starts here.' : 'Small changes. Real impact.'}</h2>
          <p>
            {isOrg
              ? 'Review team resource-use estimates and build better sustainability habits.'
              : 'Track your resources, understand your impact, and discover your next green step.'}
          </p>
        </div>
        <div className="welcome-leaf" aria-hidden="true">♧</div>
      </div>

      <div className="dashboard-section-heading">
        <div>
          <h3>At a glance</h3>
          <p>Sample figures for the dashboard preview</p>
        </div>
        <button className="outline-button" onClick={() => onNavigate('my-tracker')}>
          + Record usage
        </button>
      </div>

      <div className="metrics-grid">
        <MetricCard label="Electricity" value={isOrg ? '1,240' : '120'} unit="kWh" icon="ϟ" note="Sample usage estimate" />
        <MetricCard label="Water" value={isOrg ? '5,200' : '500'} unit="L" icon="♧" note="Sample usage estimate" />
        <MetricCard label="E-waste" value={isOrg ? '12' : '2'} unit="items" icon="♻" note="Items recorded" />
        <MetricCard label="AI usage" value={isOrg ? '180' : '15'} unit="prompts" icon="✳" note="Sample activity count" />
      </div>

      <div className="dashboard-lower-grid">
        <section className="dashboard-card usage-card">
          <div className="card-heading">
            <div>
              <h3>Weekly usage activity</h3>
              <p>Illustrative activity units, not measured emissions</p>
            </div>
            <span className="card-period">7 days</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#edf1ed" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#839087', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#839087', fontSize: 11 }} />
                <Tooltip cursor={{ fill: '#f2f7f2' }} />
                <Bar dataKey="usage" name="Activity" fill="#438c5e" radius={[5, 5, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-card score-card">
          <span className="score-label">SUSTAINABILITY SCORE</span>
          <div className="score-ring"><span>--<small>/100</small></span></div>
          <h3>Your score starts here</h3>
          <p>Record usage data to begin assessing your sustainability progress.</p>
          <button className="primary-button" onClick={() => onNavigate('my-tracker')}>
            Start tracking
          </button>
        </section>
      </div>

      <section className="next-step-card">
        <div className="next-step-icon">✳</div>
        <div>
          <h3>Your next green step</h3>
          <p>Start with one resource record. Consistent tracking makes progress easier to understand.</p>
          {showNote && <p className="inline-note">Tip: compare electricity and water usage over the same reporting period.</p>}
        </div>
        <button className="text-button" onClick={() => setShowNote(!showNote)}>
          {showNote ? 'Hide tip' : 'View tip'} →
        </button>
      </section>
    </div>
  )
}