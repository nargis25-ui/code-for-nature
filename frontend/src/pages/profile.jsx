// import { useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import {
//   FaLeaf,
//   FaHome,
//   FaList,
//   FaCalendarAlt,
//   FaTrophy,
//   FaLightbulb,
//   FaUser,
//   FaCog,
//   FaBolt,
//   FaTint,
//   FaIndustry,
//   FaRobot,
//   FaSeedling,
//   FaWater,
//   FaEdit,
//   FaSignOutAlt,
//   FaCheckCircle,
// } from "react-icons/fa";

// import "./Profile.css";
// import "./Dashboard/Dashboard.css";

// export default function Profile() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [name, setName] = useState("Nargiz Hamidova");
//   const [email, setEmail] = useState("nargiz@greenai.io");
//   const [editing, setEditing] = useState(false);
//   const [workspace, setWorkspace] = useState("personal");

//   const userEmail =
//     sessionStorage.getItem("userEmail") || email;

//   const navItems = [
//     {
//       label: "My tracker",
//       path: "/dashboard",
//       icon: <FaHome />,
//     },
//     {
//       label: "Eco tips",
//       path: "/eco-tips",
//       icon: <FaLightbulb />,
//     },
//     {
//       label: "Green Optimizer",
//       path: "/green-Optimizer",
//       icon: <FaLeaf />,
//     },
//     {
//       label: "Prompt studio",
//       path: "/prompt-studio",
//       icon: <FaRobot />,
//       badge: "NEW",
//     },
//     {
//       label: "Record",
//       path: "/dashboard#usage",
//       icon: <FaList />,
//     },
//     {
//       label: "Reports",
//       path: "/reports",
//       icon: <FaCalendarAlt />,
//     },
//     {
//       label: "Rewards",
//       path: "/rewards",
//       icon: <FaTrophy />,
//     },
//     {
//       label: "Profile",
//       path: "/profile",
//       icon: <FaUser />,
//     },
//     {
//       label: "Settings",
//       path: "/settings",
//       icon: <FaCog />,
//     },
//   ];

//   function isActive(item) {
//     if (item.path === "/dashboard#usage") {
//       return (
//         location.pathname === "/dashboard" &&
//         location.hash === "#usage"
//       );
//     }

//     if (item.path === "/dashboard") {
//       return (
//         location.pathname === "/dashboard" &&
//         location.hash !== "#usage"
//       );
//     }

//     return location.pathname === item.path;
//   }

//   const achievements = [
//     { icon: <FaSeedling />, title: "First Steps", date: "Jul 1" },
//     { icon: <FaLeaf />, title: "Green Beginner", date: "Jul 5" },
//     { icon: <FaBolt />, title: "Energy Saver", date: "Jul 12" },
//     { icon: <FaTint />, title: "Water Guardian", date: "Jul 18" },
//     { icon: <FaIndustry />, title: "Carbon Fighter", date: "Jul 22" },
//   ];

//   const activities = [
//     {
//       icon: <FaRobot />,
//       title: "Completed 30 AI queries",
//       date: "Today · 2:34 PM",
//       points: "+150g CO₂",
//     },
//     {
//       icon: <FaTrophy />,
//       title: "Earned Carbon Fighter badge",
//       date: "Jul 22 · 10:15 AM",
//       points: "+50 pts",
//     },
//     {
//       icon: <FaBolt />,
//       title: "Used Green Mode for 5 sessions",
//       date: "Jul 21 · 4:00 PM",
//       points: "−30g CO₂",
//     },
//     {
//       icon: <FaWater />,
//       title: "Kept water usage under 1L",
//       date: "Jul 20 · 11:59 PM",
//       points: "+40 pts",
//     },
//     {
//       icon: <FaLeaf />,
//       title: "Sustainability score reached 92%",
//       date: "Jul 18 · 9:00 AM",
//       points: <FaCheckCircle />,
//     },
//   ];

//   function saveProfile(event) {
//     event.preventDefault();
//     setEditing(false);
//   }

