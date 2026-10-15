// import { useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import {
//   FaLeaf,
//   FaHome,
//   FaList,
//   FaCalendarAlt,
//   FaTrophy,
//   FaLightbulb,
//   FaUser,
//   FaCog,
//   FaRobot,
//   FaSignOutAlt,
//   FaBolt,
//   FaTint,
//   FaRecycle,
// } from "react-icons/fa";

// import "./Reports.css";
// import "./Dashboard/Dashboard.css";

// function Reports() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [workspace, setWorkspace] = useState("personal");

//   const name = sessionStorage.getItem("userName") || "Eco Member";
//   const email = sessionStorage.getItem("userEmail") || "eco@greenai.io";

//   const navItems = [
//     { label: "My tracker", path: "/dashboard", icon: <FaHome /> },
//     { label: "Eco tips", path: "/eco-tips", icon: <FaLightbulb /> },
//     {
//       label: "Green Optimizer",
//       path: "/green-optimizer",
//       icon: <FaLeaf />,
//     },
//     {
//       label: "Prompt studio",
//       path: "/prompt-studio",
//       icon: <FaRobot />,
//       badge: "NEW",
//     },
//     { label: "Record", path: "/dashboard#usage", icon: <FaList /> },
//     { label: "Reports", path: "/reports", icon: <FaCalendarAlt /> },
//     { label: "Rewards", path: "/rewards", icon: <FaTrophy /> },
//     { label: "Profile", path: "/profile", icon: <FaUser /> },
//     { label: "Settings", path: "/settings", icon: <FaCog /> },
//   ];

//   function isActive(item) {
//     if (item.path === "/dashboard#usage") {
//       return (
//         location.pathname === "/dashboard" &&
//         location.hash === "#usage"
//       );
//     }

//     if (item.path === "/dashboard") {
//       return (
//         location.pathname === "/dashboard" &&
//         location.hash !== "#usage"
//       );
//     }

//     return location.pathname === item.path;
//   }

//   function logout() {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("userName");
//     navigate("/login");
//   }

//   const reportCards = [
//     {
//       title: "Electricity Usage",
//       description:
//         "Monitor your electricity consumption over time.",
//       icon: <FaBolt />,
//       color: "report-green",
//       label: "Energy",
//     },
//     {
//       title: "Water Usage",
//       description:
//         "Review your water consumption and find ways to save.",
//       icon: <FaTint />,
//       color: "report-blue",
//       label: "Water",
//     },
//     {
//       title: "E-waste",
//       description:
//         "Track your electronic waste and responsible disposal.",
//       icon: <FaRecycle />,
//       color: "report-orange",
//       label: "Waste",
//     },
//     {
//       title: "AI Usage",
//       description:
//         "Review your AI usage and make more sustainable choices.",
//       icon: <FaRobot />,
//       color: "report-purple",
//       label: "AI activity",
//     },
//   ];

//   return (
//     <div className="reports-page eco-dashboard">
//       {/* DASHBOARD SIDEBAR */}
//       <aside className="eco-sidebar">
//         <div className="eco-brand">
//           <div className="eco-brand-icon">
//             <FaLeaf />
//           </div>

//           <div>
//             <h2>verdant.ai</h2>
//             <p>Sustainability Workspace</p>
//           </div>
//         </div>

//         <div className="workspace-toggle">
//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "personal" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("personal")}
//           >
//             Personal
//           </button>

//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "organization" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("organization")}
//           >
//             Organization
//           </button>
//         </div>

//         <nav className="eco-nav">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               className={`eco-nav-link ${
//                 isActive(item) ? "active" : ""
//               }`}
//             >
//               <span className="eco-nav-icon">{item.icon}</span>
//               <span>{item.label}</span>

//               {item.badge && (
//                 <span className="eco-nav-badge">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </nav>

//         <div className="eco-sidebar-bottom">
//           <div className="eco-user">
//             <div className="eco-avatar">
//               {name.charAt(0).toUpperCase()}
//             </div>

//             <div className="eco-user-info">
//               <strong>{name.split(" ")[0]}</strong>
//               <span>{email}</span>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="eco-logout"
//             onClick={logout}
//           >
//             <FaSignOutAlt />
//             <span>Log out</span>
//           </button>
//         </div>
//       </aside>

