// // import React, { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import "./GreenOptimization.css";

// // const initialServers = [
// //   {
// //     id: 1,
// //     name: "GPU Cluster A",
// //     detail: "Running · CPU 54%",
// //     type: "GPU",
// //     usage: 8,
// //     status: "Idle risk",
// //   },
// //   {
// //     id: 2,
// //     name: "Inference Pool",
// //     detail: "Running · CPU 67%",
// //     type: "GPU",
// //     usage: 72,
// //     status: "Healthy",
// //   },
// //   {
// //     id: 3,
// //     name: "Batch Node 04",
// //     detail: "Running · CPU 27%",
// //     type: "GPU",
// //     usage: 19,
// //     status: "Low use",
// //   },
// // ];

// // const extraServer = {
// //   id: 4,
// //   name: "Embedding Worker",
// //   detail: "Running · CPU 38%",
// //   type: "GPU",
// //   usage: 43,
// //   status: "Healthy",
// // };

// // const workloads = [
// //   {
// //     name: "Summarization batch",
// //     model: "Reasoner XL",
// //     energy: "42.6 kWh",
// //     status: "Review",
// //   },
// //   {
// //     name: "Support classifier",
// //     model: "Eco-Lite",
// //     energy: "8.4 kWh",
// //     status: "Efficient",
// //   },
// //   {
// //     name: "Model training",
// //     model: "Vision Pro",
// //     energy: "90.2 kWh",
// //     status: "Schedule",
// //   },
// // ];

// // // Dashboard sidebar ke same buttons aur routes
// // const navigation = [
// //   { id: "overview", label: "My tracker", icon: "◉", path: "/dashboard" },
// //   { id: "tips", label: "Eco tips", icon: "♧", path: "/eco-tips" },
// //   {
// //     id: "Optimizer",
// //     label: "Green Optimizer",
// //     icon: "✿",
// //     path: "/green-optimization",
// //   },
// //   {
// //     id: "prompt-studio",
// //     label: "Prompt studio",
// //     icon: "✧",
// //     badge: "NEW",
// //     path: "/prompt-studio",
// //   },
// //   { id: "reports", label: "Reports", icon: "▥", path: "/reports" },
// //   { id: "rewards", label: "Rewards", icon: "★", path: "/rewards" },
// //   { id: "profile", label: "Profile", icon: "♙", path: "/profile" },
// //   { id: "settings", label: "Settings", icon: "⚙", path: "/settings" },
// // ];

// // function Icon({ children, className = "" }) {
// //   return (
// //     <span className={`go-icon ${className}`} aria-hidden="true">
// //       {children}
// //     </span>
// //   );
// // }

// // function MetricCard({ icon, label, value, note, tone = "" }) {
// //   return (
// //     <article className="go-metric-card">
// //       <Icon className={`metric-icon ${tone}`}>{icon}</Icon>

// //       <div className="metric-copy">
// //         <span className="go-muted">{label}</span>
// //         <strong>{value}</strong>
// //         <small>{note}</small>
// //       </div>
// //     </article>
// //   );
// // }

// // export default function GreenOptimizer() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [workspace, setWorkspace] = useState("Organization");
// //   const [showAllServers, setShowAllServers] = useState(false);
// //   const [scheduled, setScheduled] = useState(false);
// //   const [notice, setNotice] = useState("");

// //   const userEmail =
// //     sessionStorage.getItem("userEmail") || "EcoAI User";

// //   const visibleServers = showAllServers
// //     ? [...initialServers, extraServer]
// //     : initialServers;

// //   const activeItem = navigation.find(
// //     (item) => item.path === location.pathname
// //   );

// //   const activeLabel = activeItem?.label || "Green activities";

// //   function handleNavigation(item) {
// //     setNotice("");
// //     navigate(item.path);
// //   }

// //   function handleSchedule() {
// //     setScheduled(true);
// //     setNotice("Green window scheduled for 11:00–15:00.");
// //   }

// //   function handleLogout() {
// //     sessionStorage.removeItem("isLoggedIn");
// //     sessionStorage.removeItem("userEmail");
// //     sessionStorage.removeItem("rememberMe");

// //     navigate("/login", { replace: true });
// //   }

// //   return (
// //     <div className="go-app">
// //       {/* LEFT SIDEBAR */}
// //       <aside className="go-sidebar">
// //         <button
// //           type="button"
// //           className="go-brand"
// //           onClick={() => navigate("/dashboard")}
// //           aria-label="Go to dashboard"
// //         >
// //           <span className="go-brand-mark">🌿</span>
// //           <span>verdant.ai</span>
// //         </button>

