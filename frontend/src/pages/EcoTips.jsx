import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function EcoTips() {
  const [completed, setCompleted] = useState([3, 6]);

  function toggleDone(id) {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  }

  const percentage = Math.round(
    (completed.length / tips.length) * 100
  );

  return (
    <div className="eco-layout">
      <aside className="eco-sidebar">
        <div className="eco-brand">
          <span className="brand-icon">
            <FaLeaf />
          </span>

          <div>
            <h2>Green AI</h2>
            <p>Dashboard</p>
          </div>
        </div>

        <nav className="eco-nav">
          <Link to="/dashboard">
            <FaHome /> <span>Home</span>
          </Link>

          <Link to="/record">
            <FaList /> <span>Tracker</span>
          </Link>

          <Link to="/reports">
            <FaCalendarAlt /> <span>Carbon</span>
          </Link>

          <Link to="/reports">
            <FaTrophy /> <span>Rewards</span>
          </Link>

          <Link className="active" to="/eco-tips">
            <FaLightbulb /> <span>Eco Tips</span>
            <i />
          </Link>

          <Link to="/profile">
            <FaUser /> <span>Profile</span>
          </Link>

          <Link to="/settings">
            <FaCog /> <span>Settings</span>
          </Link>
        </nav>

        <div className="eco-sidebar-footer">
          v1.0.0 · Green AI
        </div>
      </aside>

      <main className="eco-main">
        <header className="eco-header">
          <div>
            <h2>Eco Tips</h2>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="eco-user">
            <FaBell className="eco-bell" />

            <div className="user-avatar">N</div>

            <div>
              <strong>Nargiz</strong>
              <p>Eco Member</p>
            </div>
          </div>
        </header>

        <section className="eco-content">
          <div className="eco-title-row">
            <div>
              <h1>Eco Tips</h1>
              <p>
                Follow these tips to reduce your AI environmental impact
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

                  <span className="tip-category">
                    {tip.category}
                  </span>

                  <h3>{tip.title}</h3>

                  <p className="tip-description">
                    {tip.description}
                  </p>

                  <div className="tip-footer">
                    <span className="tip-impact">
                      {tip.impact}
                    </span>

                    <button
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
