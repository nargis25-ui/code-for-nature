// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Dashboard/Dashboard.css";
// import "./Settings.css";

// const navigation = [
//   { id: "overview", label: "My tracker", icon: "◉", path: "/dashboard" },
//   { id: "tips", label: "Eco tips", icon: "♧", path: "/eco-tips" },
//   {
//     id: "Optimizer",
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

// const DEFAULT_SETTINGS = {
//   displayName: "Sakshi Suman",
//   email: "",
//   language: "English",
//   estimationMethod: "location",
//   carbonIntensity: 0.41,
//   darkMode: false,
//   compactView: false,
//   animations: true,
//   automaticOptimization: true,
//   idleDetection: true,
// };

// function Settings() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const userEmail =
//     sessionStorage.getItem("userEmail") || "EcoAI User";

//   const [workspace, setWorkspace] = useState("personal");

//   const [settings, setSettings] = useState(() => {
//     try {
//       const saved = localStorage.getItem("verdantSettings");

//       return saved
//         ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
//         : DEFAULT_SETTINGS;
//     } catch {
//       return DEFAULT_SETTINGS;
//     }
//   });

//   const [message, setMessage] = useState("");

//   const updateSetting = (key, value) => {
//     setSettings((previous) => ({
//       ...previous,
//       [key]: value,
//     }));

//     setMessage("");
//   };

//   const handleSave = (event) => {
//     event.preventDefault();

//     try {
//       localStorage.setItem(
//         "verdantSettings",
//         JSON.stringify(settings)
//       );

//       setMessage("Settings saved successfully!");
//     } catch {
//       setMessage("Unable to save settings. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("rememberMe");

//     navigate("/login", { replace: true });
//   };

//   const handleNavigation = (event, item) => {
//     event.preventDefault();
//     navigate(item.path);
//   };

//   return (
//     <div
//       className={`eco-dashboard settings-dashboard ${
//         settings.darkMode ? "settings-dark-mode" : ""
//       }`}
//     >
//       {/* LEFT SIDEBAR - SAME AS DASHBOARD */}

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
//               onClick={(event) => handleNavigation(event, item)}
//             >
//               <span className="eco-nav-icon">{item.icon}</span>
//               <span>{item.label}</span>

//               {item.badge && (
//                 <span className="eco-nav-badge">
//                   {item.badge}
//                 </span>
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

//       {/* SETTINGS PAGE CONTENT */}

//       <main className="eco-main settings-main">
//         <header className="eco-header settings-header">
//           <div>
//             <p className="eco-eyebrow">
//               YOUR SUSTAINABILITY SPACE
//             </p>

//             <h1>Settings</h1>

//             <p className="eco-subtitle">
//               Manage your account and workspace preferences.
//             </p>
//           </div>

//           <div className="eco-status">
//             <span className="eco-status-dot" />
//             Settings
//           </div>
//         </header>

//         {message && (
//           <div
//             className="eco-alert eco-alert-success"
//             role="status"
//           >
//             {message}
//           </div>
//         )}

//         <form className="settings-form" onSubmit={handleSave}>
//           {/* Profile Settings */}

//           <section className="settings-card">
//             <div className="settings-card-heading">
//               <span className="settings-icon">♙</span>

//               <div>
//                 <h2>Profile Settings</h2>
//                 <p>Update your personal information.</p>
//               </div>
//             </div>

//             <div className="settings-fields">
//               <label className="settings-label">
//                 Display name

//                 <input
//                   type="text"
//                   value={settings.displayName}
//                   onChange={(event) =>
//                     updateSetting(
//                       "displayName",
//                       event.target.value
//                     )
//                   }
//                   placeholder="Enter your name"
//                 />
//               </label>

//               <label className="settings-label">
//                 Email address

//                 <input
//                   type="email"
//                   value={settings.email}
//                   onChange={(event) =>
//                     updateSetting("email", event.target.value)
//                   }
//                   placeholder={userEmail}
//                 />
//               </label>
//             </div>
//           </section>

//           {/* Environmental Preferences */}

//           <section className="settings-card">
//             <div className="settings-card-heading">
//               <span className="settings-icon">♧</span>

//               <div>
//                 <h2>Environmental Preferences</h2>
//                 <p>
//                   Customize your sustainability calculations.
//                 </p>
//               </div>
//             </div>

//             <div className="settings-fields">
//               <label className="settings-label">
//                 Language

