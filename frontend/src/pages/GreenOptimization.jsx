import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GreenOptimization.css";

const initialServers = [
  {
    id: 1,
    name: "GPU Cluster A",
    detail: "Running · CPU 54%",
    type: "GPU",
    usage: 8,
    status: "Idle risk",
  },
  {
    id: 2,
    name: "Inference Pool",
    detail: "Running · CPU 67%",
    type: "GPU",
    usage: 72,
    status: "Healthy",
  },
  {
    id: 3,
    name: "Batch Node 04",
    detail: "Running · CPU 27%",
    type: "GPU",
    usage: 19,
    status: "Low use",
  },
];

const extraServer = {
  id: 4,
  name: "Embedding Worker",
  detail: "Running · CPU 38%",
  type: "GPU",
  usage: 43,
  status: "Healthy",
};

const workloads = [
  {
    name: "Summarization batch",
    model: "Reasoner XL",
    energy: "42.6 kWh",
    status: "Review",
  },
  {
    name: "Support classifier",
    model: "Eco-Lite",
    energy: "8.4 kWh",
    status: "Efficient",
  },
  {
    name: "Model training",
    model: "Vision Pro",
    energy: "90.2 kWh",
    status: "Schedule",
  },
];

// Dashboard sidebar ke same buttons aur routes
const navigation = [
  { id: "overview", label: "My tracker", icon: "◉", path: "/dashboard" },
  { id: "tips", label: "Eco tips", icon: "♧", path: "/eco-tips" },
  {
    id: "Optimizer",
    label: "Green Optimizer",
    icon: "✿",
    path: "/green-optimization",
  },
  {
    id: "prompt-studio",
    label: "Prompt studio",
    icon: "✧",
    badge: "NEW",
    path: "/prompt-studio",
  },
  { id: "reports", label: "Reports", icon: "▥", path: "/reports" },
  { id: "rewards", label: "Rewards", icon: "★", path: "/rewards" },
  { id: "profile", label: "Profile", icon: "♙", path: "/profile" },
  { id: "settings", label: "Settings", icon: "⚙", path: "/settings" },
];

