// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Sprout,
//   Leaf,
//   Zap,
//   Droplet,
//   Factory,
//   Rocket,
//   Medal,
//   Trophy,
//   Star,
//   LockKeyhole,
//   Brain,
//   Check,
// } from "lucide-react";

// import "./Dashboard/Dashboard.css";
// import "./Reward.css";

// const navigation = [
//   { label: "My tracker", icon: "◉", path: "/dashboard" },
//   { label: "Eco tips", icon: "♧", path: "/eco-tips" },
//   {
//     label: "Green Optimizer",
//     icon: "✿",
//     path: "/green-optimization",
//   },
//   {
//     label: "Prompt studio",
//     icon: "✧",
//     path: "/prompt-studio",
//     badge: "NEW",
//   },
//   { label: "Reports", icon: "▥", path: "/reports" },
//   { label: "Rewards", icon: "★", path: "/rewards" },
//   { label: "Profile", icon: "♙", path: "/profile" },
//   { label: "Settings", icon: "⚙", path: "/settings" },
// ];

// const badges = [
//   {
//     title: "First Steps",
//     description: "Completed your first eco assessment",
//     date: "Jul 1",
//     icon: Sprout,
//     completed: true,
//   },
//   {
//     title: "Green Beginner",
//     description: "Earned 100 Eco Points",
//     date: "Jul 5",
//     icon: Leaf,
//     completed: true,
//   },
//   {
//     title: "Energy Saver",
//     description: "Reduced daily usage by 20%",
//     date: "Jul 12",
//     icon: Zap,
//     completed: true,
//   },
//   {
//     title: "Water Guardian",
//     description: "Kept water usage under 1L for a week",
//     date: "Jul 18",
//     icon: Droplet,
//     completed: true,
//   },
//   {
//     title: "Carbon Fighter",
//     description: "Offset 500g of CO₂",
//     date: "Jul 22",
//     icon: Factory,
//     completed: true,
//   },
//   {
//     title: "Eco Hero",
//     description: "Reach 2000 Eco Points",
//     icon: Rocket,
//     completed: false,
//   },
// ];

// const leaderboard = [
//   { name: "Alex Chen", points: "4,850", rank: 1, initial: "A" },
//   { name: "Maria G.", points: "4,200", rank: 2, initial: "M" },
//   { name: "Sam Patel", points: "3,890", rank: 3, initial: "S" },
//   {
//     name: "You",
//     points: "1,200",
//     rank: 4,
//     initial: "Y",
//     isUser: true,
//   },
//   { name: "Jamie K.", points: "980", rank: 5, initial: "J" },
// ];

// const challenges = [
//   {
//     title: "Reduce daily queries by 10%",
//     reward: 100,
//     progress: 80,
//   },
//   {
//     title: "Keep CO₂ under 120g for 3 days",
//     reward: 150,
//     progress: 67,
//   },
//   {
//     title: "Use green mode for 5 sessions",
//     reward: 80,
//     progress: 40,
//   },
// ];

// const recentRewards = [
//   {
//     title: "Carbon Fighter badge",
//     date: "Jul 22",
//     points: 50,
//     icon: Medal,
//   },
//   {
//     title: "Energy Saver completed",
//     date: "Jul 18",
//     points: 30,
//     icon: Zap,
//   },
//   {
//     title: "Water Guardian badge",
//     date: "Jul 12",
//     points: 40,
//     icon: Droplet,
//   },
// ];

// function Reward() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const userEmail =
//     sessionStorage.getItem("userEmail") || "EcoAI User";

//   const handleLogout = () => {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("rememberMe");

//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="eco-dashboard reward-dashboard">
//       <aside className="eco-sidebar">
//         <Link to="/dashboard" className="eco-brand">
//           <span className="eco-brand-icon">🌿</span>
//           <span>
//             <strong>verdant.ai</strong>
//             <small>Sustainability Workspace</small>
//           </span>
//         </Link>

//         <div
//           className="workspace-toggle"
//           role="group"
//           aria-label="Select workspace"
//         >
//           <button
//             type="button"
//             className="workspace-btn active"
//           >
//             Personal
//           </button>
//           <button type="button" className="workspace-btn">
//             Organization
//           </button>
//         </div>

//         <nav className="eco-nav" aria-label="Main navigation">
//           {navigation.map((item) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={
//                   isActive
//                     ? "eco-nav-link active"
//                     : "eco-nav-link"
//                 }
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 <span className="eco-nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>

//                 {item.badge && (
//                   <span className="eco-nav-badge">
//                     {item.badge}
//                   </span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="eco-sidebar-bottom">
//           <div className="eco-user">
//             <div className="eco-avatar">
//               {userEmail.charAt(0).toUpperCase()}
//             </div>
//             <div className="eco-user-info">
//               <strong>{userEmail}</strong>
//               <small>EcoAI user</small>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="eco-logout"
//             onClick={handleLogout}
//           >
//             ↪ Log out
//           </button>
//         </div>
//       </aside>