//   function logout() {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     navigate("/login");
//   }

//   return (
//     <div className="profile-layout eco-dashboard">
//       {/* COMMON DASHBOARD SIDEBAR */}
//       <aside className="eco-sidebar">
//         <div className="eco-brand">
//           <div className="eco-brand-icon">
//             <FaLeaf />
//           </div>

//           <div>
//             <h2>verdant.ai</h2>
//             <p>Sustainability Workspace</p>
//           </div>
//         </div>

//         {/* Workspace Toggle */}
//         <div className="workspace-toggle">
//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "personal" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("personal")}
//           >
//             Personal
//           </button>

//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "organization" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("organization")}
//           >
//             Organization
//           </button>
//         </div>

//         {/* Navigation Buttons */}
//         <nav className="eco-nav">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               className={`eco-nav-link ${
//                 isActive(item) ? "active" : ""
//               }`}
//             >
//               <span className="eco-nav-icon">
//                 {item.icon}
//               </span>

//               <span>{item.label}</span>

//               {item.badge && (
//                 <span className="eco-nav-badge">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </nav>

//         {/* Sidebar User */}
//         <div className="eco-sidebar-bottom">
//           <div className="eco-user">
//             <div className="eco-avatar">
//               {name.charAt(0).toUpperCase()}
//             </div>

//             <div className="eco-user-info">
//               <strong>{name.split(" ")[0]}</strong>
//               <span>{userEmail}</span>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="eco-logout"
//             onClick={logout}
//           >
//             <FaSignOutAlt />
//             <span>Log out</span>
//           </button>
//         </div>
//       </aside>

//       {/* PROFILE MAIN CONTENT */}
//       <main className="profile-main eco-main">
//         <header className="profile-header">
//           <div>
//             <h2>Profile</h2>
//             <p>
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </p>
//           </div>

//           <div className="profile-header-user">
//             <div className="small-avatar">
//               {name.charAt(0).toUpperCase()}
//             </div>

//             <div>
//               <strong>{name.split(" ")[0]}</strong>
//               <p>Eco Member</p>
//             </div>
//           </div>
//         </header>

//         <section className="profile-content">
//           <h1>My Profile</h1>

//           <div className="profile-grid">
//             {/* PROFILE CARD */}
//             <section className="profile-card">
//               <div className="large-avatar">
//                 {name.charAt(0).toUpperCase()}
//               </div>

//               {editing ? (
//                 <form
//                   className="profile-edit-form"
//                   onSubmit={saveProfile}
//                 >
//                   <label htmlFor="profile-name">
//                     Full Name
//                   </label>

//                   <input
//                     id="profile-name"
//                     value={name}
//                     onChange={(event) =>
//                       setName(event.target.value)
//                     }
//                     required
//                   />

//                   <label htmlFor="profile-email">
//                     Email
//                   </label>

//                   <input
//                     id="profile-email"
//                     type="email"
//                     value={email}
//                     onChange={(event) =>
//                       setEmail(event.target.value)
//                     }
//                     required
//                   />

//                   <button
//                     className="save-profile-btn"
//                     type="submit"
//                   >
//                     Save Changes
//                   </button>

//                   <button
//                     className="cancel-profile-btn"
//                     type="button"
//                     onClick={() => setEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               ) : (
//                 <>
//                   <h2 className="profile-person-name">
//                     {name}
//                   </h2>

//                   <p className="profile-email">{email}</p>

//                   <span className="member-badge">
//                     <FaLeaf /> Eco Member
//                   </span>
//                 </>
//               )}

//               <div className="profile-stats">
//                 <div className="profile-stat">
//                   <strong>1,200</strong>
//                   <span>Eco Points</span>
//                 </div>

//                 <div className="profile-stat">
//                   <strong>14 days</strong>
//                   <span>Streak</span>
//                 </div>

//                 <div className="profile-stat">
//                   <strong>5</strong>
//                   <span>Badges</span>
//                 </div>

//                 <div className="profile-stat">
//                   <strong>#4</strong>
//                   <span>Rank</span>
//                 </div>
//               </div>