// //         <p className="go-sidebar-label">WORKSPACE</p>

// //         {/* Workspace switch */}
// //         <div className="go-workspace-switch" role="group">
// //           <button
// //             type="button"
// //             className={workspace === "Personal" ? "selected" : ""}
// //             aria-pressed={workspace === "Personal"}
// //             onClick={() => {
// //               setWorkspace("Personal");
// //               setNotice("Personal workspace selected.");
// //             }}
// //           >
// //             Personal
// //           </button>

// //           <button
// //             type="button"
// //             className={
// //               workspace === "Organization" ? "selected" : ""
// //             }
// //             aria-pressed={workspace === "Organization"}
// //             onClick={() => {
// //               setWorkspace("Organization");
// //               setNotice("Organization workspace selected.");
// //             }}
// //           >
// //             Organization
// //           </button>
// //         </div>

// //         {/* Navigation matching Dashboard */}
// //         <nav className="go-nav" aria-label="Main navigation">
// //           <p className="go-nav-heading">MAIN MENU</p>

// //           {navigation.map((item) => (
// //             <button
// //               type="button"
// //               key={item.id}
// //               className={`go-nav-item ${
// //                 location.pathname === item.path ? "active" : ""
// //               }`}
// //               onClick={() => handleNavigation(item)}
// //               aria-current={
// //                 location.pathname === item.path ? "page" : undefined
// //               }
// //             >
// //               <span className="go-nav-icon">{item.icon}</span>
// //               <span className="go-nav-label">{item.label}</span>

// //               {item.badge && (
// //                 <span className="go-new">{item.badge}</span>
// //               )}
// //             </button>
// //           ))}
// //         </nav>

// //         {/* Bottom sidebar */}
// //         <div className="go-sidebar-bottom">
// //           <div className="go-plan-card">
// //             <span className="go-plan-icon">✦</span>

// //             <strong>Make your AI greener</strong>

