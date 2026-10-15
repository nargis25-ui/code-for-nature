// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   FaLeaf,
//   FaHome,
//   FaList,
//   FaCalendarAlt,
//   FaTrophy,
//   FaLightbulb,
//   FaUser,
//   FaCog,
//   FaBell,
//   FaBolt,
//   FaTint,
//   FaRobot,
//   FaSeedling,
//   FaWater,
//   FaRecycle,
//   FaCheckCircle,
// } from "react-icons/fa";

// import "./EcoTips.css";
// import "./Dashboard/Dashboard.css";

// const tips = [
//   {
//     id: 1,
//     icon: <FaBolt />,
//     category: "Energy Saving",
//     title: "Reduce Query Frequency",
//     description:
//       "Batch similar AI queries together instead of sending them one at a time. This can reduce energy consumption.",
//     impact: "High Impact",
//     color: "orange",
//   },
//   {
//     id: 2,
//     icon: <FaTint />,
//     category: "Water Saving",
//     title: "Use Lighter AI Models",
//     description:
//       "For simple tasks, use lightweight AI models to reduce computing resources.",
//     impact: "Medium Impact",
//     color: "blue",
//   },
//   {
//     id: 3,
//     icon: <FaRobot />,
//     category: "AI Best Practice",
//     title: "Schedule Off-Peak Queries",
//     description:
//       "Run non-urgent AI tasks during off-peak hours when possible.",
//     impact: "High Impact",
//     color: "green",
//   },
//   {
//     id: 4,
//     icon: <FaSeedling />,
//     category: "Energy Saving",
//     title: "Enable Green Mode",
//     description:
//       "Use Green Mode to choose more energy-efficient options whenever possible.",
//     impact: "Medium Impact",
//     color: "purple",
//   },
//   {
//     id: 5,
//     icon: <FaWater />,
//     category: "Water Saving",
//     title: "Monitor Water Budget",
//     description:
//       "Track your water usage and try to reduce unnecessary consumption.",
//     impact: "Medium Impact",
//     color: "blue",
//   },
//   {
//     id: 6,
//     icon: <FaRecycle />,
//     category: "AI Best Practice",
//     title: "Cache Common Responses",
//     description:
//       "Reuse saved responses for frequently asked questions to avoid repeated AI requests.",
//     impact: "High Impact",
//     color: "teal",
//   },
// ];

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
//   { id: "usage", label: "Record", icon: "▤", path: "/dashboard#usage" },
//   { id: "reports", label: "Reports", icon: "▥", path: "/reports" },
//   { id: "rewards", label: "Rewards", icon: "★", path: "/rewards" },
//   { id: "profile", label: "Profile", icon: "♙", path: "/profile" },
//   { id: "settings", label: "Settings", icon: "⚙", path: "/settings" },
// ];

// export default function EcoTips() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [completed, setCompleted] = useState([3, 6]);
//   const [workspace, setWorkspace] = useState("personal");

//   const userEmail =
//     sessionStorage.getItem("userEmail") || "EcoAI User";

//   function toggleDone(id) {
//     setCompleted((previous) =>
//       previous.includes(id)
//         ? previous.filter((item) => item !== id)
//         : [...previous, id]
//     );
//   }

//   const percentage = Math.round(
//     (completed.length / tips.length) * 100
//   );

//   function handleNavigation(event, item) {
//     event.preventDefault();

//     if (item.path === "/dashboard#usage") {
//       navigate("/dashboard");

//       setTimeout(() => {
//         document.getElementById("usage")?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 100);

//       return;
//     }

//     navigate(item.path);
//   }

//   function handleLogout() {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("rememberMe");

//     navigate("/login", { replace: true });
//   }

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
//           {navigation.map((item) => {
//             const isActive =
//               item.id === "overview" || item.id === "usage"
//                 ? location.pathname === "/dashboard"
//                 : location.pathname === item.path;

//             return (
//               <a
//                 key={item.id}
//                 className={`eco-nav-link ${isActive ? "active" : ""}`}
//                 href={item.path}
//                 onClick={(event) => handleNavigation(event, item)}
//               >
//                 <span className="eco-nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>

