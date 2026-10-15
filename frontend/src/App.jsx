
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Leaf } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/dashboard';
import MyTracker from './pages/my-tracker';
import MyOrganization from './pages/my-organization';
import PromptOptimizer from './pages/prompt-optimizer';
import Reports from './pages/reports';
import Rewards from './pages/rewards';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Login from './pages/login';

import { auth } from './firebase';
import './App.css';

const pages = {
  dashboard: Dashboard,
  'my-tracker': MyTracker,
  'my-organization': MyOrganization,
  'prompt-optimizer': PromptOptimizer,
  reports: Reports,
  rewards: Rewards,
  profile: Profile,
  settings: Settings,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [workspace, setWorkspace] = useState('personal');
  const [activePage, setActivePage] = useState('dashboard');
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      (error) => {
        console.error('Authentication error:', error);
        setAuthLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  function navigate(page) {
    if (!pages[page]) return;

    setActivePage(page);

    if (page === 'my-tracker') {
      setWorkspace('personal');
    } else if (page === 'my-organization') {
      setWorkspace('organization');
    }
  }

  function changeWorkspace(nextWorkspace) {
    if (!['personal', 'organization'].includes(nextWorkspace)) {
      return;
    }

    setWorkspace(nextWorkspace);

    setActivePage(
      nextWorkspace === 'personal'
        ? 'my-tracker'
        : 'my-organization'
    );
  }

  async function handleLogout() {
    setLogoutError('');

    try {
      await signOut(auth);
      setActivePage('dashboard');
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError('Unable to sign out. Please try again.');
    }
  }

  if (authLoading) {
    return (
      <div className="auth-loading">
        <Leaf size={32} />
        <p>Preparing your EcoAI workspace...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const userName =
    user.displayName?.trim() ||
    (user.email?.split('@')[0] || 'EcoAI User')
      .replace(/[._-]+/g, ' ')
      .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

  const userInitials =
    userName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'U';

  const Page = pages[activePage] || Dashboard;

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        workspace={workspace}
        onNavigate={navigate}
        onWorkspaceChange={changeWorkspace}
        onLogout={handleLogout}
        userName={userName}
        userEmail={user.email}
        userPhoto={user.photoURL}
        userInitials={userInitials}
      />

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-account">
            <div className="topbar-user">
              <span className="topbar-user-copy">
                <strong>{userName}</strong>
              </span>
            </div>
          </div>
        </header>

        {logoutError && (
          <p className="logout-error" role="alert">
            {logoutError}
          </p>
        )}

        <section className="page-container" key={activePage}>
          <Page
            workspace={workspace}
            onNavigate={navigate}
            userEmail={user.email}
          />
        </section>

        <footer className="app-footer">
          <span>♧ EcoAI Sustainability Tracker</span>
          <span>Track thoughtfully. Act sustainably.</span>
        </footer>
      </main>
    </div>
  );
}