// //             <p>
// //               Find ways to reduce energy use across your workloads.
// //             </p>

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setNotice(
// //                   "Explore the resource utilization and cleaner-energy suggestions on this page."
// //                 )
// //               }
// //             >
// //               Explore optimization <span>→</span>
// //             </button>
// //           </div>

// //           <div className="go-user">
// //             <span className="go-avatar">
// //               {userEmail.charAt(0).toUpperCase()}
// //             </span>

// //             <div className="go-user-copy">
// //               <strong>{userEmail}</strong>
// //               <small>{workspace} workspace</small>
// //             </div>

// //             <button
// //               type="button"
// //               className="go-dots"
// //               aria-label="Account options"
// //               onClick={() => navigate("/profile")}
// //             >
// //               ···
// //             </button>
// //           </div>

// //           <button
// //             className="go-help"
// //             type="button"
// //             onClick={() =>
// //               setNotice(
// //                 "Energy and carbon values are illustrative demo estimates."
// //               )
// //             }
// //           >
// //             <span>ⓘ</span>
// //             <span>Help &amp; methodology</span>
// //           </button>

// //           <button
// //             className="go-logout"
// //             type="button"
// //             onClick={handleLogout}
// //           >
// //             ↪ Log out
// //           </button>
// //         </div>
// //       </aside>

// //       {/* MAIN CONTENT */}
// //       <main className="go-main">
// //         <header className="go-topbar">
// //           <div className="go-breadcrumb">
// //             <span>Workspace</span>
// //             <b>›</b>
// //             <strong>{activeLabel}</strong>
// //           </div>

// //           <div className="go-topbar-right">
// //             <span className="go-live-dot" />
// //             <span>Estimates active</span>

// //             <button
// //               type="button"
// //               aria-label="Notifications"
// //               onClick={() => setNotice("You are all caught up.")}
// //             >
// //               ♧
// //             </button>
// //           </div>
// //         </header>

// //         <div className="go-content">
// //           {/* HERO */}
// //           <section className="go-hero">
// //             <div>
// //               <p className="go-eyebrow">
// //                 ORGANIZATION / SIMULATED OPERATIONS
// //               </p>

// //               <h1>
// //                 Optimize the work
// //                 <br />
// //                 <span>behind</span> the model.
// //               </h1>

// //               <p className="go-subtitle">
// //                 Find waste in your AI estate before it becomes the default.
// //               </p>
// //             </div>

// //             <span className="go-simulated-badge">
// //               SIMULATED DATA
// //             </span>
// //           </section>

// //           {/* NOTICE */}
// //           {notice && (
// //             <div className="go-notice" role="status">
// //               <span>{notice}</span>

// //               <button
// //                 type="button"
// //                 onClick={() => setNotice("")}
// //                 aria-label="Dismiss notification"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           )}

// //           {/* METRICS */}
// //           <section className="go-metrics" aria-label="Usage summary">
// //             <MetricCard
// //               icon="⌁"
// //               label="AI requests"
// //               value="12,840"
// //               note="Across 14 workloads"
// //               tone="mint"
// //             />

// //             <MetricCard
// //               icon="ϟ"
// //               label="Estimated energy"
// //               value="184.6 kWh"
// //               note="This reporting period"
// //               tone="mint"
// //             />

// //             <MetricCard
// //               icon="☁"
// //               label="CO₂ footprint"
// //               value="59.1 kg"
// //               note="−17% optimized"
// //               tone="amber"
// //             />

// //             <MetricCard
// //               icon="♧"
// //               label="Energy saved"
// //               value="31.4 kWh"
// //               note="Potential savings"
// //               tone="lime"
// //             />
// //           </section>

// //           {/* SERVER AND CLEAN ENERGY SECTIONS */}
// //           <section className="go-middle-grid">
// //             <article className="go-panel go-resource-panel">
// //               <div className="go-panel-heading">
// //                 <div>
// //                   <p className="go-eyebrow">
// //                     INFRASTRUCTURE WATCH
// //                   </p>
// //                   <h2>Resource utilization</h2>
// //                 </div>

// //                 <button
// //                   className="go-outline-button"
// //                   type="button"
// //                   onClick={() =>
// //                     setShowAllServers((previous) => !previous)
// //                   }
// //                 >
// //                   {showAllServers ? "Show fewer" : "All servers"}
// //                   <span>›</span>
// //                 </button>
// //               </div>

// //               <div className="go-server-list">
// //                 {visibleServers.map((server) => (
// //                   <div className="go-server-row" key={server.id}>
// //                     <Icon className="go-server-icon">▦</Icon>

// //                     <div className="go-server-name">
// //                       <strong>{server.name}</strong>
// //                       <small>{server.detail}</small>
// //                     </div>

// //                     <div className="go-usage">
// //                       <div className="go-usage-label">
// //                         <span>{server.type}</span>
// //                         <strong>{server.usage}%</strong>
// //                       </div>

// //                       <div
// //                         className="go-progress"
// //                         role="progressbar"
// //                         aria-label={`${server.name} usage`}
// //                         aria-valuemin={0}
// //                         aria-valuemax={100}
// //                         aria-valuenow={server.usage}
// //                       >
// //                         <span
// //                           className={
// //                             server.usage < 20 ? "warning" : ""
// //                           }
// //                           style={{ width: `${server.usage}%` }}
// //                         />
// //                       </div>
// //                     </div>

// //                     <span
// //                       className={`go-status ${server.status
// //                         .toLowerCase()
// //                         .replace(/\s+/g, "-")}`}
// //                     >
// //                       {server.status}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </article>

// //             <article className="go-panel go-clean-panel">
// //               <p className="go-eyebrow">FLEXIBLE WORKLOAD</p>

// //               <h2>Run with cleaner energy.</h2>

// //               <p className="go-description">
// //                 We found a lower-carbon window for a workload that
// //                 doesn't need to run immediately.
// //               </p>

// //               <div className="go-window">
// //                 <Icon className="window-icon">▦</Icon>

// //                 <div>
// //                   <strong>11:00 – 15:00</strong>
// //                   <small>Estimated lower-carbon window</small>
// //                 </div>

// //                 <b>−24%</b>
// //               </div>

// //               <div className="go-window-meta">
// //                 <span>Model training · 3 hours</span>
// //                 <span>Potentially avoid 10.2 kg CO₂</span>
// //               </div>

// //               <button
// //                 className="go-primary-button"
// //                 type="button"
// //                 onClick={handleSchedule}
// //                 disabled={scheduled}
// //               >
// //                 {scheduled
// //                   ? "✓ Green window scheduled"
// //                   : "Schedule green window"}
// //                 <span>↗</span>
// //               </button>

// //               <small className="go-footnote">
// //                 {scheduled
// //                   ? "Your demo schedule has been updated."
// //                   : "Conceptual scheduling using simulated carbon-intensity data."}
// //               </small>
// //             </article>
// //           </section>

// //           {/* WORKLOAD TABLE */}
// //           <section className="go-panel go-workload-panel">
// //             <div className="go-panel-heading">
// //               <div>
// //                 <p className="go-eyebrow">WORKLOAD REVIEW</p>
// //                 <h2>Where to look next</h2>
// //               </div>

// //               <button
// //                 className="go-icon-button"
// //                 type="button"
// //                 aria-label="Workload options"
// //                 onClick={() =>
// //                   setNotice("Workload filters can be connected here.")
// //                 }
// //               >
// //                 ☷
// //               </button>
// //             </div>

// //             <div className="go-table-wrap">
// //               <table className="go-table">
// //                 <thead>
// //                   <tr>
// //                     <th>WORKLOAD</th>
// //                     <th>MODEL</th>
// //                     <th>ENERGY</th>
// //                     <th>STATUS</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>
// //                   {workloads.map((item) => (
// //                     <tr key={item.name}>
// //                       <td>{item.name}</td>
// //                       <td>{item.model}</td>
// //                       <td>{item.energy}</td>
// //                       <td>
// //                         <span
// //                           className={`go-table-status ${item.status.toLowerCase()}`}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </section>

// //           <p className="go-disclaimer">
// //             Energy and carbon values are illustrative estimates for
// //             demonstration purposes.
// //           </p>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// import { useMemo, useState } from 'react'
// import {
//   Zap,
//   Droplets,
//   Recycle,
//   BrainCircuit,
//   Trash2,
//   Plus,
//   Leaf,
// } from 'lucide-react'
// import './my-tracker.css'

// const STORAGE_KEY = 'ecoai-my-tracker-records-v1'
// const ELECTRICITY_EMISSION_FACTOR = 0.716

// function getLocalDateString(date = new Date()) {
//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')

//   return `${year}-${month}-${day}`
// }

// function createEmptyForm() {
//   return {
//     date: getLocalDateString(),
//     electricity: '',
//     water: '',
//     ewaste: '',
//     aiUsage: '',
//     notes: '',
//   }
// }

// function isValidDateString(value) {
//   if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
//     return false
//   }

//   const date = new Date(`${value}T00:00:00`)

//   return (
//     !Number.isNaN(date.getTime()) &&
//     getLocalDateString(date) === value
//   )
// }

// function normalizeRecord(record) {
//   if (!record || typeof record !== 'object') return null
//   if (!isValidDateString(record.date)) return null

//   const fields = ['electricity', 'water', 'ewaste', 'aiUsage']
//   const normalized = {}

//   for (const field of fields) {
//     const value = Number(record[field])

//     if (!Number.isFinite(value) || value < 0) return null

//     normalized[field] = value
//   }

//   if (!Number.isInteger(normalized.aiUsage)) return null

//   return {
//     id: String(record.id || `${record.date}-${Math.random().toString(36).slice(2)}`),
//     date: record.date,
//     ...normalized,
//     notes: typeof record.notes === 'string' ? record.notes : '',
//     createdAt:
//       typeof record.createdAt === 'string' ? record.createdAt : '',
//   }
// }

// function loadRecords() {
//   try {
//     const saved = localStorage.getItem(STORAGE_KEY)
//     if (!saved) return []

//     const parsed = JSON.parse(saved)
//     if (!Array.isArray(parsed)) return []

//     return parsed
//       .map(normalizeRecord)
//       .filter(Boolean)
//       .sort((a, b) => b.date.localeCompare(a.date))
//   } catch {
//     return []
//   }
// }

// function persistRecords(records) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
//     return true
//   } catch {
//     return false
//   }
// }

// function formatNumber(value) {
//   return Number(value).toLocaleString('en-IN', {
//     maximumFractionDigits: 2,
//   })
// }

// function formatDate(dateString) {
//   if (!isValidDateString(dateString)) return 'Invalid date'

//   return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   })
// }

// function calculateElectricityEmissions(electricityKwh) {
//   return electricityKwh * ELECTRICITY_EMISSION_FACTOR
// }

// export default function MyTracker() {
//   const [records, setRecords] = useState(loadRecords)
//   const [form, setForm] = useState(createEmptyForm)
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')
//   const [showForm, setShowForm] = useState(false)

//   const totals = useMemo(
//     () =>
//       records.reduce(
//         (result, record) => ({
//           electricity: result.electricity + record.electricity,
//           water: result.water + record.water,
//           ewaste: result.ewaste + record.ewaste,
//           aiUsage: result.aiUsage + record.aiUsage,
//           emissions:
//             result.emissions +
//             calculateElectricityEmissions(record.electricity),
//         }),
//         {
//           electricity: 0,
//           water: 0,
//           ewaste: 0,
//           aiUsage: 0,
//           emissions: 0,
//         },
//       ),
//     [records],
//   )

//   function updateField(event) {
//     const { name, value } = event.target

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }))
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     setError('')
//     setMessage('')

