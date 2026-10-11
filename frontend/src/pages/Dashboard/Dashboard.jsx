import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const initialForm = {
  electricity: "",
  water: "",
  ewaste: "",
  aiUsage: "",
};

const initialDashboard = {
  totals: {
    electricity: 124.5,
    water: 860,
    ewaste: 3.2,
    aiUsage: 42,
  },
  recordsCount: 8,
};

const metrics = [
  {
    key: "electricity",
    label: "Electricity usage",
    unit: "kWh",
    icon: "⚡",
    description: "Energy consumed",
  },
  {
    key: "water",
    label: "Water usage",
    unit: "litres",
    icon: "💧",
    description: "Water consumed",
  },
  {
    key: "ewaste",
    label: "E-waste",
    unit: "kg",
    icon: "♻️",
    description: "Electronic waste recorded",
  },
  {
    key: "aiUsage",
    label: "AI usage",
    unit: "prompts",
    icon: "🤖",
    description: "AI prompts recorded",
  },
];

const navigation = [
  {
    id: "overview",
    label: "My tracker",
    icon: "◉",
    path: "/dashboard",
  },
  {
    id: "tips",
    label: "Eco tips",
    icon: "♧",
    path: "/eco-tips",
  },
  {
    id: "green-optimizer",
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
  {
    id: "reports",
    label: "Reports",
    icon: "▥",
    path: "/reports",
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: "★",
    path: "/rewards",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "♙",
    path: "/profile",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙",
    path: "/settings",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail =
    sessionStorage.getItem("userEmail") || "EcoAI User";

  const [dashboard, setDashboard] = useState(initialDashboard);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [workspace, setWorkspace] = useState("personal");

  const totals = dashboard.totals;

  const handleNavigation = (event, item) => {
    event.preventDefault();
    navigate(item.path);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (Object.values(form).some((value) => value.trim() === "")) {
      setError("Please fill in all usage fields.");
      return;
    }

    const payload = {
      electricity: Number(form.electricity),
      water: Number(form.water),
      ewaste: Number(form.ewaste),
      aiUsage: Number(form.aiUsage),
    };

    const hasInvalidValue = Object.values(payload).some(
      (value) => !Number.isFinite(value) || value < 0
    );

    if (hasInvalidValue) {
      setError("Please enter valid, non-negative numbers.");
      return;
    }

    setDashboard((previous) => ({
      ...previous,
      totals: {
        electricity:
          previous.totals.electricity + payload.electricity,
        water: previous.totals.water + payload.water,
        ewaste: previous.totals.ewaste + payload.ewaste,
        aiUsage: previous.totals.aiUsage + payload.aiUsage,
      },
      recordsCount: previous.recordsCount + 1,
    }));

    setForm(initialForm);
    setMessage("Demo usage data added successfully!");
  };

  const handleRefresh = () => {
    setError("");
    setMessage("Dashboard refreshed successfully!");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("rememberMe");

    navigate("/login", { replace: true });
  };

  return (
    <div className="eco-dashboard">
      <aside className="eco-sidebar">
        <a
          className="eco-brand"
          href="/dashboard"
          onClick={(event) => {
            event.preventDefault();
            navigate("/dashboard");
          }}
        >
          <span className="eco-brand-icon">🌿</span>

          <span>
            <strong>verdant.ai</strong>
            <small>Sustainability Workspace</small>
          </span>
        </a>

        <div
          className="workspace-toggle"
          role="group"
          aria-label="Select workspace"
        >
          <button
            type="button"
            className={`workspace-btn ${
              workspace === "personal" ? "active" : ""
            }`}
            aria-pressed={workspace === "personal"}
            onClick={() => setWorkspace("personal")}
          >
            Personal
          </button>

          <button
            type="button"
            className={`workspace-btn ${
              workspace === "organization" ? "active" : ""
            }`}
            aria-pressed={workspace === "organization"}
            onClick={() => setWorkspace("organization")}
          >
            Organization
          </button>
        </div>

        <nav className="eco-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={`eco-nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              href={item.path}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
              onClick={(event) => handleNavigation(event, item)}
            >
              <span className="eco-nav-icon">{item.icon}</span>

              <span>{item.label}</span>

              {item.badge && (
                <span className="eco-nav-badge">{item.badge}</span>
              )}
            </a>
          ))}
        </nav>

        <div className="eco-sidebar-bottom">
          <div className="eco-user">
            <div className="eco-avatar">
              {userEmail.charAt(0).toUpperCase()}
            </div>

            <div className="eco-user-info">
              <strong>{userEmail}</strong>
              <small>EcoAI user</small>
            </div>
          </div>

          <button
            type="button"
            className="eco-logout"
            onClick={handleLogout}
          >
            ↪ Log out
          </button>
        </div>
      </aside>

      <main className="eco-main" id="overview">
        <header className="eco-header">
          <div>
            <p className="eco-eyebrow">
              YOUR SUSTAINABILITY SPACE
            </p>

            <h1>Good to see you again 🌿</h1>

            <p className="eco-subtitle">
              Understand your usage and make more sustainable choices.
            </p>
          </div>

          <div className="eco-status">
            <span className="eco-status-dot" />
            EcoAI dashboard
          </div>
        </header>

        {error && (
          <div className="eco-alert eco-alert-error" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="eco-alert eco-alert-success" role="status">
            {message}
          </div>
        )}

        <section className="eco-section">
          <div className="eco-section-heading">
            <div>
              <p className="eco-eyebrow">
                YOUR IMPACT AT A GLANCE
              </p>

              <h2>Usage overview</h2>
            </div>

            <button
              type="button"
              className="eco-refresh"
              onClick={handleRefresh}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="eco-metrics">
            {metrics.map((metric) => (
              <article
                className="eco-metric-card"
                key={metric.key}
              >
                <div className="eco-metric-top">
                  <span className="eco-metric-icon">
                    {metric.icon}
                  </span>

                  <span className="eco-metric-unit">
                    {metric.unit}
                  </span>
                </div>

                <p className="eco-metric-label">
                  {metric.label}
                </p>

                <div className="eco-metric-value">
                  {Number(totals[metric.key] || 0).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                  )}
                </div>

                <p className="eco-metric-description">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>

          <p className="eco-record-count">
            {dashboard.recordsCount} demo usage record(s)
          </p>
        </section>

        <section className="eco-content-grid">
          <div className="eco-panel" id="usage">
            <div className="eco-panel-heading">
              <div>
                <p className="eco-eyebrow">
                  TRACK YOUR FOOTPRINT
                </p>

                <h2>Record your usage</h2>
              </div>

              <span className="eco-panel-emoji">📝</span>
            </div>

            <p className="eco-panel-description">
              Enter your usage figures below. Use zero for any
              category you don't want to record right now.
            </p>

            <form
              className="eco-usage-form"
              onSubmit={handleSubmit}
            >
              <label>
                Electricity (kWh)
                <input
                  type="number"
                  name="electricity"
                  min="0"
                  step="any"
                  value={form.electricity}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                  required
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
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  required
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
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  required
                />
              </label>

              <label>
                AI prompts
                <input
                  type="number"
                  name="aiUsage"
                  min="0"
                  step="1"
                  value={form.aiUsage}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  required
                />
              </label>

              <button className="eco-submit" type="submit">
                Save usage data →
              </button>
            </form>
          </div>

          <div className="eco-panel eco-tips-panel">
            <p className="eco-eyebrow">
              SMALL STEPS, REAL CHANGE
            </p>

            <h2>Green tips for you</h2>

            <p className="eco-panel-description">
              Simple habits can help reduce unnecessary resource use.
            </p>

            <div className="eco-tip">
              <span>⚡</span>
              <div>
                <strong>Save energy</strong>
                <p>
                  Switch off devices and lights when they aren't needed.
                </p>
              </div>
            </div>

            <div className="eco-tip">
              <span>💧</span>
              <div>
                <strong>Use water mindfully</strong>
                <p>
                  Fix leaks and avoid letting water run unnecessarily.
                </p>
              </div>
            </div>

            <div className="eco-tip">
              <span>♻️</span>
              <div>
                <strong>Extend device life</strong>
                <p>
                  Repair, reuse, or responsibly recycle electronics.
                </p>
              </div>
            </div>

            <div className="eco-tip">
              <span>🤖</span>
              <div>
                <strong>Make AI prompts count</strong>
                <p>
                  Write clear prompts to reduce repeated requests.
                </p>
              </div>
            </div>

            <p className="eco-disclaimer">
              These are demo totals based on sample values and
              figures entered. They are not independently measured
              environmental impact estimates.
            </p>
          </div>
        </section>

        <footer className="eco-footer">
          verdant.ai · Track thoughtfully. Choose sustainably.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