//                 {item.badge && (
//                   <span className="eco-nav-badge">
//                     {item.badge}
//                   </span>
//                 )}
//               </a>
//             );
//           })}
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

//       <main className="eco-main">
//         <header className="eco-header">
//           <div>
//             <p className="eco-eyebrow">YOUR SUSTAINABILITY SPACE</p>
//             <h1>Eco Tips 🌱</h1>
//             <p className="eco-subtitle">
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </p>
//           </div>

//           <div className="eco-status">
//             <span className="eco-status-dot" />
//             Sustainability Workspace
//           </div>
//         </header>

//         <section className="eco-content">
//           <div className="eco-title-row">
//             <div>
//               <h2>Small steps, real change</h2>
//               <p>
//                 Follow these tips to reduce your AI environmental impact.
//               </p>
//             </div>

//             <div className="eco-progress-circle">
//               <div
//                 className="circle"
//                 style={{
//                   background: `conic-gradient(#31833b ${percentage}%, #e5f1e6 ${percentage}%)`,
//                 }}
//               >
//                 <span>{percentage}%</span>
//               </div>

//               <div>
//                 <strong>{completed.length}/6 Done</strong>
//                 <p>Progress</p>
//               </div>
//             </div>
//           </div>

//           <div className="eco-progress-card">
//             <div className="progress-heading">
//               <strong>Overall Completion</strong>
//               <strong>
//                 {completed.length} of {tips.length} tips completed
//               </strong>
//             </div>

//             <div className="progress-track">
//               <div
//                 className="progress-fill"
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>
//           </div>

//           <div className="eco-tips-grid">
//             {tips.map((tip) => {
//               const isDone = completed.includes(tip.id);

//               return (
//                 <article
//                   className={`eco-tip-card ${tip.color} ${
//                     isDone ? "completed" : ""
//                   }`}
//                   key={tip.id}
//                 >
//                   {isDone && (
//                     <FaCheckCircle className="done-check" />
//                   )}

//                   <div className="tip-icon">{tip.icon}</div>
//                   <span className="tip-category">{tip.category}</span>
//                   <h3>{tip.title}</h3>
//                   <p className="tip-description">{tip.description}</p>

//                   <div className="tip-footer">
//                     <span className="tip-impact">{tip.impact}</span>

//                     <button
//                       type="button"
//                       onClick={() => toggleDone(tip.id)}
//                     >
//                       {isDone ? (
//                         <>
//                           <FaCheckCircle /> Done
//                         </>
//                       ) : (
//                         "Mark Done"
//                       )}
//                     </button>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