//     if (!isValidDateString(form.date)) {
//       setError('Please select a valid date.')
//       return
//     }

//     if (form.date > getLocalDateString()) {
//       setError('The record date cannot be in the future.')
//       return
//     }

//     const fields = [
//       { key: 'electricity', label: 'Electricity' },
//       { key: 'water', label: 'Water' },
//       { key: 'ewaste', label: 'E-waste' },
//       { key: 'aiUsage', label: 'AI prompts' },
//     ]

//     const values = {}

//     for (const field of fields) {
//       const rawValue = form[field.key]

//       if (
//         rawValue === '' ||
//         !Number.isFinite(Number(rawValue)) ||
//         Number(rawValue) < 0
//       ) {
//         setError(`${field.label}: enter a valid number equal to or greater than zero.`)
//         return
//       }

//       values[field.key] = Number(rawValue)
//     }

//     if (!Number.isInteger(values.aiUsage)) {
//       setError('AI prompts must be a whole number, such as 12.')
//       return
//     }

//     const newRecord = {
//       id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
//       date: form.date,
//       ...values,
//       notes: form.notes.trim(),
//       createdAt: new Date().toISOString(),
//     }

//     const updatedRecords = [...records, newRecord].sort((a, b) =>
//       b.date.localeCompare(a.date),
//     )