function Icon({ children, className = "" }) {
  return (
    <span className={`go-icon ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function MetricCard({ icon, label, value, note, tone = "" }) {
  return (
    <article className="go-metric-card">
      <Icon className={`metric-icon ${tone}`}>{icon}</Icon>

      <div className="metric-copy">
        <span className="go-muted">{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </article>
  );
}

export default function GreenOptimizer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [workspace, setWorkspace] = useState("Organization");
  const [showAllServers, setShowAllServers] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [notice, setNotice] = useState("");

  const userEmail =
    sessionStorage.getItem("userEmail") || "EcoAI User";

  const visibleServers = showAllServers
    ? [...initialServers, extraServer]
    : initialServers;

  const activeItem = navigation.find(
    (item) => item.path === location.pathname
  );

  const activeLabel = activeItem?.label || "Green activities";

  function handleNavigation(item) {
    setNotice("");
    navigate(item.path);
  }

  function handleSchedule() {
    setScheduled(true);
    setNotice("Green window scheduled for 11:00–15:00.");
  }

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("rememberMe");

    navigate("/login", { replace: true });
  }

  return (
    <div className="go-app">
      {/* LEFT SIDEBAR */}
      <aside className="go-sidebar">
        <button
          type="button"
          className="go-brand"
          onClick={() => navigate("/dashboard")}
          aria-label="Go to dashboard"
        >
          <span className="go-brand-mark">🌿</span>
          <span>verdant.ai</span>
        </button>

        <p className="go-sidebar-label">WORKSPACE</p>

        {/* Workspace switch */}
        <div className="go-workspace-switch" role="group">
          <button
            type="button"
            className={workspace === "Personal" ? "selected" : ""}
            aria-pressed={workspace === "Personal"}
            onClick={() => {
              setWorkspace("Personal");
              setNotice("Personal workspace selected.");
            }}
          >
            Personal
          </button>

          <button
            type="button"
            className={
              workspace === "Organization" ? "selected" : ""
            }
            aria-pressed={workspace === "Organization"}
            onClick={() => {
              setWorkspace("Organization");
              setNotice("Organization workspace selected.");
            }}
          >
            Organization
          </button>
        </div>

        {/* Navigation matching Dashboard */}
        <nav className="go-nav" aria-label="Main navigation">
          <p className="go-nav-heading">MAIN MENU</p>

          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`go-nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => handleNavigation(item)}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
            >
              <span className="go-nav-icon">{item.icon}</span>
              <span className="go-nav-label">{item.label}</span>

              {item.badge && (
                <span className="go-new">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom sidebar */}
        <div className="go-sidebar-bottom">
          <div className="go-plan-card">
            <span className="go-plan-icon">✦</span>

            <strong>Make your AI greener</strong>

            <p>
              Find ways to reduce energy use across your workloads.
            </p>

            <button
              type="button"
              onClick={() =>
                setNotice(
                  "Explore the resource utilization and cleaner-energy suggestions on this page."
                )
              }
            >
              Explore optimization <span>→</span>
            </button>
          </div>

          <div className="go-user">
            <span className="go-avatar">
              {userEmail.charAt(0).toUpperCase()}
            </span>

            <div className="go-user-copy">
              <strong>{userEmail}</strong>
              <small>{workspace} workspace</small>
            </div>

            <button
              type="button"
              className="go-dots"
              aria-label="Account options"
              onClick={() => navigate("/profile")}
            >
              ···
            </button>
          </div>

          <button
            className="go-help"
            type="button"
            onClick={() =>
              setNotice(
                "Energy and carbon values are illustrative demo estimates."
              )
            }
          >
            <span>ⓘ</span>
            <span>Help &amp; methodology</span>
          </button>

          <button
            className="go-logout"
            type="button"
            onClick={handleLogout}
          >
            ↪ Log out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="go-main">
        <header className="go-topbar">
          <div className="go-breadcrumb">
            <span>Workspace</span>
            <b>›</b>
            <strong>{activeLabel}</strong>
          </div>

          <div className="go-topbar-right">
            <span className="go-live-dot" />
            <span>Estimates active</span>

            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setNotice("You are all caught up.")}
            >
              ♧
            </button>
          </div>
        </header>

        <div className="go-content">
          {/* HERO */}
          <section className="go-hero">
            <div>
              <p className="go-eyebrow">
                ORGANIZATION / SIMULATED OPERATIONS
              </p>

              <h1>
                Optimize the work
                <br />
                <span>behind</span> the model.
              </h1>

              <p className="go-subtitle">
                Find waste in your AI estate before it becomes the default.
              </p>
            </div>

            <span className="go-simulated-badge">
              SIMULATED DATA
            </span>
          </section>

          {/* NOTICE */}
          {notice && (
            <div className="go-notice" role="status">
              <span>{notice}</span>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          {/* METRICS */}
          <section className="go-metrics" aria-label="Usage summary">
            <MetricCard
              icon="⌁"
              label="AI requests"
              value="12,840"
              note="Across 14 workloads"
              tone="mint"
            />

            <MetricCard
              icon="ϟ"
              label="Estimated energy"
              value="184.6 kWh"
              note="This reporting period"
              tone="mint"
            />

            <MetricCard
              icon="☁"
              label="CO₂ footprint"
              value="59.1 kg"
              note="−17% optimized"
              tone="amber"
            />

            <MetricCard
              icon="♧"
              label="Energy saved"
              value="31.4 kWh"
              note="Potential savings"
              tone="lime"
            />
          </section>

          {/* SERVER AND CLEAN ENERGY SECTIONS */}
          <section className="go-middle-grid">
            <article className="go-panel go-resource-panel">
              <div className="go-panel-heading">
                <div>
                  <p className="go-eyebrow">
                    INFRASTRUCTURE WATCH
                  </p>
                  <h2>Resource utilization</h2>
                </div>

                <button
                  className="go-outline-button"
                  type="button"
                  onClick={() =>
                    setShowAllServers((previous) => !previous)
                  }
                >
                  {showAllServers ? "Show fewer" : "All servers"}
                  <span>›</span>
                </button>
              </div>

              <div className="go-server-list">
                {visibleServers.map((server) => (
                  <div className="go-server-row" key={server.id}>
                    <Icon className="go-server-icon">▦</Icon>

                    <div className="go-server-name">
                      <strong>{server.name}</strong>
                      <small>{server.detail}</small>
                    </div>

                    <div className="go-usage">
                      <div className="go-usage-label">
                        <span>{server.type}</span>
                        <strong>{server.usage}%</strong>
                      </div>

                      <div
                        className="go-progress"
                        role="progressbar"
                        aria-label={`${server.name} usage`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={server.usage}
                      >
                        <span
                          className={
                            server.usage < 20 ? "warning" : ""
                          }
                          style={{ width: `${server.usage}%` }}
                        />
                      </div>
                    </div>

                    <span
                      className={`go-status ${server.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {server.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="go-panel go-clean-panel">
              <p className="go-eyebrow">FLEXIBLE WORKLOAD</p>

              <h2>Run with cleaner energy.</h2>

              <p className="go-description">
                We found a lower-carbon window for a workload that
                doesn't need to run immediately.
              </p>

              <div className="go-window">
                <Icon className="window-icon">▦</Icon>

                <div>
                  <strong>11:00 – 15:00</strong>
                  <small>Estimated lower-carbon window</small>
                </div>

                <b>−24%</b>
              </div>

              <div className="go-window-meta">
                <span>Model training · 3 hours</span>
                <span>Potentially avoid 10.2 kg CO₂</span>
              </div>

              <button
                className="go-primary-button"
                type="button"
                onClick={handleSchedule}
                disabled={scheduled}
              >
                {scheduled
                  ? "✓ Green window scheduled"
                  : "Schedule green window"}
                <span>↗</span>
              </button>

              <small className="go-footnote">
                {scheduled
                  ? "Your demo schedule has been updated."
                  : "Conceptual scheduling using simulated carbon-intensity data."}
              </small>
            </article>
          </section>

          {/* WORKLOAD TABLE */}
          <section className="go-panel go-workload-panel">
            <div className="go-panel-heading">
              <div>
                <p className="go-eyebrow">WORKLOAD REVIEW</p>
                <h2>Where to look next</h2>
              </div>

              <button
                className="go-icon-button"
                type="button"
                aria-label="Workload options"
                onClick={() =>
                  setNotice("Workload filters can be connected here.")
                }
              >
                ☷
              </button>
            </div>

            <div className="go-table-wrap">
              <table className="go-table">
                <thead>
                  <tr>
                    <th>WORKLOAD</th>
                    <th>MODEL</th>
                    <th>ENERGY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {workloads.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.model}</td>
                      <td>{item.energy}</td>
                      <td>
                        <span
                          className={`go-table-status ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="go-disclaimer">
            Energy and carbon values are illustrative estimates for
            demonstration purposes.
          </p>
        </div>
      </main>
    </div>
  );
}