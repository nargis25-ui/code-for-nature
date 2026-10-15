import { useState } from 'react'
import { Activity, Building2, LogOut } from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { id: 'prompt-optimizer', label: 'Prompt Optimizer', icon: '✳' },
  { id: 'reports', label: 'Reports', icon: '▤' },
  { id: 'rewards', label: 'Rewards', icon: '☆' },
  { id: 'profile', label: 'Profile', icon: '♙' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export default function Sidebar({
  activePage,
  onNavigate,
  onWorkspaceChange,
  onLogout,
  userName,
  userEmail,
  userPhoto,
  userInitials,
}) {
  const [dashboardExpanded, setDashboardExpanded] = useState(false)

  const dashboardPages = [
    'dashboard',
    'my-tracker',
    'my-organization',
  ]

  const isDashboardActive = dashboardPages.includes(activePage)

  return (
    <aside className="sidebar">
      <button
        type="button"
        className="sidebar-brand"
        onClick={() => {
          setDashboardExpanded(false)
          onNavigate('dashboard')
        }}
        aria-label="EcoAI home"
      >
        <span className="brand-symbol">e</span>
        <span className="brand-copy">
          <strong>
            eco<span>ai</span>
          </strong>
          <small>SUSTAINABILITY TRACKER</small>
        </span>
      </button>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <button
          type="button"
          className={`sidebar-link dashboard-parent ${
            isDashboardActive ? 'active' : ''
          }`}
          aria-label="Dashboard"
          title="Dashboard"
          onClick={() => {
            setDashboardExpanded((expanded) => !expanded)
            onNavigate('dashboard')
          }}
          aria-expanded={dashboardExpanded}
        >
          <span className="sidebar-icon">▦</span>
          <span className="sidebar-link-label">Dashboard</span>
          <span
            className={`sidebar-chevron ${
              dashboardExpanded ? 'expanded' : ''
            }`}
          >
            ›
          </span>
        </button>

        {dashboardExpanded && (
          <div className="dashboard-submenu">
            <button
              type="button"
              className={`sidebar-sub-link ${
                activePage === 'my-tracker' ? 'active' : ''
              }`}
              onClick={() => onWorkspaceChange('personal')}
              aria-current={
                activePage === 'my-tracker' ? 'page' : undefined
              }
              aria-label="My Tracker"
              title="My Tracker"
            >
              <Activity className="submenu-icon" size={17} />
              <span>My Tracker</span>
            </button>

            <button
              type="button"
              className={`sidebar-sub-link ${
                activePage === 'my-organization' ? 'active' : ''
              }`}
              onClick={() => onWorkspaceChange('organization')}
              aria-current={
                activePage === 'my-organization' ? 'page' : undefined
              }
              aria-label="My Organization"
              title="My Organization"
            >
              <Building2 className="submenu-icon" size={17} />
              <span>My Organization</span>
            </button>
          </div>
        )}

        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`sidebar-link ${
              activePage === item.id ? 'active' : ''
            }`}
            onClick={() => {
              setDashboardExpanded(false)
              onNavigate(item.id)
            }}
            aria-label={item.label}
            title={item.label}
            aria-current={
              activePage === item.id ? 'page' : undefined
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-link-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-profile"
          onClick={() => onNavigate('profile')}
          aria-label={`Open profile for ${userName}`}
          title={`${userName}${userEmail ? ` · ${userEmail}` : ''}`}
        >
          {userPhoto ? (
            <img className="sidebar-profile-avatar" src={userPhoto} alt="" />
          ) : (
            <span className="sidebar-profile-avatar sidebar-profile-initials">
              {userInitials}
            </span>
          )}
          <span className="sidebar-profile-copy">
            <strong>{userName}</strong>
            <small>{userEmail || 'Signed in'}</small>
          </span>
          <span className="sidebar-profile-arrow" aria-hidden="true">›</span>
        </button>
        <button
          type="button"
          className="sidebar-logout"
          onClick={onLogout}
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

