// import React from "react";
// import {
//   FaThLarge,
//   FaChartLine,
//   FaFolder,
//   FaFileInvoice,
//   FaCog,
//   FaSearch,
//   FaBell,
//   FaCheckCircle,
//   FaClock,
//   FaPauseCircle,
//   FaPlus,
// } from "react-icons/fa";

// import "./Dashboard.css";

// export default function Dashboard({ onLogout }) {
//   return (
//     <div className="dashboard">

//       {/* SIDEBAR */}
//       <aside className="sidebar">

//         <div className="logo">
//           <div className="logo-icon">🌿</div>
//           <h2>GreenAI</h2>
//         </div>

//         <nav>
//           <div className="nav-item active">
//             <FaThLarge />
//             <span>Dashboard</span>
//           </div>

//           <div className="nav-item">
//             <FaChartLine />
//             <span>Analytics</span>
//           </div>

//           <div className="nav-item">
//             <FaFolder />
//             <span>Projects</span>
//           </div>

//           <div className="nav-item">
//             <FaFileInvoice />
//             <span>Invoices</span>
//           </div>

//           <div className="nav-item">
//             <FaCog />
//             <span>Settings</span>
//           </div>
//         </nav>

//         {/* PROFILE */}
//         <div className="sidebar-profile">
//           <div className="profile-avatar">JD</div>

//           <div>
//             <strong>John Doe</strong>
//             <small>Admin</small>
//           </div>
//         </div>

//       </aside>


//       {/* MAIN CONTENT */}
//       <main className="main-content">

//         {/* TOP HEADER */}
//         <header className="top-header">

//           <div>
//             <h1>Welcome to GreenAI</h1>
//             <p>Wednesday, July 30 · Here's what's happening</p>
//           </div>

//           <div className="header-right">

//             <div className="search-box">
//               <FaSearch />
//               <input
//                 type="text"
//                 placeholder="Search anything..."
//               />
//             </div>

//             <div className="notification">
//               <FaBell />
//               <span></span>
//             </div>

//           </div>

//         </header>


//         {/* STAT CARDS */}
//         <section className="stats-grid">

//           <div className="stat-card">
//             <div className="stat-top">
//               <div>
//                 <p>Total Revenue</p>
//                 <h2>$48,295</h2>
//                 <span className="positive">+12.5%</span>
//               </div>

//               <div className="stat-icon green">
//                 ●
//               </div>
//             </div>
//           </div>


//           <div className="stat-card">
//             <div className="stat-top">
//               <div>
//                 <p>Active Projects</p>
//                 <h2>24</h2>
//                 <span className="positive">+3 this month</span>
//               </div>

//               <div className="stat-icon blue">
//                 ●
//               </div>
//             </div>
//           </div>


//           <div className="stat-card">
//             <div className="stat-top">
//               <div>
//                 <p>Team Members</p>
//                 <h2>138</h2>
//                 <span className="positive">+8 onboarded</span>
//               </div>

//               <div className="stat-icon purple">
//                 ●
//               </div>
//             </div>
//           </div>


//           <div className="stat-card">
//             <div className="stat-top">
//               <div>
//                 <p>Completion Rate</p>
//                 <h2>87.4%</h2>
//                 <span className="negative">-2.1% vs last month</span>
//               </div>

//               <div className="stat-icon orange">
//                 ●
//               </div>
//             </div>
//           </div>

//         </section>


//         {/* CHART SECTION */}
//         <section className="middle-grid">

//           {/* REVENUE */}
//           <div className="dashboard-card revenue-card">

//             <div className="card-header">
//               <div>
//                 <h3>Monthly Revenue</h3>
//                 <p>Jan – Dec 2025</p>
//               </div>

//               <div className="chart-options">
//                 <span>1M</span>
//                 <span>3M</span>
//                 <span>6M</span>
//                 <span className="selected">1Y</span>
//               </div>
//             </div>


//             <div className="bar-chart">

//               <div className="bar" style={{ height: "35%" }}>
//                 <span>Jan</span>
//               </div>

