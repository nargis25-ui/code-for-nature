import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard/Dashboard.css";
import "./Settings.css";

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

const DEFAULT_SETTINGS = {
  displayName: "Sakshi Suman",
  email: "",
  language: "English",
  estimationMethod: "location",
  carbonIntensity: 0.41,
  darkMode: false,
  compactView: false,
  animations: true,
  automaticOptimization: true,
  idleDetection: true,
};

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail =
    sessionStorage.getItem("userEmail") || "EcoAI User";

  const [workspace, setWorkspace] = useState("personal");

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("verdantSettings");

      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [message, setMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        "verdantSettings",
        JSON.stringify(settings)
      );

      setMessage("Settings saved successfully!");
    } catch {
      setMessage("Unable to save settings. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("rememberMe");

    navigate("/login", { replace: true });
  };

  const handleNavigation = (event, item) => {
    event.preventDefault();
    navigate(item.path);
  };

  return (
    <div
      className={`eco-dashboard settings-dashboard ${
        settings.darkMode ? "settings-dark-mode" : ""
      }`}
    >
      {/* LEFT SIDEBAR - SAME AS DASHBOARD */}

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
              onClick={(event) => handleNavigation(event, item)}
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

      {/* SETTINGS PAGE CONTENT */}

      <main className="eco-main settings-main">
        <header className="eco-header settings-header">
          <div>
            <p className="eco-eyebrow">
              YOUR SUSTAINABILITY SPACE
            </p>

            <h1>Settings</h1>

            <p className="eco-subtitle">
              Manage your account and workspace preferences.
            </p>
          </div>

          <div className="eco-status">
            <span className="eco-status-dot" />
            Settings
          </div>
        </header>

        {message && (
          <div
            className="eco-alert eco-alert-success"
            role="status"
          >
            {message}
          </div>
        )}

        <form className="settings-form" onSubmit={handleSave}>
          {/* Profile Settings */}

          <section className="settings-card">
            <div className="settings-card-heading">
              <span className="settings-icon">♙</span>

              <div>
                <h2>Profile Settings</h2>
                <p>Update your personal information.</p>
              </div>
            </div>

            <div className="settings-fields">
              <label className="settings-label">
                Display name

                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(event) =>
                    updateSetting(
                      "displayName",
                      event.target.value
                    )
                  }
                  placeholder="Enter your name"
                />
              </label>

              <label className="settings-label">
                Email address

                <input
                  type="email"
                  value={settings.email}
                  onChange={(event) =>
                    updateSetting("email", event.target.value)
                  }
                  placeholder={userEmail}
                />
              </label>
            </div>
          </section>

          {/* Environmental Preferences */}

          <section className="settings-card">
            <div className="settings-card-heading">
              <span className="settings-icon">♧</span>

              <div>
                <h2>Environmental Preferences</h2>
                <p>
                  Customize your sustainability calculations.
                </p>
              </div>
            </div>

            <div className="settings-fields">
              <label className="settings-label">
                Language

                <select
                  value={settings.language}
                  onChange={(event) =>
                    updateSetting("language", event.target.value)
                  }
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </label>

              <label className="settings-label">
                Estimation method

                <select
                  value={settings.estimationMethod}
                  onChange={(event) =>
                    updateSetting(
                      "estimationMethod",
                      event.target.value
                    )
                  }
                >
                  <option value="location">Location-based</option>
                  <option value="global">Global average</option>
                  <option value="custom">Custom</option>
                </select>
              </label>

              <label className="settings-label">
                Carbon intensity (kg CO₂/kWh)

                <input
                  type="number"
                  min="0"
                  max="2"
                  step="0.01"
                  value={settings.carbonIntensity}
                  onChange={(event) =>
                    updateSetting(
                      "carbonIntensity",
                      Number(event.target.value)
                    )
                  }
                />
              </label>
            </div>
          </section>

          {/* Appearance */}

          <section className="settings-card">
            <div className="settings-card-heading">
              <span className="settings-icon">☼</span>

              <div>
                <h2>Appearance</h2>
                <p>Customize how your workspace looks.</p>
              </div>
            </div>

            {[
              {
                key: "darkMode",
                title: "Dark mode",
                description: "Use a darker workspace appearance.",
              },
              {
                key: "compactView",
                title: "Compact view",
                description: "Reduce spacing between elements.",
              },
              {
                key: "animations",
                title: "Animations",
                description: "Enable interface animations.",
              },
            ].map((item) => (
              <label
                className="settings-toggle-row"
                key={item.key}
              >
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(event) =>
                    updateSetting(
                      item.key,
                      event.target.checked
                    )
                  }
                />
              </label>
            ))}
          </section>

          {/* Optimization */}

          <section className="settings-card">
            <div className="settings-card-heading">
              <span className="settings-icon">⚡</span>

              <div>
                <h2>Optimization</h2>
                <p>Manage energy-saving preferences.</p>
              </div>
            </div>

            {[
              {
                key: "automaticOptimization",
                title: "Automatic optimization",
                description: "Enable sustainability suggestions.",
              },
              {
                key: "idleDetection",
                title: "Idle detection",
                description: "Enable idle usage detection.",
              },
            ].map((item) => (
              <label
                className="settings-toggle-row"
                key={item.key}
              >
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(event) =>
                    updateSetting(
                      item.key,
                      event.target.checked
                    )
                  }
                />
              </label>
            ))}
          </section>

          {/* Save Button */}

          <div className="settings-footer">
            <button
              type="submit"
              className="settings-save-btn"
            >
              ✓ Save settings
            </button>
          </div>
        </form>

        <footer className="eco-footer">
          verdant.ai · Track thoughtfully. Choose sustainably.
        </footer>
      </main>
    </div>
  );
}

export default Settings;