//       {/* REPORTS CONTENT */}
//       <main className="reports-content eco-main">
//         <header className="reports-header">
//           <div>
//             <p className="reports-eyebrow">YOUR IMPACT</p>
//             <h1>Sustainability Reports</h1>
//             <p className="reports-subtitle">
//               Track your environmental impact and progress.
//             </p>
//           </div>

//           <span className="reports-status">
//             <span className="reports-status-dot" />
//             Sustainability overview
//           </span>
//         </header>

//         <section className="reports-grid">
//           {reportCards.map((card) => (
//             <article
//               className="reports-card"
//               key={card.title}
//             >
//               <div className={`reports-card-icon ${card.color}`}>
//                 {card.icon}
//               </div>

//               <span className="reports-card-label">
//                 {card.label}
//               </span>

//               <h2>{card.title}</h2>

//               <p>{card.description}</p>

//               <Link
//                 className="reports-card-link"
//                 to="/dashboard"
//               >
//                 View tracker <span>→</span>
//               </Link>
//             </article>
//           ))}
//         </section>

//         <section className="reports-note">
//           <div className="reports-note-icon">
//             <FaLeaf />
//           </div>

//           <div>
//             <h2>Make every action greener</h2>
//             <p>
//               Review your usage regularly and use the tracker
//               to monitor your sustainability habits.
//             </p>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Reports;


import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  CalendarDays,
  Download,
  FileText,
  Leaf,
  Droplets,
  Recycle,
  Zap,
  RefreshCw,
} from 'lucide-react'
import './reports.css'

const PERSONAL_KEY = 'ecoai-my-tracker-records-v1'
const ORGANIZATION_KEY = 'ecoai-organization-records-v1'
const ORGANIZATION_ACCESS_KEY = 'ecoai-organization-access-v1'
const ELECTRICITY_EMISSION_FACTOR = 0.716