import { useMemo, useState } from 'react'
import {
  Building2,
  Zap,
  Droplets,
  Recycle,
  Bot,
  Leaf,
  Trash2,
  Plus,
  Save,
  Users,
  GraduationCap,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import './my-organization.css'

const STORAGE_KEY = 'ecoai-organization-records-v1'
const PROFILE_KEY = 'ecoai-organization-profile-v1'
const ACCESS_KEY = 'ecoai-organization-access-v1'
const ROLES = ['student', 'manager', 'admin']

// Provisional factor; confirm the appropriate value before final reporting.
const ELECTRICITY_EMISSION_FACTOR = 0.716

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function createEmptyForm(groupName = '') {
  return {
    date: getLocalDateString(),
    groupName,
    electricity: '',
    water: '',
    ewaste: '',
    aiUsage: '',
    notes: '',
  }
}

function isValidDateString(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00`)

  return !Number.isNaN(date.getTime()) && getLocalDateString(date) === value
}

function getOrganizationStorageKey(key, organizationId) {
  return `${key}-${organizationId}`
}

function getAccessStorageKey(userEmail) {
  const normalizedEmail = (userEmail || '').trim().toLowerCase()
  return `${ACCESS_KEY}-${encodeURIComponent(normalizedEmail)}`
}

function loadOrganizationAccess(userEmail) {
  const access = readStorage(getAccessStorageKey(userEmail), null)
  if (!access || !ROLES.includes(access.role)) return null
  if (!access.email || !access.organizationId || !access.organizationName) {
    return null
  }
  if (access.appUserEmail !== userEmail) return null

  return access
}

function loadRecords(organizationId) {
  if (!organizationId) return []

  const saved = readStorage(
    getOrganizationStorageKey(STORAGE_KEY, organizationId),
    [],
  )
  if (!Array.isArray(saved)) return []

  return saved
    .map((record) => {
      if (!record || typeof record !== 'object' || !isValidDateString(record.date)) {
        return null
      }

      const amounts = {}
      for (const field of ['electricity', 'water', 'ewaste', 'aiUsage']) {
        const value = Number(record[field] ?? 0)
        if (!Number.isFinite(value) || value < 0) return null
        amounts[field] = value
      }

      if (!Number.isInteger(amounts.aiUsage)) return null

      return {
        ...record,
        id: String(record.id || `${record.date}-${Math.random().toString(36).slice(2)}`),
        ...amounts,
        notes: typeof record.notes === 'string' ? record.notes : '',
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))
}

function persistStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function formatDate(dateString) {
  if (!isValidDateString(dateString)) return 'Invalid date'

  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(value)
}

export default function MyOrganization({ userEmail }) {
  const [access, setAccess] = useState(() => loadOrganizationAccess(userEmail))
  const [accessStep, setAccessStep] = useState(() =>
    loadOrganizationAccess(userEmail) ? 'workspace' : 'signin',
  )
  const [accessDraft, setAccessDraft] = useState({
    email: '',
    organizationName: '',
  })
  const [organizationPassword, setOrganizationPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('student')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [accessError, setAccessError] = useState('')

  const [profile, setProfile] = useState(() =>
    (() => {
      const savedAccess = loadOrganizationAccess(userEmail)
      return savedAccess
        ? readStorage(
            getOrganizationStorageKey(PROFILE_KEY, savedAccess.organizationId),
            { name: savedAccess.organizationName, teamSize: '1' },
          )
        : { name: '', teamSize: '1' }
    })(),
  )

  const [records, setRecords] = useState(() =>
    loadRecords(loadOrganizationAccess(userEmail)?.organizationId),
  )

  const [form, setForm] = useState(() =>
    createEmptyForm(loadOrganizationAccess(userEmail)?.groupName || ''),
  )
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const visibleRecords = useMemo(() => {
    if (!access) return []
    if (access.role === 'admin') return records

    return records.filter((record) => record.groupName === access.groupName)
  }, [access, records])

  const totals = useMemo(
    () =>
      visibleRecords.reduce(
        (result, record) => ({
          electricity:
            result.electricity + Number(record.electricity || 0),
          water: result.water + Number(record.water || 0),
          ewaste: result.ewaste + Number(record.ewaste || 0),
          aiUsage: result.aiUsage + Number(record.aiUsage || 0),
        }),
        { electricity: 0, water: 0, ewaste: 0, aiUsage: 0 },
      ),
    [visibleRecords],
  )

  const emissions = totals.electricity * ELECTRICITY_EMISSION_FACTOR

  function handleOrganizationSignIn(event) {
    event.preventDefault()
    setAccessError('')

    const email = accessDraft.email.trim().toLowerCase()
    const organizationName = accessDraft.organizationName.trim()
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!emailIsValid) {
      setAccessError('Enter a valid organization email address.')
      return
    }

    if (!organizationName) {
      setAccessError('Enter your organization name.')
      return
    }

    if (organizationPassword.length < 6) {
      setAccessError('Password must contain at least 6 characters.')
      return
    }

    setAccessDraft({ email, organizationName })
    setOrganizationPassword('')
    setAccessStep('membership')
  }

  function completeOrganizationAccess(event) {
    event.preventDefault()
    setAccessError('')

    const groupName = selectedGroup.trim()
    if (selectedRole !== 'admin' && !groupName) {
      setAccessError('Enter the class or group assigned to this account.')
      return
    }

    const organizationSlug = accessDraft.organizationName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const domainSlug = accessDraft.email.split('@')[1].replace(/[^a-z0-9]+/g, '-')
    const nextAccess = {
      email: accessDraft.email,
      organizationName: accessDraft.organizationName.trim(),
      organizationId: `${organizationSlug}-${domainSlug}`,
      appUserEmail: userEmail,
      role: selectedRole,
      groupName: selectedRole === 'admin' ? '' : groupName,
      joinedAt: new Date().toISOString(),
    }
    const nextProfile = readStorage(
      getOrganizationStorageKey(PROFILE_KEY, nextAccess.organizationId),
      { name: nextAccess.organizationName, teamSize: '1' },
    )

    if (!persistStorage(getAccessStorageKey(userEmail), nextAccess)) {
      setAccessError('Workspace could not be opened in this browser. Check storage and try again.')
      return
    }

    persistStorage(
      getOrganizationStorageKey(PROFILE_KEY, nextAccess.organizationId),
      nextProfile,
    )
    setAccess(nextAccess)
    setProfile(nextProfile)
    setRecords(loadRecords(nextAccess.organizationId))
    setForm(createEmptyForm(nextAccess.groupName))
    setAccessStep('workspace')
    setError('')
    setMessage('')
  }

  function leaveOrganizationWorkspace() {
    localStorage.removeItem(getAccessStorageKey(userEmail))
    setAccess(null)
    setAccessStep('signin')
    setAccessDraft({ email: '', organizationName: '' })
    setSelectedRole('student')
    setSelectedGroup('')
    setProfile({ name: '', teamSize: '1' })
    setRecords([])
    setForm(createEmptyForm())
    setMessage('')
    setError('')
    setAccessError('')
  }

  function updateForm(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    setError('')
    setMessage('')
  }

  function saveProfile(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (access?.role !== 'admin') return

    if (!profile.name.trim()) {
      setError('Please enter your organization name.')
      return
    }

    const teamSize = Number(profile.teamSize)
    if (!Number.isInteger(teamSize) || teamSize < 1) {
      setError('Team size must be a whole number of at least 1.')
      return
    }

    const updatedProfile = {
      name: profile.name.trim(),
      teamSize: String(teamSize),
    }

    if (!persistStorage(
      getOrganizationStorageKey(PROFILE_KEY, access.organizationId),
      updatedProfile,
    )) {
      setError('Profile could not be saved. Check your browser storage and try again.')
      return
    }

    setProfile(updatedProfile)
    setMessage('Organization profile saved.')
  }

  function addRecord(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!access || access.role === 'student') {
      setError('Student access is read-only. Ask a manager to add records.')
      return
    }

    const fields = ['electricity', 'water', 'ewaste', 'aiUsage']
    const hasValue = fields.some(
      (field) => form[field].trim() !== '',
    )

    if (!isValidDateString(form.date)) {
      setError('Please select a valid date.')
      return
    }

    if (form.date > getLocalDateString()) {
      setError('The record date cannot be in the future.')
      return
    }

    if (!hasValue) {
      setError('Enter at least one resource usage value.')
      return
    }

    if (!form.groupName.trim()) {
      setError('Enter the class or group for this resource record.')
      return
    }

    const hasInvalidValue = fields.some((field) => {
      if (form[field].trim() === '') return false
      return !Number.isFinite(Number(form[field])) ||
        Number(form[field]) < 0
    })

    if (hasInvalidValue) {
      setError('Usage values must be valid non-negative numbers.')
      return
    }

    if (form.aiUsage.trim() !== '' && !Number.isInteger(Number(form.aiUsage))) {
      setError('AI prompts must be a whole number, such as 12.')
      return
    }

    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...form,
      groupName: access.role === 'admin'
        ? form.groupName.trim()
        : access.groupName,
      electricity: Number(form.electricity || 0),
      water: Number(form.water || 0),
      ewaste: Number(form.ewaste || 0),
      aiUsage: Number(form.aiUsage || 0),
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
    }

    const updatedRecords = [...records, record].sort((a, b) =>
      b.date.localeCompare(a.date),
    )

    if (!persistStorage(
      getOrganizationStorageKey(STORAGE_KEY, access.organizationId),
      updatedRecords,
    )) {
      setError('Record could not be saved. Check your browser storage and try again.')
      return
    }

    setRecords(updatedRecords)
    setForm(createEmptyForm(access.groupName))
    setMessage('Organization resource record added.')
  }

  function deleteRecord(id) {
    if (access?.role !== 'admin') return

    const confirmed = window.confirm(
      'Delete this organization record? This action cannot be undone.',
    )
    if (!confirmed) return

    const updatedRecords = records.filter((record) => record.id !== id)
    if (!persistStorage(
      getOrganizationStorageKey(STORAGE_KEY, access.organizationId),
      updatedRecords,
    )) {
      setError('Record could not be deleted from browser storage.')
      setMessage('')
      return
    }

    setRecords(updatedRecords)
    setMessage('Record deleted.')
    setError('')
  }

  if (!access) {
    return (
      <div className="org-page org-access-page">
        <header className="org-intro">
          <span className="org-eyebrow">ECOAI / ORGANIZATION WORKSPACE</span>
          <h2>Organization access</h2>
          <p>Sign in with your organization account to continue to its workspace.</p>
        </header>

        <section className="org-access-layout">
          <div className="org-access-card">
            <div className="org-access-heading">
              <span className="org-icon-box"><Building2 size={22} /></span>
              <div>
                <span className="org-access-step-label">
                  {accessStep === 'signin' ? 'STEP 1 OF 2' : 'STEP 2 OF 2'}
                </span>
                <h3>
                  {accessStep === 'signin'
                    ? 'Sign in to your organization'
                    : 'Confirm your membership'}
                </h3>
              </div>
            </div>

            {accessStep === 'signin' ? (
              <form className="org-access-form" onSubmit={handleOrganizationSignIn}>
                <label>
                  Organization name
                  <input
                    value={accessDraft.organizationName}
                    onChange={(event) =>
                      setAccessDraft((previous) => ({
                        ...previous,
                        organizationName: event.target.value,
                      }))
                    }
                    placeholder="e.g. Green Valley School"
                    autoComplete="organization"
                    required
                  />
                </label>

                <label>
                  Organization email
                  <input
                    type="email"
                    value={accessDraft.email}
                    onChange={(event) =>
                      setAccessDraft((previous) => ({
                        ...previous,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@organization.org"
                    autoComplete="username"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={organizationPassword}
                    onChange={(event) => setOrganizationPassword(event.target.value)}
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />
                </label>

                {accessError && (
                  <p className="org-message org-error" role="alert">{accessError}</p>
                )}

                <button className="org-button org-button-primary" type="submit">
                  Continue <ShieldCheck size={16} />
                </button>
              </form>
            ) : (
              <form className="org-access-form" onSubmit={completeOrganizationAccess}>
                <div className="org-account-summary">
                  <span>{accessDraft.email}</span>
                  <span>{accessDraft.organizationName}</span>
                </div>

                <label>
                  Your role
                  <select
                    value={selectedRole}
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>

                <p className="org-role-description">
                  {selectedRole === 'student' && (
                    <><GraduationCap size={16} /> View resource data for your assigned group.</>
                  )}
                  {selectedRole === 'manager' && (
                    <><Users size={16} /> Review and add records for your assigned group.</>
                  )}
                  {selectedRole === 'admin' && (
                    <><ShieldCheck size={16} /> View all groups and manage organization records.</>
                  )}
                </p>

                {selectedRole !== 'admin' && (
                  <label>
                    Class / group
                    <input
                      value={selectedGroup}
                      onChange={(event) => setSelectedGroup(event.target.value)}
                      placeholder="e.g. Class 8-A or Operations"
                      autoComplete="organization-title"
                      required
                    />
                  </label>
                )}

                {accessError && (
                  <p className="org-message org-error" role="alert">{accessError}</p>
                )}

                <div className="org-access-actions">
                  <button
                    className="org-button org-button-secondary"
                    type="button"
                    onClick={() => {
                      setAccessStep('signin')
                      setAccessError('')
                    }}
                  >
                    Back
                  </button>
                  <button className="org-button org-button-primary" type="submit">
                    Open workspace <Building2 size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="org-access-note">
            <span className="org-access-note-icon"><ShieldCheck size={20} /></span>
            <h3>Organization-only workspace</h3>
            <p>
              Your role and group shape which records appear and which actions are available.
            </p>
            <div className="org-prototype-notice">
              <strong>UI preview</strong>
              <span>
                Organization credentials and invitations are not verified by a server yet.
                Do not use real passwords here.
              </span>
            </div>
          </aside>
        </section>
      </div>
    )
  }

  return (
    <div className="org-page">
      <header className="org-intro">
        <span className="org-eyebrow">ECOAI / ORGANIZATION WORKSPACE</span>
        <h2>My Organization</h2>
        <p>
          Understand your team&apos;s resource use, track sustainability,
          and make more informed environmental decisions.
        </p>
      </header>

      <section className="org-workspace-banner">
        <div className="org-workspace-identity">
          <span className="org-icon-box"><Building2 size={21} /></span>
          <div>
            <strong>{profile.name || access.organizationName}</strong>
            <span>{access.email}</span>
          </div>
        </div>
        <div className="org-workspace-access">
          <span className={`org-role-pill ${access.role}`}>
            {access.role === 'admin' ? 'Admin' : access.role === 'manager' ? 'Manager' : 'Student'}
          </span>
          <span className="org-group-pill">
            {access.role === 'admin' ? 'All groups' : access.groupName}
          </span>
          <button
            type="button"
            className="org-switch-button"
            onClick={leaveOrganizationWorkspace}
          >
            <LogOut size={15} />
            Switch account
          </button>
        </div>
      </section>

      {access.role === 'admin' && <section className="org-profile-card">
        <div className="org-profile-heading">
          <span className="org-icon-box">
            <Building2 size={23} />
          </span>
          <div>
            <h3>Organization profile</h3>
            <p>Set up the basic details for your workspace.</p>
          </div>
        </div>

        <form className="org-profile-form" onSubmit={saveProfile}>
          <label>
            Organization name
            <input
              value={profile.name}
              onChange={(event) =>
                setProfile((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              placeholder="Enter organization name"
              maxLength={100}
              required
            />
          </label>

          <label>
            Team size
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={profile.teamSize}
              onChange={(event) =>
                setProfile((previous) => ({
                  ...previous,
                  teamSize: event.target.value,
                }))
              }
              required
            />
          </label>

          <button className="org-button org-button-secondary" type="submit">
            <Save size={16} />
            Save profile
          </button>
        </form>
      </section>}

      <section className="org-summary">
        <div className="org-section-heading">
          <div>
            <h3>Resource overview</h3>
            <p>
              {access.role === 'admin'
                ? 'Combined totals across all organization groups.'
                : `Combined totals for ${access.groupName}.`}
            </p>
          </div>
          <span className="org-record-count">
            {visibleRecords.length} {visibleRecords.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        <div className="org-stat-grid">
          <article className="org-stat-card">
            <span className="org-stat-icon electricity">
              <Zap size={20} />
            </span>
            <p>Electricity</p>
            <strong>{formatNumber(totals.electricity)}</strong>
            <span>kWh</span>
          </article>

          <article className="org-stat-card">
            <span className="org-stat-icon water">
              <Droplets size={20} />
            </span>
            <p>Water</p>
            <strong>{formatNumber(totals.water)}</strong>
            <span>litres</span>
          </article>

          <article className="org-stat-card">
            <span className="org-stat-icon waste">
              <Recycle size={20} />
            </span>
            <p>E-waste</p>
            <strong>{formatNumber(totals.ewaste)}</strong>
            <span>kg</span>
          </article>

          <article className="org-stat-card">
            <span className="org-stat-icon ai">
              <Bot size={20} />
            </span>
            <p>AI usage</p>
            <strong>{formatNumber(totals.aiUsage)}</strong>
            <span>prompts</span>
          </article>

          <article className="org-stat-card org-emissions-card">
            <span className="org-stat-icon emissions">
              <Leaf size={20} />
            </span>
            <p>Estimated electricity emissions</p>
            <strong>{formatNumber(emissions)}</strong>
            <span>kg CO₂e</span>
          </article>
        </div>

        <p className="org-disclaimer">
          Emissions are an estimate based on electricity usage and a
          provisional factor of {ELECTRICITY_EMISSION_FACTOR} kg CO₂e/kWh.
          This is not a complete organizational carbon footprint.
        </p>
      </section>

      {access.role !== 'student' && <section className="org-form-card">
        <div className="org-section-heading">
          <div>
            <h3>Add resource record</h3>
            <p>Enter the organization&apos;s usage for a particular date.</p>
          </div>
          <span className="org-icon-box">
            <Plus size={21} />
          </span>
        </div>

        <form className="org-resource-form" onSubmit={addRecord}>
          <label>
            Record date
            <input
              type="date"
              name="date"
              max={getLocalDateString()}
              value={form.date}
              onChange={updateForm}
              required
            />
          </label>

          <label>
            Class / group
            <input
              type="text"
              name="groupName"
              value={access.role === 'admin' ? form.groupName : access.groupName}
              onChange={updateForm}
              readOnly={access.role !== 'admin'}
              required
            />
          </label>

          <label>
            Electricity (kWh)
            <input
              type="number"
              name="electricity"
              min="0"
              step="any"
              value={form.electricity}
              onChange={updateForm}
              placeholder="e.g. 120"
            />
          </label>

          <label>
            Water (litres)
            <input
              type="number"
              name="water"
              min="0"
              step="any"
              value={form.water}
              onChange={updateForm}
              placeholder="e.g. 500"
            />
          </label>

          <label>
            E-waste (kg)
            <input
              type="number"
              name="ewaste"
              min="0"
              step="any"
              value={form.ewaste}
              onChange={updateForm}
              placeholder="e.g. 2"
            />
          </label>

          <label>
            AI usage (prompts)
            <input
              type="number"
              name="aiUsage"
              min="0"
              step="1"
              value={form.aiUsage}
              onChange={updateForm}
              placeholder="e.g. 50"
            />
          </label>

          <label className="org-notes-field">
            Notes (optional)
            <input
              type="text"
              name="notes"
              value={form.notes}
              onChange={updateForm}
              maxLength={250}
              placeholder="Add a short note about this record"
            />
          </label>

          <button className="org-button org-button-primary" type="submit">
            <Plus size={17} />
            Add resource record
          </button>
        </form>

        {error && <p className="org-message org-error" role="alert">{error}</p>}
        {message && <p className="org-message org-success" role="status">{message}</p>}
      </section>}

      <section className="org-history-card">
        <div className="org-section-heading">
          <div>
            <h3>Resource history</h3>
            <p>
              {access.role === 'admin'
                ? 'Review records across all organization groups.'
                : `Review records for ${access.groupName}.`}
            </p>
          </div>
        </div>

        {visibleRecords.length === 0 ? (
          <div className="org-empty-state">
            <span className="org-icon-box">
              <Building2 size={23} />
            </span>
            <h4>No records yet</h4>
            <p>
              {access.role === 'student'
                ? 'No resource records are available for your group yet.'
                : 'Add a resource record to see organization activity here.'}
            </p>
          </div>
        ) : (
          <div className="org-table-wrap">
            <table className="org-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Group</th>
                  <th>Electricity</th>
                  <th>Water</th>
                  <th>E-waste</th>
                  <th>AI prompts</th>
                  <th>Emissions</th>
                  <th>Notes</th>
                  {access.role === 'admin' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {visibleRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.date)}</td>
                    <td>{record.groupName || 'Unassigned'}</td>
                    <td>{formatNumber(Number(record.electricity || 0))} kWh</td>
                    <td>{formatNumber(Number(record.water || 0))} L</td>
                    <td>{formatNumber(Number(record.ewaste || 0))} kg</td>
                    <td>{formatNumber(Number(record.aiUsage || 0))}</td>
                    <td>
                      {formatNumber(
                        Number(record.electricity || 0) *
                          ELECTRICITY_EMISSION_FACTOR,
                      )} kg
                    </td>
                    <td>{record.notes || '—'}</td>
                    {access.role === 'admin' && <td>
                      <button
                        className="org-delete-button"
                        type="button"
                        onClick={() => deleteRecord(record.id)}
                        aria-label={`Delete record from ${record.date}`}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