//       <main className="eco-main reward-main-content">
//         <div className="reward-container">
//           <header className="reward-header">
//             <div>
//               <h2>Rewards</h2>
//               <p>Track your sustainability achievements</p>
//             </div>

//             <div className="header-profile">
//               <button
//                 className="notification-button"
//                 type="button"
//                 aria-label="Notifications"
//                 onClick={() =>
//                   window.alert("No new notifications!")
//                 }
//               >
//                 <Bell size={21} />
//                 <span className="notification-dot" />
//               </button>

//               <div className="profile-avatar">
//                 {userEmail.charAt(0).toUpperCase()}
//               </div>
//               <div className="profile-details">
//                 <strong>{userEmail}</strong>
//                 <span>Eco Member</span>
//               </div>
//             </div>
//           </header>

//           <section className="reward-intro">
//             <div>
//               <h1>Rewards &amp; Achievements</h1>
//               <p>
//                 Earn eco points and unlock badges for sustainable AI use.
//               </p>
//             </div>

//             <div className="points-card">
//               <Star
//                 className="points-star"
//                 size={27}
//                 fill="currentColor"
//               />
//               <div>
//                 <strong>1,200</strong>
//                 <span>Eco Points</span>
//               </div>
//             </div>
//           </section>

//           <div className="reward-layout">
//             <div className="reward-main">
//               <section className="reward-card">
//                 <h3>Achievement Badges</h3>

//                 <div className="badge-grid">
//                   {badges.map((badge) => {
//                     const Icon = badge.icon;

//                     return (
//                       <article
//                         className={
//                           badge.completed
//                             ? "achievement-badge"
//                             : "achievement-badge locked-badge"
//                         }
//                         key={badge.title}
//                       >
//                         <Icon
//                           className="achievement-icon"
//                           size={35}
//                           strokeWidth={1.8}
//                         />
//                         <h4>{badge.title}</h4>
//                         <p>{badge.description}</p>

//                         {badge.completed ? (
//                           <span className="badge-date">
//                             <Check size={12} />
//                             {badge.date}
//                           </span>
//                         ) : (
//                           <span className="locked-text">
//                             <LockKeyhole size={12} />
//                             Locked
//                           </span>
//                         )}
//                       </article>
//                     );
//                   })}
//                 </div>
//               </section>

//               <section className="reward-card challenge-card">
//                 <h3>Weekly Challenges</h3>

//                 <div className="challenge-list">
//                   {challenges.map((challenge) => (
//                     <div
//                       className="challenge-item"
//                       key={challenge.title}
//                     >
//                       <div className="challenge-heading">
//                         <span>{challenge.title}</span>
//                         <strong>+{challenge.reward} pts</strong>
//                       </div>

//                       <div
//                         className="progress-track"
//                         role="progressbar"
//                         aria-label={challenge.title}
//                         aria-valuenow={challenge.progress}
//                         aria-valuemin={0}
//                         aria-valuemax={100}
//                       >
//                         <div
//                           className="progress-fill"
//                           style={{
//                             width: `${challenge.progress}%`,
//                           }}
//                         />
//                       </div>

//                       <p className="progress-label">
//                         {challenge.progress}% complete
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>

//             <aside className="reward-sidebar">
//               <section className="reward-card leaderboard-card">
//                 <h3>
//                   <Medal size={19} className="section-icon" />
//                   Leaderboard
//                 </h3>

//                 <div className="leaderboard-list">
//                   {leaderboard.map((person) => (
//                     <div
//                       className={
//                         person.isUser
//                           ? "leaderboard-row current-user"
//                           : "leaderboard-row"
//                       }
//                       key={person.name}
//                     >
//                       <div className="rank-number">
//                         {person.rank === 1 ? (
//                           <Trophy size={19} />
//                         ) : person.rank === 2 ||
//                           person.rank === 3 ? (
//                           <Medal size={18} />
//                         ) : person.isUser ? (
//                           <Star size={19} fill="currentColor" />
//                         ) : (
//                           person.rank
//                         )}
//                       </div>

//                       <div className="leader-avatar">
//                         {person.initial}
//                       </div>
//                       <div className="leader-info">
//                         <strong>{person.name}</strong>
//                         <span>{person.points} pts</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section className="reward-card recent-card">
//                 <h3>Recent Rewards</h3>

//                 <div className="recent-list">
//                   {recentRewards.map((reward) => {
//                     const Icon = reward.icon;