//               <div className="bar" style={{ height: "50%" }}>
//                 <span>Feb</span>
//               </div>

//               <div className="bar" style={{ height: "42%" }}>
//                 <span>Mar</span>
//               </div>

//               <div className="bar" style={{ height: "65%" }}>
//                 <span>Apr</span>
//               </div>

//               <div className="bar" style={{ height: "70%" }}>
//                 <span>May</span>
//               </div>

//               <div className="bar" style={{ height: "78%" }}>
//                 <span>Jun</span>
//               </div>

//               <div className="bar" style={{ height: "70%" }}>
//                 <span>Jul</span>
//               </div>

//               <div className="bar" style={{ height: "85%" }}>
//                 <span>Aug</span>
//               </div>

//               <div className="bar" style={{ height: "62%" }}>
//                 <span>Sep</span>
//               </div>

//               <div className="bar" style={{ height: "75%" }}>
//                 <span>Oct</span>
//               </div>

//               <div className="bar" style={{ height: "55%" }}>
//                 <span>Nov</span>
//               </div>

//               <div className="bar current" style={{ height: "82%" }}>
//                 <span>Dec</span>
//               </div>

//             </div>

//           </div>


//           {/* TASK STATUS */}
//           <div className="dashboard-card task-card">

//             <div className="card-header">
//               <div>
//                 <h3>Task Status</h3>
//                 <p>All active projects</p>
//               </div>
//             </div>


//             <div className="task-content">

//               <div className="donut">
//                 <div className="donut-center">
//                   <strong>100</strong>
//                   <small>tasks</small>
//                 </div>
//               </div>


//               <div className="task-list">

//                 <div>
//                   <span className="dot completed"></span>
//                   Completed <strong>42%</strong>
//                 </div>

//                 <div>
//                   <span className="dot progress"></span>
//                   In Progress <strong>35%</strong>
//                 </div>

//                 <div>
//                   <span className="dot planning"></span>
//                   Planning <strong>15%</strong>
//                 </div>

//                 <div>
//                   <span className="dot hold"></span>
//                   On Hold <strong>8%</strong>
//                 </div>

//               </div>

//             </div>

//           </div>

//         </section>


//         {/* BOTTOM SECTION */}
//         <section className="bottom-grid">

//           {/* PROJECTS */}
//           <div className="dashboard-card projects-card">

//             <div className="card-title-row">
//               <h3>Active Projects</h3>
//               <button>View all →</button>
//             </div>


//             <div className="table-wrapper">

//               <table>

//                 <thead>
//                   <tr>
//                     <th>Project</th>
//                     <th>Progress</th>
//                     <th>Priority</th>
//                     <th>Due</th>
//                     <th>Team</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   <tr>
//                     <td>
//                       <strong>GreenAI Platform v2</strong>
//                       <small>Active</small>
//                     </td>

//                     <td>
//                       <div className="progress-row">
//                         <div className="progress-bar">
//                           <span style={{ width: "78%" }}></span>
//                         </div>
//                         78%
//                       </div>
//                     </td>

//                     <td>
//                       <span className="priority high">High</span>
//                     </td>

//                     <td>Aug 15</td>

//                     <td>
//                       <div className="team">
//                         <span>J</span>
//                         <span>A</span>
//                         <span>M</span>
//                       </div>
//                     </td>
//                   </tr>


//                   <tr>
//                     <td>
//                       <strong>Eco Analytics Dashboard</strong>
//                       <small>Active</small>
//                     </td>

//                     <td>
//                       <div className="progress-row">
//                         <div className="progress-bar">
//                           <span style={{ width: "45%" }}></span>
//                         </div>
//                         45%
//                       </div>
//                     </td>

//                     <td>
//                       <span className="priority medium">Medium</span>
//                     </td>

//                     <td>Sep 2</td>

//                     <td>
//                       <div className="team">
//                         <span>R</span>
//                         <span>T</span>
//                       </div>
//                     </td>
//                   </tr>


//                   <tr>
//                     <td>
//                       <strong>Carbon Offset Tracker</strong>
//                       <small>Review</small>
//                     </td>