//     if (!persistRecords(updatedRecords)) {
//       setError(
//         'Your record could not be saved. Check your browser storage and available space, then try again.',
//       )
//       return
//     }

//     setRecords(updatedRecords)
//     setForm(createEmptyForm())
//     setShowForm(false)
//     setMessage('Your usage record has been saved.')
//   }

//   function deleteRecord(id) {
//     const confirmed = window.confirm(
//       'Delete this usage record? This action cannot be undone.',
//     )

//     if (!confirmed) return

//     const updatedRecords = records.filter((record) => record.id !== id)

//     if (!persistRecords(updatedRecords)) {
//       setError('The record could not be deleted from browser storage.')
//       setMessage('')
//       return
//     }

//     setRecords(updatedRecords)
//     setMessage('Usage record deleted.')
//     setError('')
//   }

//   function openForm() {
//     setShowForm(true)
//     setMessage('')
//     setError('')
//   }

//   return (
//     <div className="feature-page tracker-page">
//       <div className="feature-intro tracker-intro">
//         <span className="feature-tag">ECOAI / PERSONAL WORKSPACE</span>
//         <h2>My Tracker</h2>
//         <p>
//           Track your daily resource usage, review your history, and understand
//           your resource consumption over time.
//         </p>
//       </div>

//       <div className="tracker-welcome">
//         <div className="tracker-welcome-icon">
//           <Leaf size={25} />
//         </div>
//         <div className="tracker-welcome-copy">
//           <h3>Your sustainability journey</h3>
//           <p>
//             Record your resource use regularly to understand your habits and
//             identify opportunities to reduce waste.
//           </p>
//         </div>
//         <button
//           type="button"
//           className="tracker-primary-button"
//           onClick={() => {
//             if (showForm) {
//               setShowForm(false)
//               setError('')
//             } else {
//               openForm()
//             }
//           }}
//         >
//           <Plus size={17} />
//           {showForm ? 'Close form' : 'Add usage'}
//         </button>
//       </div>

//       {message && (
//         <div className="tracker-message success" role="status">
//           {message}
//         </div>
//       )}

//       {error && (
//         <div className="tracker-message error" role="alert">
//           {error}
//         </div>
//       )}

//       {showForm && (
//         <section className="tracker-card">
//           <div className="tracker-section-heading">
//             <div>
//               <h3>Record your resource usage</h3>
//               <p>Enter the usage for one day. Enter zero if there was no usage.</p>
//             </div>
//           </div>

//           <form className="tracker-form" onSubmit={handleSubmit}>
//             <label className="tracker-field tracker-date-field">
//               Date
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 max={getLocalDateString()}
//                 onChange={updateField}
//                 required
//               />
//             </label>

//             <label className="tracker-field">
//               <span className="tracker-field-title">
//                 <Zap size={17} /> Electricity
//               </span>
//               <span className="tracker-unit">Kilowatt-hours (kWh)</span>
//               <input
//                 type="number"
//                 name="electricity"
//                 min="0"
//                 step="any"
//                 value={form.electricity}
//                 onChange={updateField}
//                 placeholder="e.g. 4.5"
//                 required
//               />
//             </label>

//             <label className="tracker-field">
//               <span className="tracker-field-title">
//                 <Droplets size={17} /> Water
//               </span>
//               <span className="tracker-unit">Litres</span>
//               <input
//                 type="number"
//                 name="water"
//                 min="0"
//                 step="any"
//                 value={form.water}
//                 onChange={updateField}
//                 placeholder="e.g. 120"
//                 required
//               />
//             </label>

