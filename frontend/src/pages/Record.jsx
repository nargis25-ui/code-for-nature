
import React from "react";
import {
  Bell,
  Sprout,
  Leaf,
  Zap,
  Droplet,
  Factory,
  Rocket,
  Medal,
  Trophy,
  Star,
  LockKeyhole,
  Brain,
  Check,
} from "lucide-react";

import "./reward.css";

const badges = [
  {
    title: "First Steps",
    description: "Completed your first eco assessment",
    date: "Jul 1",
    icon: Sprout,
    completed: true,
  },
  {
    title: "Green Beginner",
    description: "Earned 100 Eco Points",
    date: "Jul 5",
    icon: Leaf,
    completed: true,
  },
  {
    title: "Energy Saver",
    description: "Reduced daily usage by 20%",
    date: "Jul 12",
    icon: Zap,
    completed: true,
  },
  {
    title: "Water Guardian",
    description: "Kept water usage under 1L for a week",
    date: "Jul 18",
    icon: Droplet,
    completed: true,
  },
  {
    title: "Carbon Fighter",
    description: "Offset 500g of CO₂",
    date: "Jul 22",
    icon: Factory,
    completed: true,
  },
  {
    title: "Eco Hero",
    description: "Reach 2000 Eco Points",
    icon: Rocket,
    completed: false,
  },
];

const leaderboard = [
  { name: "Alex Chen", points: "4,850", rank: 1, initial: "A" },
  { name: "Maria G.", points: "4,200", rank: 2, initial: "M" },
  { name: "Sam Patel", points: "3,890", rank: 3, initial: "S" },
  { name: "You", points: "1,200", rank: 4, initial: "Y", isUser: true },
  { name: "Jamie K.", points: "980", rank: 5, initial: "J" },
];

const challenges = [
  {
    title: "Reduce daily queries by 10%",
    reward: 100,
    progress: 80,
  },
  {
    title: "Keep CO₂ under 120g for 3 days",
    reward: 150,
    progress: 67,
  },
  {
    title: "Use green mode for 5 sessions",
    reward: 80,
    progress: 40,
  },
];

const recentRewards = [
  {
    title: "Carbon Fighter badge",
    date: "Jul 22",
    points: 50,
    icon: Medal,
  },
  {
    title: "Energy Saver completed",
    date: "Jul 18",
    points: 30,
    icon: Zap,
  },
  {
    title: "Water Guardian badge",
    date: "Jul 12",
    points: 40,
    icon: Droplet,
  },
];

function Reward() {
  return (
    <div className="reward-page">
      {/* Top Header */}
      <header className="reward-header">
        <div>
          <h2>Rewards</h2>
          <p>Sunday, October 11, 2026</p>
        </div>

        <div className="header-profile">
          <button
            className="notification-button"
            aria-label="Notifications"
            type="button"
          >
            <Bell size={21} />
            <span className="notification-dot" />
          </button>

          <div className="profile-avatar">N</div>

          <div className="profile-details">
            <strong>Nargiz</strong>
            <span>Eco Member</span>
          </div>
        </div>
      </header>

      {/* Page Introduction */}
      <section className="reward-intro">
        <div>
          <h1>Rewards &amp; Achievements</h1>
          <p>Earn eco points and unlock badges for sustainable AI use</p>
        </div>

        <div className="points-card">
          <Star className="points-star" size={27} fill="currentColor" />
          <div>
            <strong>1,200</strong>
            <span>Eco Points</span>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="reward-layout">
        <main className="reward-main">
          {/* Achievement Badges */}
          <section className="reward-card">
            <h3>Achievement Badges</h3>

            <div className="badge-grid">
              {badges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <article
                    className={`achievement-badge ${
                      !badge.completed ? "locked-badge" : ""
                    }`}
                    key={badge.title}
                  >
                    <Icon
                      className="achievement-icon"
                      size={35}
                      strokeWidth={1.8}
                    />

                    <h4>{badge.title}</h4>
                    <p>{badge.description}</p>

                    {badge.completed ? (
                      <span className="badge-date">
                        <Check size={12} />
                        {badge.date}
                      </span>
                    ) : (
                      <span className="locked-text">
                        <LockKeyhole size={12} />
                        Locked
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Weekly Challenges */}
          <section className="reward-card challenge-card">
            <h3>Weekly Challenge</h3>

            <div className="challenge-list">
              {challenges.map((challenge) => (
                <div className="challenge-item" key={challenge.title}>
                  <div className="challenge-heading">
                    <span>{challenge.title}</span>
                    <strong>+{challenge.reward} pts</strong>
                  </div>

                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label={challenge.title}
                    aria-valuenow={challenge.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>

                  <p className="progress-label">
                    {challenge.progress}% complete
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="reward-sidebar">
          {/* Leaderboard */}
          <section className="reward-card leaderboard-card">
            <h3>
              <Medal size={19} className="section-icon" />
              Leaderboard
            </h3>

            <div className="leaderboard-list">
              {leaderboard.map((person) => (
                <div
                  className={`leaderboard-row ${
                    person.isUser ? "current-user" : ""
                  }`}
                  key={person.name}
                >
                  <div className="rank-number">
                    {person.rank === 1 ? (
                      <Trophy size={19} />
                    ) : person.rank === 2 || person.rank === 3 ? (
                      <Medal size={18} />
                    ) : person.isUser ? (
                      <Star size={19} fill="currentColor" />
                    ) : (
                      person.rank
                    )}
                  </div>

                  <div className="leader-avatar">{person.initial}</div>

                  <div className="leader-info">
                    <strong>{person.name}</strong>
                    <span>{person.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Rewards */}
          <section className="reward-card recent-card">
            <h3>Recent Rewards</h3>

            <div className="recent-list">
              {recentRewards.map((reward) => {
                const Icon = reward.icon;

                return (
                  <div className="recent-row" key={reward.title}>
                    <Icon size={23} className="recent-icon" />

                    <div className="recent-info">
                      <strong>{reward.title}</strong>
                      <span>{reward.date}</span>
                    </div>

                    <span className="reward-points">
                      +{reward.points}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>

      {/* Floating Assistant Icon */}
      <button
        className="assistant-button"
        type="button"
        aria-label="Open AI assistant"
      >
        <Brain size={22} />
      </button>
    </div>
  );
}

export default Reward;

