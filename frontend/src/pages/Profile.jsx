
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  FaIndustry,
  FaRobot,
  FaSeedling,
  FaWater,
  FaEdit,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Nargiz Hamidova");
  const [email, setEmail] = useState("nargiz@greenai.io");
  const [editing, setEditing] = useState(false);

  const achievements = [
    { icon: <FaSeedling />, title: "First Steps", date: "Jul 1" },
    { icon: <FaLeaf />, title: "Green Beginner", date: "Jul 5" },
    { icon: <FaBolt />, title: "Energy Saver", date: "Jul 12" },
    { icon: <FaTint />, title: "Water Guardian", date: "Jul 18" },
    { icon: <FaIndustry />, title: "Carbon Fighter", date: "Jul 22" },
  ];

  const activities = [
    {
      icon: <FaRobot />,
      title: "Completed 30 AI queries",
      date: "Today · 2:34 PM",
      points: "+150g CO₂",
    },
    {
      icon: <FaTrophy />,
      title: "Earned Carbon Fighter badge",
      date: "Jul 22 · 10:15 AM",
      points: "+50 pts",
    },
    {
      icon: <FaBolt />,
      title: "Used Green Mode for 5 sessions",
      date: "Jul 21 · 4:00 PM",
      points: "−30g CO₂",
    },
    {
      icon: <FaWater />,
      title: "Kept water usage under 1L",
      date: "Jul 20 · 11:59 PM",
      points: "+40 pts",
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability score reached 92%",
      date: "Jul 18 · 9:00 AM",
      points: <FaCheckCircle />,
    },
  ];

  function saveProfile(event) {
    event.preventDefault();
    setEditing(false);
  }

  function logout() {
    navigate("/login");
  }

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="profile-brand">
          <div className="profile-brand-icon">
            <FaLeaf />
          </div>

          <div>
            <h2>Green AI</h2>
            <p>Dashboard</p>
          </div>
        </div>

        <nav className="profile-nav">
          <Link to="/dashboard">
            <FaHome className="nav-icon" />
            Home
          </Link>

          <Link to="/record">
            <FaList className="nav-icon" />
            Tracker
          </Link>

          <Link to="/reports">
            <FaCalendarAlt className="nav-icon" />
            Carbon
          </Link>

          <Link to="/reports">
            <FaTrophy className="nav-icon" />
            Rewards
          </Link>

          <Link to="/eco-tips">
            <FaLightbulb className="nav-icon" />
            Eco Tips
          </Link>

          <Link className="active" to="/profile">
            <FaUser className="nav-icon" />
            Profile
            <span className="active-dot" />
          </Link>

          <Link to="/settings">
            <FaCog className="nav-icon" />
            Settings
          </Link>
        </nav>

        <div className="profile-sidebar-footer">
          v1.0.0 · Green AI
        </div>
      </aside>

      <main className="profile-main">
        <header className="profile-header">
          <div>
            <h2>Profile</h2>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="profile-header-user">
            <FaBell className="notification-icon" />

            <div className="small-avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{name.split(" ")[0]}</strong>
              <p>Eco Member</p>
            </div>
          </div>
        </header>

        <section className="profile-content">
          <h1>My Profile</h1>

          <div className="profile-grid">
            <section className="profile-card">
              <div className="large-avatar">
                {name.charAt(0).toUpperCase()}
              </div>

              {editing ? (
                <form
                  className="profile-edit-form"
                  onSubmit={saveProfile}
                >
                  <label htmlFor="profile-name">Full Name</label>
                  <input
                    id="profile-name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    required
                  />

                  <label htmlFor="profile-email">Email</label>
                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />

                  <button className="save-profile-btn" type="submit">
                    Save Changes
                  </button>

                  <button
                    className="cancel-profile-btn"
                    type="button"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h2 className="profile-person-name">{name}</h2>
                  <p className="profile-email">{email}</p>

                  <span className="member-badge">
                    <FaLeaf /> Eco Member
                  </span>
                </>
              )}

              <div className="profile-stats">
                <div className="profile-stat">
                  <strong>1,200</strong>
                  <span>Eco Points</span>
                </div>

                <div className="profile-stat">
                  <strong>14 days</strong>
                  <span>Streak</span>
                </div>

                <div className="profile-stat">
                  <strong>5</strong>
                  <span>Badges</span>
                </div>

                <div className="profile-stat">
                  <strong>#4</strong>
                  <span>Rank</span>
                </div>
              </div>

              {!editing && (
                <button
                  className="edit-profile-btn"
                  onClick={() => setEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              )}

              <button
                className="logout-profile-btn"
                onClick={logout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </section>

            <div className="profile-right-column">
              <section className="score-card">
                <div className="score-circle">
                  <div className="score-circle-inner">
                    <strong>92%</strong>
                    <span>Score</span>
                  </div>
                </div>

                <div className="score-info">
                  <h3>AI Sustainability Score</h3>

                  <p>
                    Your score reflects how sustainably you use AI
                    tools. Keep up the great work!
                  </p>

                  <div className="score-badges">
                    <span className="excellent-badge">
                      Excellent
                    </span>
                    <span className="top-badge">Top 10%</span>
                  </div>
                </div>
              </section>

              <section className="achievement-card">
                <h3>Recent Achievements</h3>

                <div className="achievement-list">
                  {achievements.map((item) => (
                    <div
                      className="achievement-item"
                      key={item.title}
                    >
                      <span className="achievement-icon">
                        {item.icon}
                      </span>

                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="activity-card">
                <h3>Recent Activity</h3>

                <div className="activity-list">
                  {activities.map((item) => (
                    <div
                      className="activity-item"
                      key={item.title}
                    >
                      <div className="activity-icon">
                        {item.icon}
                      </div>

                      <div className="activity-description">
                        <strong>{item.title}</strong>
                        <span>{item.date}</span>
                      </div>

                      <span className="activity-points">
                        {item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
