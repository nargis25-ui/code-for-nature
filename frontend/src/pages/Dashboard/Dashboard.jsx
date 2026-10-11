
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const initialForm = {
  electricity: "",
  water: "",
  ewaste: "",
  aiUsage: "",
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
  { id: "overview", label: "My tracker", icon: "◉" },
  { id: "tips", label: "Eco tips", icon: "♧" },
  { id: "activities", label: "Green activities", icon: "✿" },
  {
    id: "prompt-studio",
    label: "Prompt studio",
    icon: "✧",
    badge: "NEW",
  },
  { id: "usage", label: "Record", icon: "▤" },
  { id: "reports", label: "Reports", icon: "▥" },
  { id: "profile", label: "Profile", icon: "♙" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

function Dashboard() {
  const navigate = useNavigate();

  const userEmail =
    sessionStorage.getItem("userEmail") || "EcoAI User";

  const [dashboard, setDashboard] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  // NEW: Personal / Organization workspace selection
  const [workspace, setWorkspace] = useState("personal");

  // Load dashboard data from the backend
  const loadDashboard = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        `${API_BASE}/api/dashboard`
      );

      if (!response.ok) {
        throw new Error("Could not load dashboard data.");
      }

      const data = await response.json();
      setDashboard(data);
    } catch {
      setError(
        "Could not connect to the backend. Check that your backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Sidebar navigation
  const handleNavigation = (event, id) => {
    event.preventDefault();
    setActiveSection(id);

    if (id === "overview" || id === "usage" || id === "tips") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // These sections are placeholders until their features are built.
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Save usage data
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    const payload = {
      electricity: Number(form.electricity),
      water: Number(form.water),
      ewaste: Number(form.ewaste),
      aiUsage: Number(form.aiUsage),
    };

    try {
      const response = await fetch(`${API_BASE}/api/usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save usage data."
        );
      }

      setForm(initialForm);
      setMessage(
        "Your sustainability data was saved successfully."
      );

      await loadDashboard();
    } catch (err) {
      setError(
        err.message ||
          "Could not save data. Please check your backend connection."
      );
    } finally {
      setSaving(false);
    }
  };

  // Log out
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("rememberMe");

    navigate("/login", { replace: true });
  };

  const totals = dashboard?.totals || {
    electricity: 0,
    water: 0,
    ewaste: 0,
    aiUsage: 0,
  };

  return (
    <div className="eco-dashboard">
      {/* SIDEBAR */}
      <aside className="eco-sidebar">
        {/* BRAND LOGO */}
        <a
          className="eco-brand"
          href="#overview"
          onClick={(event) =>
            handleNavigation(event, "overview")
          }
        >
          <span className="eco-brand-icon">🌿</span>

          <span>
            <strong>verdant.ai</strong>
            <small>Sustainability Workspace</small>
          </span>
        </a>

        {/* NEW: PERSONAL / ORGANIZATION TOGGLE */}
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

        {/* ALL EIGHT NAVIGATION BUTTONS */}
        <nav className="eco-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={`eco-nav-link ${
                activeSection === item.id ? "active" : ""
              }`}
              href={`#${item.id}`}
              onClick={(event) =>
                handleNavigation(event, item.id)
              }
            >
              <span className="eco-nav-icon">{item.icon}</span>

              <span>{item.label}</span>

              {item.badge && (
                <span className="eco-nav-badge">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* USER INFORMATION AND LOGOUT */}
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

      {/* MAIN DASHBOARD */}
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

        {/* STATUS MESSAGES */}
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

        {/* USAGE OVERVIEW */}
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
              onClick={loadDashboard}
              disabled={loading}
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
                  {loading
                    ? "..."
                    : Number(
                        totals[metric.key] || 0
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                </div>

                <p className="eco-metric-description">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>

          <p className="eco-record-count">
            {loading
              ? "Loading saved records..."
              : `${dashboard?.recordsCount ?? 0} usage record(s) saved`}
          </p>
        </section>

        {/* USAGE FORM AND GREEN TIPS */}
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

              <button
                className="eco-submit"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save usage data →"}
              </button>
            </form>
          </div>

          <div className="eco-panel eco-tips-panel" id="tips">
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
              Usage totals are based on the figures entered.
              They are not independently measured environmental
              impact estimates.
            </p>
          </div>
        </section>

        {/* PLACEHOLDER SECTIONS FOR FUTURE FEATURES */}
        <section
          className="eco-panel eco-future-section"
          id="activities"
        >
          <p className="eco-eyebrow">TAKE ACTION</p>
          <h2>Green activities</h2>
          <p>
            Green challenges and sustainability activities will
            appear here when this feature is implemented.
          </p>
        </section>

        <section
          className="eco-panel eco-future-section"
          id="prompt-studio"
        >
          <p className="eco-eyebrow">USE AI THOUGHTFULLY</p>
          <h2>Prompt studio</h2>
          <p>
            Tools for writing efficient AI prompts can be added here.
          </p>
        </section>

        <section
          className="eco-panel eco-future-section"
          id="reports"
        >
          <p className="eco-eyebrow">YOUR PROGRESS</p>
          <h2>Reports</h2>
          <p>
            Sustainability reports and usage trends can be added here.
          </p>
        </section>

        <section
          className="eco-panel eco-future-section"
          id="profile"
        >
          <p className="eco-eyebrow">YOUR ACCOUNT</p>
          <h2>Profile</h2>
          <p>Signed in as {userEmail}</p>
        </section>

        <section
          className="eco-panel eco-future-section"
          id="settings"
        >
          <p className="eco-eyebrow">PREFERENCES</p>
          <h2>Settings</h2>
          <p>
            Dashboard preferences can be added here.
          </p>
        </section>

        <footer className="eco-footer">
          verdant.ai · Track thoughtfully. Choose sustainably.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