//             <label className="tracker-field">
//               <span className="tracker-field-title">
//                 <Recycle size={17} /> E-waste
//               </span>
//               <span className="tracker-unit">Kilograms (kg)</span>
//               <input
//                 type="number"
//                 name="ewaste"
//                 min="0"
//                 step="any"
//                 value={form.ewaste}
//                 onChange={updateField}
//                 placeholder="e.g. 0.2"
//                 required
//               />
//             </label>

//             <label className="tracker-field">
//               <span className="tracker-field-title">
//                 <BrainCircuit size={17} /> AI usage
//               </span>
//               <span className="tracker-unit">Number of AI prompts</span>
//               <input
//                 type="number"
//                 name="aiUsage"
//                 min="0"
//                 step="1"
//                 value={form.aiUsage}
//                 onChange={updateField}
//                 placeholder="e.g. 12"
//                 required
//               />
//             </label>

//             <label className="tracker-field tracker-notes-field">
//               Notes (optional)
//               <textarea
//                 name="notes"
//                 value={form.notes}
//                 onChange={updateField}
//                 placeholder="Add details about your usage or sustainable actions..."
//                 rows={3}
//               />
//             </label>

//             <div className="tracker-form-actions">
//               <button
//                 type="button"
//                 className="tracker-secondary-button"
//                 onClick={() => {
//                   setShowForm(false)
//                   setForm(createEmptyForm())
//                   setError('')
//                 }}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="tracker-primary-button">
//                 Save record
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       <section className="tracker-stats" aria-label="Usage totals">
//         <article className="tracker-stat-card">
//           <span className="tracker-stat-icon electricity"><Zap size={21} /></span>
//           <p>Total electricity</p>
//           <strong>{formatNumber(totals.electricity)}</strong>
//           <span className="tracker-stat-unit">kWh recorded</span>
//         </article>

//         <article className="tracker-stat-card">
//           <span className="tracker-stat-icon emissions"><Leaf size={21} /></span>
//           <p>Estimated electricity emissions</p>
//           <strong>{formatNumber(totals.emissions)}</strong>
//           <span className="tracker-stat-unit">kg CO₂e · estimated</span>
//         </article>

//         <article className="tracker-stat-card">
//           <span className="tracker-stat-icon water"><Droplets size={21} /></span>
//           <p>Total water</p>
//           <strong>{formatNumber(totals.water)}</strong>
//           <span className="tracker-stat-unit">litres recorded</span>
//         </article>

//         <article className="tracker-stat-card">
//           <span className="tracker-stat-icon waste"><Recycle size={21} /></span>
//           <p>Total e-waste</p>
//           <strong>{formatNumber(totals.ewaste)}</strong>
//           <span className="tracker-stat-unit">kg recorded</span>
//         </article>

//         <article className="tracker-stat-card">
//           <span className="tracker-stat-icon ai"><BrainCircuit size={21} /></span>
//           <p>AI prompts</p>
//           <strong>{formatNumber(totals.aiUsage)}</strong>
//           <span className="tracker-stat-unit">prompts recorded</span>
//         </article>
//       </section>

//       <section className="tracker-card tracker-history">
//         <div className="tracker-section-heading">
//           <div>
//             <h3>Usage history</h3>
//             <p>
//               {records.length} {records.length === 1 ? 'record' : 'records'} saved
//               {' '}in this browser
//             </p>
//           </div>
//         </div>

//         {records.length === 0 ? (
//           <div className="tracker-empty">
//             <div className="tracker-empty-icon"><Leaf size={27} /></div>
//             <h3>No usage records yet</h3>
//             <p>Add your first record to start tracking your resource use.</p>
//             <button
//               type="button"
//               className="tracker-primary-button"
//               onClick={openForm}
//             >
//               <Plus size={17} /> Add first record
//             </button>
//           </div>
//         ) : (
//           <div className="tracker-table-wrapper">
//             <table className="tracker-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Electricity</th>
//                   <th>Water</th>
//                   <th>E-waste</th>
//                   <th>AI prompts</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {records.map((record) => (
//                   <tr key={record.id}>
//                     <td>
//                       {formatDate(record.date)}
//                       {record.notes && (
//                         <span className="tracker-row-note">{record.notes}</span>
//                       )}
//                     </td>
//                     <td>{formatNumber(record.electricity)} kWh</td>
//                     <td>{formatNumber(record.water)} L</td>
//                     <td>{formatNumber(record.ewaste)} kg</td>
//                     <td>{formatNumber(record.aiUsage)}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="tracker-delete-button"
//                         aria-label={`Delete record from ${record.date}`}
//                         title="Delete record"
//                         onClick={() => deleteRecord(record.id)}
//                       >
//                         <Trash2 size={17} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       <p className="tracker-disclaimer">
//         Totals include only the records entered in this Personal Tracker.
//         Electricity emissions use a provisional factor of 0.716 kg CO₂e per kWh
//         and should be verified against an appropriate source before final submission.
//         AI prompt counts are activity counts, not direct measurements of energy or carbon.
//       </p>
//     </div>
//   )
// }