//                     <td>
//                       <div className="progress-row">
//                         <div className="progress-bar">
//                           <span style={{ width: "92%" }}></span>
//                         </div>
//                         92%
//                       </div>
//                     </td>

//                     <td>
//                       <span className="priority high">High</span>
//                     </td>

//                     <td>Jul 31</td>

//                     <td>
//                       <div className="team">
//                         <span>J</span>
//                         <span>S</span>
//                         <span>K</span>
//                       </div>
//                     </td>
//                   </tr>


//                   <tr>
//                     <td>
//                       <strong>Sustainability Report Q3</strong>
//                       <small>Active</small>
//                     </td>

//                     <td>
//                       <div className="progress-row">
//                         <div className="progress-bar">
//                           <span style={{ width: "60%" }}></span>
//                         </div>
//                         60%
//                       </div>
//                     </td>

//                     <td>
//                       <span className="priority low">Low</span>
//                     </td>

//                     <td>Sep 30</td>

//                     <td>
//                       <div className="team">
//                         <span>M</span>
//                         <span>T</span>
//                       </div>
//                     </td>
//                   </tr>

//                 </tbody>

//               </table>

//             </div>

//           </div>


//           {/* RECENT ACTIVITY */}
//           <div className="dashboard-card activity-card">

//             <h3>Recent Activity</h3>

//             <div className="activity">

//               <div className="activity-icon blue-bg">
//                 AL
//               </div>

//               <div>
//                 <p>
//                   <strong>Alice Lee</strong> completed milestone
//                 </p>
//                 <span>
//                   GreenAI v2 beta
//                 </span>
//                 <small>2 min ago</small>
//               </div>

//             </div>


//             <div className="activity">

//               <div className="activity-icon green-bg">
//                 MK
//               </div>

//               <div>
//                 <p>
//                   <strong>Mark Kim</strong> pushed commit to
//                 </p>
//                 <span>Carbon Tracker</span>
//                 <small>18 min ago</small>
//               </div>

//             </div>


//             <div className="activity">

//               <div className="activity-icon purple-bg">
//                 RB
//               </div>

//               <div>
//                 <p>
//                   <strong>Rachel Brown</strong> commented on
//                 </p>
//                 <span>Eco Analytics</span>
//                 <small>1 hr ago</small>
//               </div>

//             </div>


//             <div className="activity">

//               <div className="activity-icon orange-bg">
//                 TN
//               </div>

//               <div>
//                 <p>
//                   <strong>Tom Nguyen</strong> created task in
//                 </p>
//                 <span>Smart Grid</span>
//                 <small>3 hr ago</small>
//               </div>

//             </div>


//             <div className="activity">

//               <div className="activity-icon cyan-bg">
//                 SF
//               </div>

//               <div>
//                 <p>
//                   <strong>Sara Fox</strong> reviewed PR for
//                 </p>
//                 <span>Carbon Tracker</span>
//                 <small>5 hr ago</small>
//               </div>

//             </div>

//           </div>

//         </section>


//         {/* LOGOUT */}
//         <button className="logout-button" onClick={onLogout}>
//           Logout
//         </button>

//       </main>