//                 <select
//                   value={settings.language}
//                   onChange={(event) =>
//                     updateSetting("language", event.target.value)
//                   }
//                 >
//                   <option value="English">English</option>
//                   <option value="Hindi">Hindi</option>
//                 </select>
//               </label>

//               <label className="settings-label">
//                 Estimation method

//                 <select
//                   value={settings.estimationMethod}
//                   onChange={(event) =>
//                     updateSetting(
//                       "estimationMethod",
//                       event.target.value
//                     )
//                   }
//                 >
//                   <option value="location">Location-based</option>
//                   <option value="global">Global average</option>
//                   <option value="custom">Custom</option>
//                 </select>
//               </label>

//               <label className="settings-label">
//                 Carbon intensity (kg CO₂/kWh)

//                 <input
//                   type="number"
//                   min="0"
//                   max="2"
//                   step="0.01"
//                   value={settings.carbonIntensity}
//                   onChange={(event) =>
//                     updateSetting(
//                       "carbonIntensity",
//                       Number(event.target.value)
//                     )
//                   }
//                 />
//               </label>
//             </div>
//           </section>

//           {/* Appearance */}

//           <section className="settings-card">
//             <div className="settings-card-heading">
//               <span className="settings-icon">☼</span>

//               <div>
//                 <h2>Appearance</h2>
//                 <p>Customize how your workspace looks.</p>
//               </div>
//             </div>

//             {[
//               {
//                 key: "darkMode",
//                 title: "Dark mode",
//                 description: "Use a darker workspace appearance.",
//               },
//               {
//                 key: "compactView",
//                 title: "Compact view",
//                 description: "Reduce spacing between elements.",
//               },
//               {
//                 key: "animations",
//                 title: "Animations",
//                 description: "Enable interface animations.",
//               },
//             ].map((item) => (
//               <label
//                 className="settings-toggle-row"
//                 key={item.key}
//               >
//                 <span>
//                   <strong>{item.title}</strong>
//                   <small>{item.description}</small>
//                 </span>

//                 <input
//                   type="checkbox"
//                   checked={settings[item.key]}
//                   onChange={(event) =>
//                     updateSetting(
//                       item.key,
//                       event.target.checked
//                     )
//                   }
//                 />
//               </label>
//             ))}
//           </section>

//           {/* Optimization */}

//           <section className="settings-card">
//             <div className="settings-card-heading">
//               <span className="settings-icon">⚡</span>

//               <div>
//                 <h2>Optimization</h2>
//                 <p>Manage energy-saving preferences.</p>
//               </div>
//             </div>

//             {[
//               {
//                 key: "automaticOptimization",
//                 title: "Automatic optimization",
//                 description: "Enable sustainability suggestions.",
//               },
//               {
//                 key: "idleDetection",
//                 title: "Idle detection",
//                 description: "Enable idle usage detection.",
//               },
//             ].map((item) => (
//               <label
//                 className="settings-toggle-row"
//                 key={item.key}
//               >
//                 <span>
//                   <strong>{item.title}</strong>
//                   <small>{item.description}</small>
//                 </span>

//                 <input
//                   type="checkbox"
//                   checked={settings[item.key]}
//                   onChange={(event) =>
//                     updateSetting(
//                       item.key,
//                       event.target.checked
//                     )
//                   }
//                 />
//               </label>
//             ))}
//           </section>

//           {/* Save Button */}

//           <div className="settings-footer">
//             <button
//               type="submit"
//               className="settings-save-btn"
//             >
//               ✓ Save settings
//             </button>
//           </div>
//         </form>

//         <footer className="eco-footer">
//           verdant.ai · Track thoughtfully. Choose sustainably.
//         </footer>
//       </main>
//     </div>
//   );
// }

// export default Settings;

import { useState } from 'react'
import { Bell, Database, ShieldCheck, SlidersHorizontal, Trash2 } from 'lucide-react'
import './settings.css'

const SETTINGS_KEY = 'ecoai-settings-v1'
const PERSONAL_RECORDS_KEY = 'ecoai-my-tracker-records-v1'
const ORGANIZATION_RECORDS_KEY = 'ecoai-organization-records-v1'

const DEFAULT_SETTINGS = {
  preferredWorkspace: 'personal',
  productTips: true,
  reminders: false,
}

function readSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)

    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
    }
  } catch {
    // Use defaults if saved settings cannot be read.
  }

  return DEFAULT_SETTINGS
}