//               {!editing && (
//                 <button
//                   className="edit-profile-btn"
//                   onClick={() => setEditing(true)}
//                 >
//                   <FaEdit /> Edit Profile
//                 </button>
//               )}

//               <button
//                 className="logout-profile-btn"
//                 onClick={logout}
//               >
//                 <FaSignOutAlt /> Logout
//               </button>
//             </section>

//             {/* RIGHT COLUMN */}
//             <div className="profile-right-column">
//               <section className="score-card">
//                 <div className="score-circle">
//                   <div className="score-circle-inner">
//                     <strong>92%</strong>
//                     <span>Score</span>
//                   </div>
//                 </div>

//                 <div className="score-info">
//                   <h3>AI Sustainability Score</h3>

//                   <p>
//                     Your score reflects how sustainably you use
//                     AI tools. Keep up the great work!
//                   </p>

//                   <div className="score-badges">
//                     <span className="excellent-badge">
//                       Excellent
//                     </span>

//                     <span className="top-badge">
//                       Top 10%
//                     </span>
//                   </div>
//                 </div>
//               </section>

//               {/* ACHIEVEMENTS */}
//               <section className="achievement-card">
//                 <h3>Recent Achievements</h3>

//                 <div className="achievement-list">
//                   {achievements.map((item) => (
//                     <div
//                       className="achievement-item"
//                       key={item.title}
//                     >
//                       <span className="achievement-icon">
//                         {item.icon}
//                       </span>

//                       <div>
//                         <strong>{item.title}</strong>
//                         <span>{item.date}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               {/* RECENT ACTIVITY */}
//               <section className="activity-card">
//                 <h3>Recent Activity</h3>

//                 <div className="activity-list">
//                   {activities.map((item) => (
//                     <div
//                       className="activity-item"
//                       key={item.title}
//                     >
//                       <div className="activity-icon">
//                         {item.icon}
//                       </div>

//                       <div className="activity-description">
//                         <strong>{item.title}</strong>
//                         <span>{item.date}</span>
//                       </div>

//                       <span className="activity-points">
//                         {item.points}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

import { useState } from 'react'
import {
  UserRound,
  Mail,
  BriefcaseBusiness,
  Building2,
  FileText,
  Save,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'
import { auth } from '../firebase'
import './profile.css'

const PROFILE_KEY = 'ecoai-user-profile-v1'

const EMPTY_PROFILE = {
  name: '',
  role: '',
  organization: '',
  bio: '',
}

function readProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY)
    const parsed = saved ? JSON.parse(saved) : {}
    return { ...EMPTY_PROFILE, ...parsed }
  } catch {
    return { ...EMPTY_PROFILE }
  }
}