import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Zap,
  Droplets,
  Recycle,
  BrainCircuit,
  Plus,
  Leaf,
} from "lucide-react";
import { auth } from "../firebase";
import "./my-tracker.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const ELECTRICITY_EMISSION_FACTOR = 0.716;

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createEmptyForm() {
  return {
    date: getLocalDateString(),
    electricity: "",
    water: "",
    ewaste: "",
    aiUsage: "",
    notes: "",
  };
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeRecord(record) {
  return {
    id: record.id,
    electricity: Number(record.electricity) || 0,
    water: Number(record.water) || 0,
    ewaste: Number(record.ewaste) || 0,
    aiUsage: Number(record.aiUsage) || 0,
    createdAt: record.createdAt || null,
  };
}

async function apiRequest(path, options = {}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please sign in to access your usage records.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "The request failed.");
  }

  return result;
}

export default function MyTracker() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(createEmptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/api/usage");

      setRecords(
        (Array.isArray(result.records) ? result.records : []).map(
          normalizeRecord
        )
      );
    } catch (err) {
      setError(err.message || "Unable to load usage records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecords() {
      setLoading(true);
      setError("");

      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error("Please sign in to view your usage records.");
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_BASE}/api/usage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Unable to load records.");
        }

        if (!cancelled) {
          setRecords(
            (Array.isArray(result.records) ? result.records : []).map(
              normalizeRecord
            )
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load usage records.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecords();

    return () => {
      cancelled = true;
    };
  }, []);

  const totals = useMemo(
    () =>
      records.reduce(
        (result, record) => ({
          electricity: result.electricity + record.electricity,
          water: result.water + record.water,
          ewaste: result.ewaste + record.ewaste,
          aiUsage: result.aiUsage + record.aiUsage,
          emissions:
            result.emissions +
            record.electricity * ELECTRICITY_EMISSION_FACTOR,
        }),
        {
          electricity: 0,
          water: 0,
          ewaste: 0,
          aiUsage: 0,
          emissions: 0,
        }
      ),
    [records]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.date > getLocalDateString()) {
      setError("The record date cannot be in the future.");
      return;
    }

    const fields = [
      { key: "electricity", label: "Electricity" },
      { key: "water", label: "Water" },
      { key: "ewaste", label: "E-waste" },
      { key: "aiUsage", label: "AI prompts" },
    ];

    const values = {};

    for (const field of fields) {
      const rawValue = form[field.key];
      const number = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(number) ||
        number < 0
      ) {
        setError(
          `${field.label}: enter a valid number equal to or greater than zero.`
        );
        return;
      }

      values[field.key] = number;
    }

    if (!Number.isInteger(values.aiUsage)) {
      setError("AI prompts must be a whole number.");
      return;
    }

    setSaving(true);

    try {
      await apiRequest("/api/usage", {
        method: "POST",
        body: JSON.stringify(values),
      });

      await loadRecords();

      setForm(createEmptyForm());
      setShowForm(false);
      setMessage("Your usage record has been saved to the backend.");
    } catch (err) {
      setError(err.message || "Could not save your usage record.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="feature-page tracker-page">
      <div className="feature-intro tracker-intro">
        <span className="feature-tag">ECOAI / PERSONAL WORKSPACE</span>
        <h2>My Tracker</h2>
        <p>
          Track your daily resource usage, review your history, and
          understand your resource consumption over time.
        </p>
      </div>

      <div className="tracker-welcome">
        <div className="tracker-welcome-icon">
          <Leaf size={25} />
        </div>

        <div className="tracker-welcome-copy">
          <h3>Your sustainability journey</h3>
          <p>
            Record your resource use regularly to understand your habits
            and identify opportunities to reduce waste.
          </p>
        </div>

        <button
          type="button"
          className="tracker-primary-button"
          onClick={() => {
            setShowForm((previous) => !previous);
            setError("");
            setMessage("");
          }}
        >
          <Plus size={17} />
          {showForm ? "Close form" : "Add usage"}
        </button>
      </div>

      {message && (
        <div className="tracker-message success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="tracker-message error" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <section className="tracker-card">
          <div className="tracker-section-heading">
            <div>
              <h3>Record your resource usage</h3>
              <p>Enter your usage values for one day.</p>
            </div>
          </div>

          <form className="tracker-form" onSubmit={handleSubmit}>
            <label className="tracker-field tracker-date-field">
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                max={getLocalDateString()}
                onChange={updateField}
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Zap size={17} /> Electricity
              </span>
              <span className="tracker-unit">Kilowatt-hours (kWh)</span>
              <input
                type="number"
                name="electricity"
                min="0"
                step="any"
                value={form.electricity}
                onChange={updateField}
                placeholder="e.g. 4.5"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Droplets size={17} /> Water
              </span>
              <span className="tracker-unit">Litres</span>
              <input
                type="number"
                name="water"
                min="0"
                step="any"
                value={form.water}
                onChange={updateField}
                placeholder="e.g. 120"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Recycle size={17} /> E-waste
              </span>
              <span className="tracker-unit">Kilograms (kg)</span>
              <input
                type="number"
                name="ewaste"
                min="0"
                step="any"
                value={form.ewaste}
                onChange={updateField}
                placeholder="e.g. 0.2"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <BrainCircuit size={17} /> AI usage
              </span>
              <span className="tracker-unit">Number of AI prompts</span>
              <input
                type="number"
                name="aiUsage"
                min="0"
                step="1"
                value={form.aiUsage}
                onChange={updateField}
                placeholder="e.g. 12"
                required
              />
            </label>

            <div className="tracker-form-actions">
              <button
                type="button"
                className="tracker-secondary-button"
                disabled={saving}
                onClick={() => {
                  setShowForm(false);
                  setForm(createEmptyForm());
                  setError("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="tracker-primary-button"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save record"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="tracker-stats" aria-label="Usage totals">
        <article className="tracker-stat-card">
          <span className="tracker-stat-icon electricity">
            <Zap size={21} />
          </span>
          <p>Total electricity</p>
          <strong>{formatNumber(totals.electricity)}</strong>
          <span className="tracker-stat-unit">kWh recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon emissions">
            <Leaf size={21} />
          </span>
          <p>Estimated electricity emissions</p>
          <strong>{formatNumber(totals.emissions)}</strong>
          <span className="tracker-stat-unit">kg CO₂e · estimated</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon water">
            <Droplets size={21} />
          </span>
          <p>Total water</p>
          <strong>{formatNumber(totals.water)}</strong>
          <span className="tracker-stat-unit">litres recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon waste">
            <Recycle size={21} />
          </span>
          <p>Total e-waste</p>
          <strong>{formatNumber(totals.ewaste)}</strong>
          <span className="tracker-stat-unit">kg recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon ai">
            <BrainCircuit size={21} />
          </span>
          <p>AI prompts</p>
          <strong>{formatNumber(totals.aiUsage)}</strong>
          <span className="tracker-stat-unit">prompts recorded</span>
        </article>
      </section>

      <section className="tracker-card tracker-history">
        <div className="tracker-section-heading">
          <div>
            <h3>Usage history</h3>
            <p>
              {loading
                ? "Loading records from your account..."
                : `${records.length} ${
                    records.length === 1 ? "record" : "records"
                  } loaded from your account`}
            </p>
          </div>

          <button
            type="button"
            className="tracker-secondary-button"
            onClick={loadRecords}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading usage history...</p>
        ) : records.length === 0 ? (
          <div className="tracker-empty">
            <div className="tracker-empty-icon">
              <Leaf size={27} />
            </div>
            <h3>No usage records yet</h3>
            <p>Add your first record to start tracking your resource use.</p>
            <button
              type="button"
              className="tracker-primary-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} /> Add first record
            </button>
          </div>
        ) : (
          <div className="tracker-table-wrapper">
            <table className="tracker-table">
              <thead>
                <tr>
                  <th>Date saved</th>
                  <th>Electricity</th>
                  <th>Water</th>
                  <th>E-waste</th>
                  <th>AI prompts</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.createdAt)}</td>
                    <td>{formatNumber(record.electricity)} kWh</td>
                    <td>{formatNumber(record.water)} L</td>
                    <td>{formatNumber(record.ewaste)} kg</td>
                    <td>{formatNumber(record.aiUsage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="tracker-disclaimer">
        Totals are calculated from usage records returned by your backend.
        Electricity emissions are estimates using a provisional factor of
        0.716 kg CO₂e per kWh.
      </p>
    </div>
  );
}

