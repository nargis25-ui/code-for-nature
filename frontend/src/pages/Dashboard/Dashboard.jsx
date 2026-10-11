import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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

function Dashboard() {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("userEmail") || "EcoAI User";

  const [dashboard, setDashboard] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE}/api/dashboard`);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save usage data.");
      }

      setForm(initialForm);
      setMessage("Your sustainability data was saved successfully.");
      await loadDashboard();
    } catch (err) {
      setError(
        err.message || "Could not save data. Please check your backend connection."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
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
      <aside className="eco-sidebar">
        <a className="eco-brand" href="#overview">
          <span className="eco-brand-icon">🌱</span>
          <span>
            <strong>EcoAI</strong>
            <small>Sustainability Tracker</small>
          </span>
        </a>

        <nav className="eco-nav" aria-label="Main navigation">
          <a className="eco-nav-link active" href="#overview">
            <span>▦</span> Overview
          </a>
          <a className="eco-nav-link" href="#usage">
            <span>＋</span> Record usage
          </a>
          <a className="eco-nav-link" href="#tips">
            <span>✦</span> Green tips
          </a>
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
          <button className="eco-logout" onClick={handleLogout}>
            ↪ Log out
          </button>
        </div>
      </aside>

      <main className="eco-main" id="overview">
        <header className="eco-header">
          <div>
            <p className="eco-eyebrow">YOUR SUSTAINABILITY SPACE</p>
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
              <p className="eco-eyebrow">YOUR IMPACT AT A GLANCE</p>
              <h2>Usage overview</h2>
            </div>
            <button
              className="eco-refresh"
              onClick={loadDashboard}
              disabled={loading}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="eco-metrics">
            {metrics.map((metric) => (
              <article className="eco-metric-card" key={metric.key}>
                <div className="eco-metric-top">
                  <span className="eco-metric-icon">{metric.icon}</span>
                  <span className="eco-metric-unit">{metric.unit}</span>
                </div>
                <p className="eco-metric-label">{metric.label}</p>
                <div className="eco-metric-value">
                  {loading
                    ? "..."
                    : Number(totals[metric.key] || 0).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}
                </div>
                <p className="eco-metric-description">{metric.description}</p>
              </article>
            ))}
          </div>

          <p className="eco-record-count">
            {loading
              ? "Loading saved records..."
              : `${dashboard?.recordsCount ?? 0} usage record(s) saved`}
          </p>
        </section>

        <section className="eco-content-grid">
          <div className="eco-panel" id="usage">
            <div className="eco-panel-heading">
              <div>
                <p className="eco-eyebrow">TRACK YOUR FOOTPRINT</p>
                <h2>Record your usage</h2>
              </div>
              <span className="eco-panel-emoji">📝</span>
            </div>

            <p className="eco-panel-description">
              Enter your usage figures below. Use zero for any category you
              don't want to record right now.
            </p>

            <form className="eco-usage-form" onSubmit={handleSubmit}>
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

              <button className="eco-submit" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save usage data →"}
              </button>
            </form>
          </div>

          <div className="eco-panel eco-tips-panel" id="tips">
            <p className="eco-eyebrow">SMALL STEPS, REAL CHANGE</p>
            <h2>Green tips for you</h2>
            <p className="eco-panel-description">
              Simple habits can help reduce unnecessary resource use.
            </p>

            <div className="eco-tip">
              <span>⚡</span>
              <div>
                <strong>Save energy</strong>
                <p>Switch off devices and lights when they aren't needed.</p>
              </div>
            </div>

            <div className="eco-tip">
              <span>💧</span>
              <div>
                <strong>Use water mindfully</strong>
                <p>Fix leaks and avoid letting water run unnecessarily.</p>
              </div>
            </div>

            <div className="eco-tip">
              <span>♻️</span>
              <div>
                <strong>Extend device life</strong>
                <p>Repair, reuse, or responsibly recycle electronics.</p>
              </div>
            </div>

            <div className="eco-tip">
              <span>🤖</span>
              <div>
                <strong>Make AI prompts count</strong>
                <p>Write clear prompts to reduce repeated requests.</p>
              </div>
            </div>

            <p className="eco-disclaimer">
              Usage totals are based on the figures entered. They are not
              independently measured environmental impact estimates.
            </p>
          </div>
        </section>

        <footer className="eco-footer">
          EcoAI · Track thoughtfully. Choose sustainably.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