//                     return (
//                       <div
//                         className="recent-row"
//                         key={reward.title}
//                       >
//                         <Icon
//                           size={23}
//                           className="recent-icon"
//                         />
//                         <div className="recent-info">
//                           <strong>{reward.title}</strong>
//                           <span>{reward.date}</span>
//                         </div>
//                         <span className="reward-points">
//                           +{reward.points}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </section>
//             </aside>
//           </div>
//         </div>

//         <button
//           className="assistant-button"
//           type="button"
//           aria-label="Open AI assistant"
//           title="AI Assistant"
//           onClick={() =>
//             window.alert("AI Assistant coming soon!")
//           }
//         >
//           <Brain size={22} />
//         </button>
//       </main>
//     </div>
//   );
// }

// export default Reward;

import { useEffect, useMemo, useState } from 'react'
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Droplets,
  Leaf,
  LockKeyhole,
  Recycle,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import './rewards.css'

const PERSONAL_KEY = 'ecoai-my-tracker-records-v1'
const ORGANIZATION_KEY = 'ecoai-organization-records-v1'

function readRecords(key) {
  try {
    const value = localStorage.getItem(key)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getRecordTotal(records, field) {
  return records.reduce(
    (total, record) => total + Number(record[field] || 0),
    0,
  )
}

const MILESTONES = [
  {
    id: 'first-entry',
    title: 'First Step',
    description: 'Record your first sustainability entry.',
    icon: Leaf,
    check: (records) => records.length >= 1,
    requirement: 'Save your first tracker entry',
  },
  {
    id: 'electricity',
    title: 'Energy Tracker',
    description: 'Record electricity usage at least once.',
    icon: Zap,
    check: (records) =>
      records.some((record) => Number(record.electricity || 0) > 0),
    requirement: 'Log electricity usage above zero',
  },
  {
    id: 'water',
    title: 'Water Watcher',
    description: 'Record water usage at least once.',
    icon: Droplets,
    check: (records) =>
      records.some((record) => Number(record.water || 0) > 0),
    requirement: 'Log water usage above zero',
  },
  {
    id: 'ewaste',
    title: 'E-waste Guardian',
    description: 'Record an e-waste entry.',
    icon: Recycle,
    check: (records) =>
      records.some((record) => Number(record.ewaste || 0) > 0),
    requirement: 'Log e-waste above zero',
  },
  {
    id: 'five-records',
    title: 'Habit Builder',
    description: 'Save five tracker entries.',
    icon: CalendarCheck,
    check: (records) => records.length >= 5,
    requirement: 'Save 5 tracker entries',
  },
  {
    id: 'three-days',
    title: 'Consistency Champion',
    description: 'Record activity on three different dates.',
    icon: Target,
    check: (records) =>
      new Set(records.map((record) => record.date).filter(Boolean)).size >= 3,
    requirement: 'Record entries on 3 different dates',
  },
]

export default function Rewards({ workspace = 'personal' }) {
  const isOrganization = workspace === 'organization'
  const storageKey = isOrganization ? ORGANIZATION_KEY : PERSONAL_KEY

  const [records, setRecords] = useState(() => readRecords(storageKey))

  useEffect(() => {
    function refreshRecords() {
      setRecords(readRecords(storageKey))
    }

    refreshRecords()
    window.addEventListener('focus', refreshRecords)
    window.addEventListener('storage', refreshRecords)

    return () => {
      window.removeEventListener('focus', refreshRecords)
      window.removeEventListener('storage', refreshRecords)
    }
  }, [storageKey])

  const progress = useMemo(() => {
    const unlocked = MILESTONES.filter((milestone) =>
      milestone.check(records),
    )

    return {
      unlocked,
      count: unlocked.length,
      percentage: Math.round(
        (unlocked.length / MILESTONES.length) * 100,
      ),
    }
  }, [records])

  const stats = useMemo(
    () => ({
      entries: records.length,
      electricity: getRecordTotal(records, 'electricity'),
      water: getRecordTotal(records, 'water'),
      ewaste: getRecordTotal(records, 'ewaste'),
    }),
    [records],
  )

  const nextMilestone = MILESTONES.find(
    (milestone) => !milestone.check(records),
  )

  return (
    <div className="rewards-page">
      <header className="rewards-intro">
        <span className="rewards-eyebrow">ECOAI / YOUR ACHIEVEMENTS</span>
        <h2>Rewards & Milestones</h2>
        <p>
          Build a habit of tracking your environmental activity. Every
          milestone celebrates a step toward better awareness.
        </p>
      </header>

      <section className="rewards-hero">
        <div className="rewards-hero-art" aria-hidden="true">
          <div className="rewards-hero-circle">
            <Trophy size={38} />
          </div>
          <Sparkles className="rewards-sparkle rewards-sparkle-one" size={19} />
          <Sparkles className="rewards-sparkle rewards-sparkle-two" size={14} />
        </div>

        <div className="rewards-hero-copy">
          <span className="rewards-workspace-tag">
            {isOrganization ? 'ORGANIZATION WORKSPACE' : 'PERSONAL WORKSPACE'}
          </span>
          <h3>Small actions add up.</h3>
          <p>
            Track your activity, unlock milestones, and keep building
            consistent sustainability habits.
          </p>
          <div className="rewards-progress-label">
            <span>Milestone progress</span>
            <strong>
              {progress.count} of {MILESTONES.length} unlocked
            </strong>
          </div>
          <div
            className="rewards-progress-track"
            role="progressbar"
            aria-label="Milestone progress"
            aria-valuemin={0}
            aria-valuemax={MILESTONES.length}
            aria-valuenow={progress.count}
          >
            <div
              className="rewards-progress-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="rewards-progress-caption">
            {progress.percentage}% of available milestones completed
          </span>
        </div>
      </section>

      <section className="rewards-stats" aria-label="Your tracked activity">
        <article className="rewards-stat">
          <span className="rewards-stat-icon rewards-stat-green">
            <CalendarCheck size={19} />
          </span>
          <div>
            <span>Entries saved</span>
            <strong>{stats.entries}</strong>
          </div>
        </article>

        <article className="rewards-stat">
          <span className="rewards-stat-icon rewards-stat-yellow">
            <Zap size={19} />
          </span>
          <div>
            <span>Electricity logged</span>
            <strong>{stats.electricity.toLocaleString('en-IN')} kWh</strong>
          </div>
        </article>

        <article className="rewards-stat">
          <span className="rewards-stat-icon rewards-stat-blue">
            <Droplets size={19} />
          </span>
          <div>
            <span>Water logged</span>
            <strong>{stats.water.toLocaleString('en-IN')} L</strong>
          </div>
        </article>

        <article className="rewards-stat">
          <span className="rewards-stat-icon rewards-stat-purple">
            <Recycle size={19} />
          </span>
          <div>
            <span>E-waste logged</span>
            <strong>{stats.ewaste.toLocaleString('en-IN')} kg</strong>
          </div>
        </article>
      </section>

      {nextMilestone ? (
        <section className="rewards-next">
          <span className="rewards-next-icon">
            <Target size={21} />
          </span>
          <div>
            <span className="rewards-next-label">YOUR NEXT MILESTONE</span>
            <h3>{nextMilestone.title}</h3>
            <p>{nextMilestone.requirement}</p>
          </div>
          <span className="rewards-next-count">
            {progress.count + 1}/{MILESTONES.length}
          </span>
        </section>
      ) : (
        <section className="rewards-complete">
          <Trophy size={23} />
          <div>
            <h3>All milestones unlocked!</h3>
            <p>
              Great work building your tracking habit. Keep recording new
              activity to maintain a useful sustainability history.
            </p>
          </div>
        </section>
      )}

      <section className="rewards-milestones-section">
        <div className="rewards-section-heading">
          <div>
            <span className="rewards-section-kicker">YOUR COLLECTION</span>
            <h3>Milestone badges</h3>
            <p>Badges unlock automatically when their requirements are met.</p>
          </div>
          <span className="rewards-badge-count">
            <Award size={16} />
            {progress.count}/{MILESTONES.length}
          </span>
        </div>

        <div className="rewards-badge-grid">
          {MILESTONES.map((milestone) => {
            const unlocked = milestone.check(records)
            const Icon = milestone.icon

            return (
              <article
                className={`rewards-badge-card ${unlocked ? 'is-unlocked' : 'is-locked'}`}
                key={milestone.id}
              >
                <div className="rewards-badge-top">
                  <span className="rewards-badge-icon">
                    <Icon size={25} />
                  </span>
                  <span
                    className={`rewards-badge-status ${unlocked ? 'status-unlocked' : 'status-locked'}`}
                  >
                    {unlocked ? (
                      <>
                        <CheckCircle2 size={13} />
                        Unlocked
                      </>
                    ) : (
                      <>
                        <LockKeyhole size={12} />
                        Locked
                      </>
                    )}
                  </span>
                </div>

                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>

                <div className="rewards-requirement">
                  <span>{unlocked ? 'Achievement complete' : 'How to unlock'}</span>
                  <strong>{milestone.requirement}</strong>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <footer className="rewards-note">
        <Leaf size={17} />
        <p>
          Rewards are based on records saved in this browser. They celebrate
          tracking activity, not verified reductions in emissions or resource
          consumption. Organization rewards are local to this browser and are
          not shared across team members or devices.
        </p>
      </footer>
    </div>
  )
}