function readRecords(key) {
  if (!key) return []

  try {
    const saved = localStorage.getItem(key)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getRecordsStorageKey(workspace, userEmail) {
  if (workspace !== 'organization') return PERSONAL_KEY

  const normalizedEmail = (userEmail || '').trim().toLowerCase()
  if (!normalizedEmail) return null

  try {
    const savedAccess = localStorage.getItem(
      `${ORGANIZATION_ACCESS_KEY}-${encodeURIComponent(normalizedEmail)}`,
    )
    const access = savedAccess ? JSON.parse(savedAccess) : null

    if (
      !access ||
      access.appUserEmail !== userEmail ||
      typeof access.organizationId !== 'string' ||
      !access.organizationId
    ) {
      return null
    }

    return `${ORGANIZATION_KEY}-${access.organizationId}`
  } catch {
    return null
  }
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(date) {
  if (!date) return '—'

  const parsed = new Date(`${date}T00:00:00`)

  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
}

function csvCell(value) {
  const text = String(value ?? '')
  return `"${text.replace(/"/g, '""')}"`
}

function downloadCsv(records, workspace) {
  const headers = [
    'Date',
    'Electricity (kWh)',
    'Water (litres)',
    'E-waste (kg)',
    'AI usage (recorded units)',
    'Estimated electricity emissions (kg CO2e)',
  ]

  const rows = records.map((record) => [
    record.date || '',
    Number(record.electricity || 0),
    Number(record.water || 0),
    Number(record.ewaste || 0),
    Number(record.aiUsage || 0),
    (
      Number(record.electricity || 0) *
      ELECTRICITY_EMISSION_FACTOR
    ).toFixed(2),
  ])

  const csv = [
    headers.map(csvCell).join(','),
    ...rows.map((row) => row.map(csvCell).join(',')),
  ].join('\r\n')

  const blob = new Blob(['\uFEFF', csv], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `ecoai-${workspace}-report-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`

  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function Reports({ workspace = 'personal', userEmail = '' }) {
  const isOrganization = workspace === 'organization'

  const [records, setRecords] = useState(() =>
    readRecords(getRecordsStorageKey(workspace, userEmail)),
  )
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateError, setDateError] = useState('')

  useEffect(() => {
    function refreshRecords() {
      setRecords(readRecords(getRecordsStorageKey(workspace, userEmail)))
    }

    refreshRecords()
    window.addEventListener('focus', refreshRecords)
    window.addEventListener('storage', refreshRecords)

    return () => {
      window.removeEventListener('focus', refreshRecords)
      window.removeEventListener('storage', refreshRecords)
    }
  }, [workspace, userEmail])

  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => {
        if (startDate && record.date < startDate) return false
        if (endDate && record.date > endDate) return false
        return true
      })
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
  }, [records, startDate, endDate])

  const totals = useMemo(() => {
    return filteredRecords.reduce(
      (total, record) => ({
        electricity:
          total.electricity + Number(record.electricity || 0),
        water: total.water + Number(record.water || 0),
        ewaste: total.ewaste + Number(record.ewaste || 0),
        aiUsage: total.aiUsage + Number(record.aiUsage || 0),
      }),
      {
        electricity: 0,
        water: 0,
        ewaste: 0,
        aiUsage: 0,
      },
    )
  }, [filteredRecords])

  const emissions =
    totals.electricity * ELECTRICITY_EMISSION_FACTOR

  const monthlyData = useMemo(() => {
    const months = new Map()

    filteredRecords.forEach((record) => {
      if (!record.date || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
        return
      }

      const month = record.date.slice(0, 7)
      const current = months.get(month) || {
        electricity: 0,
        water: 0,
        ewaste: 0,
      }

      current.electricity += Number(record.electricity || 0)
      current.water += Number(record.water || 0)
      current.ewaste += Number(record.ewaste || 0)
      months.set(month, current)
    })

    return [...months.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, values]) => ({
        month,
        label: new Date(`${month}-01T00:00:00`).toLocaleDateString(
          'en-IN',
          { month: 'short', year: '2-digit' },
        ),
        ...values,
      }))
  }, [filteredRecords])

  const maxElectricity = Math.max(
    ...monthlyData.map((month) => month.electricity),
    1,
  )

  function resetFilters() {
    setStartDate('')
    setEndDate('')
    setDateError('')
  }

  function updateStartDate(value) {
    setStartDate(value)
    setDateError(
      value && endDate && value > endDate
        ? 'Start date must be on or before the end date.'
        : '',
    )
  }

  function updateEndDate(value) {
    setEndDate(value)
    setDateError(
      startDate && value && startDate > value
        ? 'End date must be on or after the start date.'
        : '',
    )
  }

  return (
    <div className="reports-page">
      <header className="reports-intro">
        <span className="reports-eyebrow">ECOAI / IMPACT OVERVIEW</span>
        <h2>Sustainability Reports</h2>
        <p>
          Review recorded resource usage, understand estimated electricity
          emissions, and export your data for further analysis.
        </p>
      </header>

      <section className="reports-banner">
        <div className="reports-banner-icon">
          <BarChart3 size={25} />
        </div>
        <div className="reports-banner-copy">
          <span className="reports-workspace-label">
            {isOrganization ? 'ORGANIZATION WORKSPACE' : 'PERSONAL WORKSPACE'}
          </span>
          <h3>Your sustainability at a glance</h3>
          <p>
            These figures are calculated from the records saved in your
            {isOrganization ? ' organization' : ' personal'} tracker.
          </p>
        </div>
        <div className="reports-record-count">
          <strong>{filteredRecords.length}</strong>
          <span>records in report</span>
        </div>
      </section>

      <section className="reports-filter-card">
        <div className="reports-filter-heading">
          <CalendarDays size={19} />
          <div>
            <h3>Choose report period</h3>
            <p>Leave both dates blank to include all recorded data.</p>
          </div>
        </div>

        <div className="reports-filter-controls">
          <label>
            Start date
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => updateStartDate(event.target.value)}
            />
          </label>
          <label>
            End date
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => updateEndDate(event.target.value)}
            />
          </label>
          <button
            className="reports-reset-button"
            type="button"
            onClick={resetFilters}
          >
            <RefreshCw size={15} />
            Reset dates
          </button>
        </div>

        {dateError && (
          <p className="reports-date-error" role="alert">
            {dateError}
          </p>
        )}
      </section>

      <section className="reports-metrics" aria-label="Usage totals">
        <article className="reports-metric-card">
          <span className="reports-metric-icon reports-electricity">
            <Zap size={20} />
          </span>
          <p>Total electricity</p>
          <strong>{formatNumber(totals.electricity)}</strong>
          <span className="reports-metric-unit">kWh recorded</span>
        </article>

        <article className="reports-metric-card">
          <span className="reports-metric-icon reports-water">
            <Droplets size={20} />
          </span>
          <p>Total water</p>
          <strong>{formatNumber(totals.water)}</strong>
          <span className="reports-metric-unit">litres recorded</span>
        </article>

        <article className="reports-metric-card">
          <span className="reports-metric-icon reports-ewaste">
            <Recycle size={20} />
          </span>
          <p>E-waste</p>
          <strong>{formatNumber(totals.ewaste)}</strong>
          <span className="reports-metric-unit">kg recorded</span>
        </article>

        <article className="reports-metric-card">
          <span className="reports-metric-icon reports-ai">
            <Leaf size={20} />
          </span>
          <p>AI usage</p>
          <strong>{formatNumber(totals.aiUsage)}</strong>
          <span className="reports-metric-unit">recorded units</span>
        </article>
      </section>

      <section className="reports-emissions-card">
        <div className="reports-emissions-icon">
          <Leaf size={22} />
        </div>
        <div className="reports-emissions-copy">
          <span>ESTIMATED ELECTRICITY EMISSIONS</span>
          <h3>{formatNumber(emissions)} kg CO₂e</h3>
          <p>
            Calculated as electricity usage × {ELECTRICITY_EMISSION_FACTOR}
            {' '}kg CO₂e/kWh. This is an estimate, not a measurement of
            total environmental impact.
          </p>
        </div>
      </section>

      <section className="reports-chart-card">
        <div className="reports-section-heading">
          <div>
            <span className="reports-section-kicker">USAGE HISTORY</span>
            <h3>Monthly electricity usage</h3>
            <p>Up to six months with recorded data in the selected period.</p>
          </div>
          <span className="reports-chart-unit">kWh</span>
        </div>

        {monthlyData.length ? (
          <div className="reports-chart" role="img" aria-label="Monthly electricity usage bar chart">
            {monthlyData.map((month) => (
              <div className="reports-chart-column" key={month.month}>
                <span className="reports-bar-value">
                  {formatNumber(month.electricity)}
                </span>
                <div className="reports-bar-track">
                  <div
                    className="reports-bar"
                    style={{
                      height: `${Math.max(
                        (month.electricity / maxElectricity) * 100,
                        month.electricity > 0 ? 4 : 0,
                      )}%`,
                    }}
                  />
                </div>
                <span className="reports-bar-label">{month.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="reports-empty-chart">
            <BarChart3 size={27} />
            <p>No usage data for this period yet.</p>
            <span>Add records in your tracker to see monthly trends.</span>
          </div>
        )}
      </section>

      <section className="reports-history-card">
        <div className="reports-history-heading">
          <div className="reports-section-heading">
            <div>
              <span className="reports-section-kicker">SAVED DATA</span>
              <h3>Report records</h3>
              <p>Review the entries included in this report.</p>
            </div>
          </div>
          <button
            className="reports-export-button"
            type="button"
            onClick={() => downloadCsv(filteredRecords, isOrganization ? 'organization' : 'personal')}
            disabled={!filteredRecords.length || Boolean(dateError)}
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        {filteredRecords.length ? (
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Electricity</th>
                  <th>Water</th>
                  <th>E-waste</th>
                  <th>AI usage</th>
                  <th>Est. emissions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr
                    key={record.id || record.createdAt || `${record.date}-${index}`}
                  >
                    <td>{formatDate(record.date)}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="reports-empty-state">
            <FileText size={30} />
            <h4>No records to report yet</h4>
            <p>
              Add a usage entry in {isOrganization ? 'My Organization' : 'My Tracker'}
              {' '}or choose a different date range.
            </p>
          </div>
        )}

        <p className="reports-disclaimer">
          Data source: locally saved tracker entries on this browser.
          AI usage is shown in the units you entered; it is not a direct
          measurement of tokens, electricity, or carbon emissions.
        </p>
      </section>
    </div>
  )
}