export default function Settings({ workspace }) {
  const [settings, setSettings] = useState(readSettings)
  const [message, setMessage] = useState('')

  function updateSetting(key, value) {
  const updatedSettings = {
    ...settings,
    [key]: value,
  }

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings))
    setSettings(updatedSettings)
    setMessage('Your preference has been saved.')
  } catch {
    setMessage('Settings could not be saved in this browser.')
  }
}

  function clearRecords() {
    const confirmed = window.confirm(
      'Delete all saved Personal and Organization tracker records from this browser? This cannot be undone.'
    )

    if (!confirmed) return

    try {
      localStorage.removeItem(PERSONAL_RECORDS_KEY)
      localStorage.removeItem(ORGANIZATION_RECORDS_KEY)
      setMessage(
        'Tracker records were removed. Refresh other open pages to update their totals.'
      )
    } catch {
      setMessage('The records could not be cleared. Please check your browser storage.')
    }
  }

  return (
    <div className="settings-page">
      <header className="settings-intro">
        <span className="settings-eyebrow">ECOAI / PREFERENCES</span>
        <h2>Settings</h2>
        <p>Manage your workspace preferences, reminders and saved data.</p>
      </header>

      {message && (
        <div className="settings-message" role="status">
          {message}
          <button
            type="button"
            className="settings-message-close"
            onClick={() => setMessage('')}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-icon"><SlidersHorizontal size={20} /></span>
          <div>
            <h3>Workspace preferences</h3>
            <p>Choose which workspace you prefer to use.</p>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-copy">
            <strong>Preferred workspace</strong>
            <span>
              Your current workspace is {workspace === 'personal' ? 'Personal' : 'Organization'}.
              This preference is saved separately and does not switch the active workspace.
            </span>
          </div>
          <select
            className="settings-select"
            value={settings.preferredWorkspace}
            onChange={(event) =>
              updateSetting('preferredWorkspace', event.target.value)
            }
            aria-label="Preferred workspace"
          >
            <option value="personal">Personal</option>
            <option value="organization">Organization</option>
          </select>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-icon"><Bell size={20} /></span>
          <div>
            <h3>Tips and reminders</h3>
            <p>Save your preferences for future EcoAI features.</p>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-copy">
            <strong>Product tips</strong>
            <span>Preference for seeing tips about using EcoAI.</span>
          </div>
          <label className="settings-switch">
            <input
              type="checkbox"
              checked={settings.productTips}
              onChange={(event) =>
                updateSetting('productTips', event.target.checked)
              }
            />
            <span className="settings-switch-track" />
            <span className="settings-sr-only">Enable product tips preference</span>
          </label>
        </div>

        <div className="settings-row">
          <div className="settings-row-copy">
            <strong>Reminders</strong>
            <span>Preference for sustainability tracking reminders.</span>
          </div>
          <label className="settings-switch">
            <input
              type="checkbox"
              checked={settings.reminders}
              onChange={(event) =>
                updateSetting('reminders', event.target.checked)
              }
            />
            <span className="settings-switch-track" />
            <span className="settings-sr-only">Enable reminders preference</span>
          </label>
        </div>

        <p className="settings-note">
          These switches save your preferences only. EcoAI does not currently send
          notifications or reminders.
        </p>
      </section>

      <section className="settings-card">
        <div className="settings-section-heading">
          <span className="settings-icon"><ShieldCheck size={20} /></span>
          <div>
            <h3>Privacy and storage</h3>
            <p>Understand where your information is saved.</p>
          </div>
        </div>

        <div className="settings-privacy-item">
          <Database size={18} />
          <div>
            <strong>Browser storage</strong>
            <p>
              Tracker records, profile information and preferences are stored
              locally in this browser. They are not automatically shared with
              teammates or synced across devices.
            </p>
          </div>
        </div>
      </section>

      <section className="settings-card settings-danger-card">
        <div className="settings-section-heading">
          <span className="settings-icon settings-danger-icon"><Trash2 size={20} /></span>
          <div>
            <h3>Delete tracker records</h3>
            <p>Remove saved usage history from this browser.</p>
          </div>
        </div>

        <div className="settings-row settings-delete-row">
          <div className="settings-row-copy">
            <strong>Clear Personal and Organization records</strong>
            <span>
              This deletes saved tracker entries used by your dashboards, reports
              and rewards. It does not delete your profile or settings.
            </span>
          </div>
          <button
            type="button"
            className="settings-delete-button"
            onClick={clearRecords}
          >
            <Trash2 size={16} />
            Clear records
          </button>
        </div>
      </section>
    </div>
  )
}

