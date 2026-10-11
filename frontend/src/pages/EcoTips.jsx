import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  FaBolt,
  FaTint,
  FaRobot,
  FaSeedling,
  FaWater,
  FaRecycle,
  FaCheckCircle,
} from "react-icons/fa";

import "./EcoTips.css";
import "./Dashboard/Dashboard.css";

const tips = [
  {
    id: 1,
    icon: <FaBolt />,
    category: "Energy Saving",
    title: "Reduce Query Frequency",
    description:
      "Batch similar AI queries together instead of sending them one at a time. This can reduce energy consumption.",
    impact: "High Impact",
    color: "orange",
  },
  {
    id: 2,
    icon: <FaTint />,
    category: "Water Saving",
    title: "Use Lighter AI Models",
    description:
      "For simple tasks, use lightweight AI models to reduce computing resources.",
    impact: "Medium Impact",
    color: "blue",
  },
  {
    id: 3,
    icon: <FaRobot />,
    category: "AI Best Practice",
    title: "Schedule Off-Peak Queries",
    description:
      "Run non-urgent AI tasks during off-peak hours when possible.",
    impact: "High Impact",
    color: "green",
  },
  {
    id: 4,
    icon: <FaSeedling />,
    category: "Energy Saving",
    title: "Enable Green Mode",
    description:
      "Use Green Mode to choose more energy-efficient options whenever possible.",
    impact: "Medium Impact",
    color: "purple",
  },
  {
    id: 5,
    icon: <FaWater />,
    category: "Water Saving",
    title: "Monitor Water Budget",
    description:
      "Track your water usage and try to reduce unnecessary consumption.",
    impact: "Medium Impact",
    color: "blue",
  },
  {
    id: 6,
    icon: <FaRecycle />,
    category: "AI Best Practice",
    title: "Cache Common Responses",
    description:
      "Reuse saved responses for frequently asked questions to avoid repeated AI requests.",
    impact: "High Impact",
    color: "teal",
  },
];

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
  { id: "usage", label: "Record", icon: "▤", path: "/dashboard#usage" },
  { id: "reports", label: "Reports", icon: "▥", path: "/reports" },
  { id: "rewards", label: "Rewards", icon: "★", path: "/rewards" },
  { id: "profile", label: "Profile", icon: "♙", path: "/profile" },
  { id: "settings", label: "Settings", icon: "⚙", path: "/settings" },
];

export default function EcoTips() {
  const navigate = useNavigate();
  const location = useLocation();

  const [completed, setCompleted] = useState([3, 6]);
  const [workspace, setWorkspace] = useState("personal");

  const userEmail =
    sessionStorage.getItem("userEmail") || "EcoAI User";

  function toggleDone(id) {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  const percentage = Math.round(
    (completed.length / tips.length) * 100
  );

  function handleNavigation(event, item) {
    event.preventDefault();

    if (item.path === "/dashboard#usage") {
      navigate("/dashboard");

      setTimeout(() => {
        document.getElementById("usage")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return;
    }

    navigate(item.path);
  }

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("rememberMe");

    navigate("/login", { replace: true });
  }

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
          {navigation.map((item) => {
            const isActive =
              item.id === "overview" || item.id === "usage"
                ? location.pathname === "/dashboard"
                : location.pathname === item.path;

            return (
              <a
                key={item.id}
                className={`eco-nav-link ${isActive ? "active" : ""}`}
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
            );
          })}
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

      <main className="eco-main">
        <header className="eco-header">
          <div>
            <p className="eco-eyebrow">YOUR SUSTAINABILITY SPACE</p>
            <h1>Eco Tips 🌱</h1>
            <p className="eco-subtitle">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="eco-status">
            <span className="eco-status-dot" />
            Sustainability Workspace
          </div>
        </header>

        <section className="eco-content">
          <div className="eco-title-row">
            <div>
              <h2>Small steps, real change</h2>
              <p>
                Follow these tips to reduce your AI environmental impact.
              </p>
            </div>

            <div className="eco-progress-circle">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#31833b ${percentage}%, #e5f1e6 ${percentage}%)`,
                }}
              >
                <span>{percentage}%</span>
              </div>

              <div>
                <strong>{completed.length}/6 Done</strong>
                <p>Progress</p>
              </div>
            </div>
          </div>

          <div className="eco-progress-card">
            <div className="progress-heading">
              <strong>Overall Completion</strong>
              <strong>
                {completed.length} of {tips.length} tips completed
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="eco-tips-grid">
            {tips.map((tip) => {
              const isDone = completed.includes(tip.id);

              return (
                <article
                  className={`eco-tip-card ${tip.color} ${
                    isDone ? "completed" : ""
                  }`}
                  key={tip.id}
                >
                  {isDone && (
                    <FaCheckCircle className="done-check" />
                  )}

                  <div className="tip-icon">{tip.icon}</div>
                  <span className="tip-category">{tip.category}</span>
                  <h3>{tip.title}</h3>
                  <p className="tip-description">{tip.description}</p>

                  <div className="tip-footer">
                    <span className="tip-impact">{tip.impact}</span>

                    <button
                      type="button"
                      onClick={() => toggleDone(tip.id)}
                    >
                      {isDone ? (
                        <>
                          <FaCheckCircle /> Done
                        </>
                      ) : (
                        "Mark Done"
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}