export default function Profile({ workspace = 'personal' }) {
  const user = auth?.currentUser
  const [profile, setProfile] = useState(() => {
  const saved = readProfile()
  const user = auth?.currentUser

  if (!saved.name && user?.displayName) {
    saved.name = user.displayName
  }

  return saved
})

  const [savedProfile, setSavedProfile] = useState(readProfile)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const email = user?.email || 'No signed-in email available'
  const initials = (profile.name || user?.displayName || 'EcoAI')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')

  function updateField(event) {
    const { name, value } = event.target

    setProfile((previous) => ({ ...previous, [name]: value }))
    setMessage('')
    setError('')
  }

  function saveProfile(event) {
    event.preventDefault()

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
      setSavedProfile({ ...profile })
      setMessage('Your profile has been saved on this browser.')
      setError('')
    } catch {
      setError('Unable to save your profile. Check browser storage settings.')
      setMessage('')
    }
  }

  function resetChanges() {
    setProfile({ ...savedProfile })
    setMessage('Unsaved changes have been discarded.')
    setError('')
  }

  return (
    <div className="profile-page">
      <header className="profile-intro">
        <span className="profile-eyebrow">ECOAI / ACCOUNT</span>
        <h2>My Profile</h2>
        <p>
          Manage your details and tell your team a little about your work
          on sustainability.
        </p>
      </header>

      <section className="profile-overview">
        <div className="profile-avatar" aria-label="Profile initials">
          {initials || 'E'}
        </div>

        <div className="profile-overview-copy">
          <span className="profile-workspace-label">
            {workspace === 'organization'
              ? 'ORGANIZATION WORKSPACE'
              : 'PERSONAL WORKSPACE'}
          </span>
          <h3>{profile.name.trim() || user?.displayName || 'Your name'}</h3>
          <p>{email}</p>
          <span className="profile-account-status">
            <ShieldCheck size={14} />
            {user ? 'Signed in with Firebase' : 'Profile stored locally'}
          </span>
        </div>
      </section>

      <div className="profile-content-grid">
        <section className="profile-form-card">
          <div className="profile-card-heading">
            <span className="profile-heading-icon">
              <UserRound size={19} />
            </span>
            <div>
              <h3>Personal information</h3>
              <p>Update the details shown on your profile.</p>
            </div>
          </div>

          <form onSubmit={saveProfile}>
            <label className="profile-field">
              Full name
              <span className="profile-input-wrap">
                <UserRound size={16} />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={updateField}
                  placeholder="Enter your name"
                  maxLength={100}
                />
              </span>
            </label>

            <label className="profile-field">
              Email address
              <span className="profile-input-wrap profile-readonly">
                <Mail size={16} />
                <input type="email" value={user?.email || ''} readOnly />
              </span>
              <small>
                Email is provided by your sign-in account and cannot be
                changed here.
              </small>
            </label>

            <label className="profile-field">
              Role or designation
              <span className="profile-input-wrap">
                <BriefcaseBusiness size={16} />
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={updateField}
                  placeholder="e.g. Student, Team Lead"
                  maxLength={100}
                />
              </span>
            </label>

            <label className="profile-field">
              Organization or institution
              <span className="profile-input-wrap">
                <Building2 size={16} />
                <input
                  type="text"
                  name="organization"
                  value={profile.organization}
                  onChange={updateField}
                  placeholder="Enter organization name"
                  maxLength={150}
                />
              </span>
            </label>

            <label className="profile-field">
              About me
              <span className="profile-textarea-wrap">
                <FileText size={16} />
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={updateField}
                  placeholder="Share your interests or sustainability goals..."
                  rows={4}
                  maxLength={500}
                />
              </span>
              <small>{profile.bio.length}/500 characters</small>
            </label>

            <div className="profile-form-actions">
              <button className="profile-save-button" type="submit">
                <Save size={16} />
                Save profile
              </button>
              <button
                className="profile-reset-button"
                type="button"
                onClick={resetChanges}
              >
                <RotateCcw size={15} />
                Discard changes
              </button>
            </div>

            {message && (
              <p className="profile-success" role="status">
                <CheckCircle2 size={16} />
                {message}
              </p>
            )}

            {error && (
              <p className="profile-error" role="alert">
                {error}
              </p>
            )}
          </form>
        </section>

        <aside className="profile-side-column">
          <section className="profile-info-card">
            <span className="profile-info-icon">
              <ShieldCheck size={20} />
            </span>
            <h3>Your account</h3>
            <p>
              {user
                ? 'Your email is supplied by Firebase Authentication. Profile fields are saved separately in this browser.'
                : 'No Firebase user is currently available. You can still save profile details locally in this browser.'}
            </p>
          </section>

          <section className="profile-info-card profile-tips-card">
            <span className="profile-info-icon">
              <UserRound size={20} />
            </span>
            <h3>Make it yours</h3>
            <ul>
              <li>Add your name so your profile is easy to recognize.</li>
              <li>Include your role or institution if it is relevant.</li>
              <li>Share a short description of your sustainability interests.</li>
            </ul>
          </section>

          <section className="profile-storage-note">
            <strong>Storage note</strong>
            <p>
              Profile edits are stored in this browser only. They are not
              automatically synchronized to another device or shared with
              other organization members.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
