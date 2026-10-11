
import React, { useState } from "react";
import {
  FaLeaf,
  FaHome,
  FaList,
  FaCalendarAlt,
  FaTrophy,
  FaLightbulb,
  FaUser,
  FaCog,
  FaBell,
  FaPalette,
  FaLock,
  FaBolt,
  FaTint,
  FaRecycle,
  FaChartLine,
  FaBook,
  FaHeadset,
  FaBug,
  FaInfoCircle,
  FaChevronRight,
  FaGlobe,
  FaCheckCircle,
  FaSave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Settings.css";

const initialSettings = {
  name: "Sakshi Suman",
  email: "sakshi@example.com",
  language: "English",
  emailNotifications: true,
  pushNotifications: true,
  weeklySummary: false,
  badgeAlerts: true,
  darkMode: false,
  compactView: false,
  animations: true,
  publicProfile: true,
  shareUsage: false,
  analytics: true,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("greenAISettings");
      return saved ? { ...initialSettings, ...JSON.parse(saved) } : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [message, setMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setMessage("");
  };

  const saveSettings = () => {
    localStorage.setItem("greenAISettings", JSON.stringify(settings));
    document.body.classList.toggle("green-dark-mode", settings.darkMode);
    setMessage("Settings saved successfully!");
  };

  const toggle = (label, key, description) => (
    <div className="setting-row" key={key}>
      <div className="setting-label">
        <span>{label}</span>
        <small>{description}</small>
      </div>

      <button
        type="button"
        className={`setting-toggle ${settings[key] ? "enabled" : ""}`}
        role="switch"
        aria-checked={settings[key]}
        aria-label={label}
        onClick={() => updateSetting(key, !settings[key])}
      >
        <span />
      </button>
    </div>
  );

  return (
    <div className={`settings-layout ${settings.compactView ? "compact-view" : ""}`}>
      <aside className="settings-sidebar">
        <Link to="/dashboard" className="settings-brand">
          <span className="settings-brand-icon"><FaLeaf /></span>
          <span>
            <strong>Green AI</strong>
            <small>Dashboard</small>
          </span>
        </Link>

        <nav className="settings-nav">
          <Link to="/dashboard"><FaHome /> Home</Link>
          <Link to="/record"><FaList /> Tracker</Link>
          <Link to="/reports"><FaCalendarAlt /> Carbon</Link>
          <Link to="/rewards"><FaTrophy /> Rewards</Link>
          <Link to="/eco-tips"><FaLightbulb /> Eco Tips</Link>
          <Link to="/profile"><FaUser /> Profile</Link>
          <Link to="/settings" className="active"><FaCog /> Settings <span className="active-dot" /></Link>
        </nav>

        <div className="settings-sidebar-footer">v1.0.0 · Green AI</div>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <div>
            <h3>Settings</h3>
            <p>{new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>

          <div className="settings-user">
            <FaBell className="header-bell" />
            <span className="settings-avatar"><FaUser /></span>
            <div>
              <strong>{settings.name || "Green AI User"}</strong>
              <small>Eco Member</small>
            </div>
          </div>
        </header>

        <section className="settings-content">
          <h1>Settings</h1>

          <div className="settings-grid">
            <div className="settings-column">
              <section className="settings-card">
                <h2><FaUser /> Profile Settings</h2>

                <div className="profile-setting-row">
                  <label htmlFor="displayName">Display Name</label>
                  <div className="profile-input-wrap">
                    <input
                      id="displayName"
                      value={settings.name}
                      onChange={(e) => updateSetting("name", e.target.value)}
                      placeholder="Enter your name"
                    />
                    <small>Shown on leaderboard</small>
                  </div>
                </div>

                <div className="profile-setting-row">
                  <label htmlFor="settingsEmail">Email Address</label>
                  <input
                    id="settingsEmail"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="profile-setting-row">
                  <label htmlFor="settingsLanguage">Language</label>
                  <select
                    id="settingsLanguage"
                    value={settings.language}
                    onChange={(e) => updateSetting("language", e.target.value)}
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </section>

              <section className="settings-card">
                <h2><FaPalette /> Appearance</h2>
                {toggle("Dark Mode", "darkMode", "Toggle dark theme")}
                {toggle("Compact View", "compactView", "Reduce whitespace")}
                {toggle("Show Animations", "animations", "Smooth transitions")}
              </section>

              <section className="settings-card">
                <h2><FaLock /> Privacy</h2>
                {toggle("Public Profile", "publicProfile", "Visible on leaderboard")}
                {toggle("Share Usage Data", "shareUsage", "Help improve the app")}
                {toggle("Analytics Opt-in", "analytics", "Allow anonymous analytics")}
              </section>
            </div>

            <div className="settings-column">
              <section className="settings-card">
                <h2><FaBell /> Notifications</h2>
                {toggle("Email Notifications", "emailNotifications", "Weekly reports & tips")}
                {toggle("Push Notifications", "pushNotifications", "Real-time alerts")}
                {toggle("Weekly Summary", "weeklySummary", "Every Monday morning")}
                {toggle("Badge Alerts", "badgeAlerts", "When you earn new badges")}
              </section>

              <section className="settings-card">
                <h2><FaInfoCircle /> Help & About</h2>

                <a className="help-row" href="https://react.dev/">
                  <span><strong>Documentation</strong><small>View usage guides</small></span>
                  <FaChevronRight />
                </a>

                <a className="help-row" href="mailto:support@greenai.example">
                  <span><strong>Contact Support</strong><small>Get help from our team</small></span>
                  <FaChevronRight />
                </a>

                <button className="help-row help-button" onClick={() => window.alert("Please report bugs to your project team.")}>
                  <span><strong>Report a Bug</strong><small>Help us improve</small></span>
                  <FaBug />
                </button>

                <div className="help-row">
                  <span><strong>About Green AI</strong><small>v1.0.0 · Environmental Impact Dashboard</small></span>
                  <FaGlobe />
                </div>

                <a className="help-row" href="https://www.privacypolicies.com/">
                  <span><strong>Privacy Policy</strong><small>Learn about data privacy</small></span>
                  <FaChevronRight />
                </a>
              </section>

              <section className="impact-card">
                <span className="impact-icon"><FaLeaf /></span>
                <div>
                  <h3>Environmental Impact</h3>
                  <p>Your Green AI settings help you build more sustainable habits.</p>
                </div>
              </section>
            </div>
          </div>

          <div className="settings-save-area">
            <button className="save-settings-btn" onClick={saveSettings}>
              <FaSave /> Save Changes
            </button>
            {message && <p className="settings-success"><FaCheckCircle /> {message}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Settings;