//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaChartLine,
  FaFolder,
  FaFileInvoice,
  FaCog,
  FaSearch,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaPauseCircle,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const userEmail =
    sessionStorage.getItem("userEmail") || "User";

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");

    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">🌿</div>
          <h2>GreenAI</h2>
        </div>

        <nav>

          <div className="nav-item active">
            <FaThLarge />
            <span>Dashboard</span>
          </div>

          <div className="nav-item">
            <FaChartLine />
            <span>Analytics</span>
          </div>

          <div className="nav-item">
            <FaFolder />
            <span>Projects</span>
          </div>

          <div className="nav-item">
            <FaFileInvoice />
            <span>Reports</span>
          </div>

          <div className="nav-item">
            <FaCog />
            <span>Settings</span>
          </div>

        </nav>

        {/* PROFILE */}
        <div className="sidebar-profile">

          <div className="profile-avatar">
            {userEmail.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{userEmail}</strong>
            <small>GreenAI User</small>
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* HEADER */}
        <header className="top-header">

          <div>
            <h1>Welcome to GreenAI 🌿</h1>

            <p>
              Here's what's happening with your projects
            </p>
          </div>

          <div className="header-right">

            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search anything..."
              />
            </div>

            <div className="notification">
              <FaBell />
              <span></span>
            </div>

          </div>

        </header>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-top">

              <div>
                <p>Total Projects</p>
                <h2>24</h2>
                <span className="positive">
                  +3 this month
                </span>
              </div>

              <div className="stat-icon green">
                <FaFolder />
              </div>

            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">

              <div>
                <p>Completed</p>
                <h2>18</h2>
                <span className="positive">
                  +12.5%
                </span>
              </div>

              <div className="stat-icon blue">
                <FaCheckCircle />
              </div>

            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">

              <div>
                <p>In Progress</p>
                <h2>4</h2>
                <span className="positive">
                  Active
                </span>
              </div>

              <div className="stat-icon purple">
                <FaClock />
              </div>

            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">

              <div>
                <p>On Hold</p>
                <h2>2</h2>
                <span className="negative">
                  Needs attention
                </span>
              </div>

              <div className="stat-icon orange">
                <FaPauseCircle />
              </div>

            </div>
          </div>

        </section>

        {/* MIDDLE SECTION */}
        <section className="middle-grid">

          {/* REVENUE */}
          <div className="dashboard-card revenue-card">

            <div className="card-header">

              <div>
                <h3>Project Progress</h3>
                <p>Current project performance</p>
              </div>

              <div className="chart-options">
                <span>1M</span>
                <span>3M</span>
                <span className="selected">6M</span>
                <span>1Y</span>
              </div>

            </div>

            <div className="bar-chart">

              <div className="bar" style={{ height: "40%" }}>
                <span>Jan</span>
              </div>

              <div className="bar" style={{ height: "55%" }}>
                <span>Feb</span>
              </div>

              <div className="bar" style={{ height: "48%" }}>
                <span>Mar</span>
              </div>

              <div className="bar" style={{ height: "70%" }}>
                <span>Apr</span>
              </div>

              <div className="bar" style={{ height: "80%" }}>
                <span>May</span>
              </div>

              <div className="bar current" style={{ height: "90%" }}>
                <span>Jun</span>
              </div>

            </div>

          </div>

          {/* TASK STATUS */}
          <div className="dashboard-card task-card">

            <div className="card-header">
              <div>
                <h3>Task Status</h3>
                <p>All active projects</p>
              </div>
            </div>

            <div className="task-list">

              <div>
                <span className="dot completed"></span>
                Completed
                <strong>42%</strong>
              </div>

              <div>
                <span className="dot progress"></span>
                In Progress
                <strong>35%</strong>
              </div>

              <div>
                <span className="dot planning"></span>
                Planning
                <strong>15%</strong>
              </div>

              <div>
                <span className="dot hold"></span>
                On Hold
                <strong>8%</strong>
              </div>

            </div>

          </div>

        </section>

        {/* PROJECTS */}
        <section className="bottom-grid">

          <div className="dashboard-card projects-card">

            <div className="card-title-row">

              <h3>Active Projects</h3>

              <button>
                View all →
              </button>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Progress</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>
                      <strong>GreenAI Platform</strong>
                      <small>Active</small>
                    </td>

                    <td>
                      78%
                    </td>

                    <td>
                      <span className="priority high">
                        High
                      </span>
                    </td>

                    <td>
                      Active
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Eco Analytics</strong>
                      <small>Active</small>
                    </td>

                    <td>
                      65%
                    </td>

                    <td>
                      <span className="priority medium">
                        Medium
                      </span>
                    </td>

                    <td>
                      In Progress
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Carbon Tracker</strong>
                      <small>Review</small>
                    </td>

                    <td>
                      92%
                    </td>

                    <td>
                      <span className="priority high">
                        High
                      </span>
                    </td>

                    <td>
                      Review
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* LOGOUT */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </main>

    </div>
  );
}

export default Dashboard;
