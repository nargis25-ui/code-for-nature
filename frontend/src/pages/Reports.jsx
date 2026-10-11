import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaLeaf,
  FaHome,
  FaList,
  FaCalendarAlt,
  FaTrophy,
  FaLightbulb,
  FaUser,
  FaCog,
  FaRobot,
  FaSignOutAlt,
  FaBolt,
  FaTint,
  FaRecycle,
} from "react-icons/fa";

import "./Reports.css";
import "./Dashboard/Dashboard.css";

function Reports() {
  const navigate = useNavigate();
  const location = useLocation();

  const [workspace, setWorkspace] = useState("personal");

  const name = sessionStorage.getItem("userName") || "Eco Member";
  const email = sessionStorage.getItem("userEmail") || "eco@greenai.io";

  const navItems = [
    { label: "My tracker", path: "/dashboard", icon: <FaHome /> },
    { label: "Eco tips", path: "/eco-tips", icon: <FaLightbulb /> },
    {
      label: "Green Optimizer",
      path: "/green-optimizer",
      icon: <FaLeaf />,
    },
    {
      label: "Prompt studio",
      path: "/prompt-studio",
      icon: <FaRobot />,
      badge: "NEW",
    },
    { label: "Record", path: "/dashboard#usage", icon: <FaList /> },
    { label: "Reports", path: "/reports", icon: <FaCalendarAlt /> },
    { label: "Rewards", path: "/rewards", icon: <FaTrophy /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  function isActive(item) {
    if (item.path === "/dashboard#usage") {
      return (
        location.pathname === "/dashboard" &&
        location.hash === "#usage"
      );
    }

    if (item.path === "/dashboard") {
      return (
        location.pathname === "/dashboard" &&
        location.hash !== "#usage"
      );
    }

    return location.pathname === item.path;
  }

  function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    navigate("/login");
  }

  const reportCards = [
    {
      title: "Electricity Usage",
      description:
        "Monitor your electricity consumption over time.",
      icon: <FaBolt />,
      color: "report-green",
      label: "Energy",
    },
    {
      title: "Water Usage",
      description:
        "Review your water consumption and find ways to save.",
      icon: <FaTint />,
      color: "report-blue",
      label: "Water",
    },
    {
      title: "E-waste",
      description:
        "Track your electronic waste and responsible disposal.",
      icon: <FaRecycle />,
      color: "report-orange",
      label: "Waste",
    },
    {
      title: "AI Usage",
      description:
        "Review your AI usage and make more sustainable choices.",
      icon: <FaRobot />,
      color: "report-purple",
      label: "AI activity",
    },
  ];

  return (
    <div className="reports-page eco-dashboard">
      {/* DASHBOARD SIDEBAR */}
      <aside className="eco-sidebar">
        <div className="eco-brand">
          <div className="eco-brand-icon">
            <FaLeaf />
          </div>

          <div>
            <h2>verdant.ai</h2>
            <p>Sustainability Workspace</p>
          </div>
        </div>

        <div className="workspace-toggle">
          <button
            type="button"
            className={`workspace-btn ${
              workspace === "personal" ? "active" : ""
            }`}
            onClick={() => setWorkspace("personal")}
          >
            Personal
          </button>

          <button
            type="button"
            className={`workspace-btn ${
              workspace === "organization" ? "active" : ""
            }`}
            onClick={() => setWorkspace("organization")}
          >
            Organization
          </button>
        </div>

        <nav className="eco-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`eco-nav-link ${
                isActive(item) ? "active" : ""
              }`}
            >
              <span className="eco-nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.badge && (
                <span className="eco-nav-badge">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="eco-sidebar-bottom">
          <div className="eco-user">
            <div className="eco-avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="eco-user-info">
              <strong>{name.split(" ")[0]}</strong>
              <span>{email}</span>
            </div>
          </div>

          <button
            type="button"
            className="eco-logout"
            onClick={logout}
          >
            <FaSignOutAlt />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* REPORTS CONTENT */}
      <main className="reports-content eco-main">
        <header className="reports-header">
          <div>
            <p className="reports-eyebrow">YOUR IMPACT</p>
            <h1>Sustainability Reports</h1>
            <p className="reports-subtitle">
              Track your environmental impact and progress.
            </p>
          </div>

          <span className="reports-status">
            <span className="reports-status-dot" />
            Sustainability overview
          </span>
        </header>

        <section className="reports-grid">
          {reportCards.map((card) => (
            <article
              className="reports-card"
              key={card.title}
            >
              <div className={`reports-card-icon ${card.color}`}>
                {card.icon}
              </div>

              <span className="reports-card-label">
                {card.label}
              </span>

              <h2>{card.title}</h2>

              <p>{card.description}</p>

              <Link
                className="reports-card-link"
                to="/dashboard"
              >
                View tracker <span>→</span>
              </Link>
            </article>
          ))}
        </section>

        <section className="reports-note">
          <div className="reports-note-icon">
            <FaLeaf />
          </div>

          <div>
            <h2>Make every action greener</h2>
            <p>
              Review your usage regularly and use the tracker
              to monitor your sustainability habits.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;
