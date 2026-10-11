import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

import "./PromptStudio.css";
import "./Dashboard/Dashboard.css";

const navItems = [
  { label: "My tracker", path: "/dashboard", icon: FaHome },
  { label: "Eco tips", path: "/eco-tips", icon: FaLightbulb },
  {
    label: "Green Optimizer",
    path: "/green-optimizati",
    icon: FaLeaf,
  },
  {
    label: "Prompt studio",
    path: "/prompt-studio",
    icon: FaRobot,
    badge: "NEW",
  },
  { label: "Record", path: "/dashboard#usage", icon: FaList },
  { label: "Reports", path: "/reports", icon: FaCalendarAlt },
  { label: "Rewards", path: "/rewards", icon: FaTrophy },
  { label: "Profile", path: "/profile", icon: FaUser },
  { label: "Settings", path: "/settings", icon: FaCog },
];

function PromptStudio() {
  const location = useLocation();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState(
    "Can you please explain JavaScript arrays in a very detailed manner because I am completely new to programming?"
  );

  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [workspace, setWorkspace] = useState("Personal");

  const wordCount = prompt.trim()
    ? prompt.trim().split(/\s+/).length
    : 0;

  const userName =
    sessionStorage.getItem("userName") || "Sakshi Suman";

  const optimizePrompt = () => {
    if (!prompt.trim()) {
      setRefinedPrompt("");
      return;
    }

    setIsOptimizing(true);
    setRefinedPrompt("");
    setCopied(false);

    // Frontend demo only; no AI API is called.
    window.setTimeout(() => {
      const result = `
Act as an expert tutor who specializes in teaching beginners.

TASK:
${prompt.trim()}

GUIDELINES:
1. Assume I have no prior programming experience.
2. Explain each important concept in simple, beginner-friendly language.
3. Break the explanation into clear, logical steps.
4. Include practical JavaScript code examples.
5. Explain each example line by line.
6. Show common mistakes and how to avoid them.
7. Include practice exercises with answers.
8. Summarize the key takeaways at the end.

FORMAT:
Use clear headings, short paragraphs, code blocks, and examples.
Define unfamiliar technical terms before using them.
`;

      setRefinedPrompt(result.trim());
      setIsOptimizing(false);
    }, 700);
  };

  const copyPrompt = async () => {
    if (!refinedPrompt) return;

    try {
      await navigator.clipboard.writeText(refinedPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      window.alert(
        "Unable to copy automatically. Please select and copy the text."
      );
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="eco-dashboard prompt-studio-page">
      {/* Dashboard sidebar */}
      <aside className="eco-sidebar">
        <div className="eco-brand">
          <div className="eco-brand-icon">
            <FaLeaf />
          </div>

          <div>
            <h2>verdant.ai</h2>
            <span>Sustainability Workspace</span>
          </div>
        </div>

        <div className="workspace-toggle">
          <button
            type="button"
            className={`workspace-btn ${
              workspace === "Personal" ? "active" : ""
            }`}
            onClick={() => setWorkspace("Personal")}
          >
            Personal
          </button>

          <button
            type="button"
            className={`workspace-btn ${
              workspace === "Organization" ? "active" : ""
            }`}
            onClick={() => setWorkspace("Organization")}
          >
            Organization
          </button>
        </div>

        <nav className="eco-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.path === "/dashboard#usage"
                ? location.pathname === "/dashboard" &&
                  location.hash === "#usage"
                : location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={item.label}
                className={`eco-nav-link ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="eco-nav-icon">
                  <Icon />
                </span>

                <span>{item.label}</span>

                {item.badge && (
                  <span className="eco-nav-badge">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="eco-sidebar-bottom">
          <div className="eco-user">
            <div className="eco-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="eco-user-info">
              <strong>{userName}</strong>
              <span>{workspace} workspace</span>
            </div>
          </div>

          <button
            type="button"
            className="eco-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main workspace */}
      <main className="eco-main prompt-studio-main">
        <header className="ps-topbar">
          <div className="ps-breadcrumb">
            <span>Workspace</span>
            <span className="ps-chevron">›</span>
            <span className="current">Prompt Studio</span>
          </div>

          <div className="ps-topbar-right">
            <span className="ps-status-dot" />
            <span>Estimates active</span>
          </div>
        </header>

        <section className="ps-content">
          <div className="ps-heading-row">
            <div>
              <p className="ps-eyebrow">
                PROMPT STUDIO / BEFORE YOU SEND
              </p>

              <h1>
                Say it once.
                <br />
                <span>Say it clearly.</span>
              </h1>

              <p className="ps-subtitle">
                A sharper prompt can reduce back-and-forth and help
                models get to the point.
              </p>
            </div>

            <span className="ps-analysis-badge">
              LOCAL ANALYSIS
            </span>
          </div>

          <div className="ps-editor-grid">
            {/* Prompt editor */}
            <section className="ps-card ps-input-card">
              <div className="ps-card-top">
                <div>
                  <p className="ps-label">YOUR PROMPT</p>
                  <h2>What are you trying to ask?</h2>
                </div>

                <span className="ps-sparkle">✧</span>
              </div>

              <textarea
                className="ps-textarea"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Enter your prompt here..."
                aria-label="Your prompt"
              />

              <div className="ps-editor-footer">
                <span className="ps-word-count">
                  {wordCount} {wordCount === 1 ? "word" : "words"} ·
                  ready to refine
                </span>

                <button
                  className="ps-optimize-button"
                  type="button"
                  onClick={optimizePrompt}
                  disabled={isOptimizing || !prompt.trim()}
                >
                  <span>✧</span>
                  {isOptimizing
                    ? "Optimizing..."
                    : "Optimize prompt"}
                </button>
              </div>
            </section>

            {/* Refined result */}
            <section
              className="ps-card ps-result-card"
              aria-live="polite"
            >
              {!refinedPrompt && !isOptimizing ? (
                <div className="ps-empty-state">
                  <div className="ps-empty-icon">✧</div>

                  <h2>Your refined prompt will appear here.</h2>

                  <p>
                    We’ll look for repetition, filler, and opportunities
                    to make the expected output clearer.
                  </p>
                </div>
              ) : isOptimizing ? (
                <div className="ps-empty-state">
                  <div className="ps-loader" />

                  <h2>Refining your prompt...</h2>

                  <p>Improving clarity and structure.</p>
                </div>
              ) : (
                <div className="ps-result-content">
                  <div className="ps-result-header">
                    <div>
                      <p className="ps-label">REFINED PROMPT</p>
                      <h2>Ready to use</h2>
                    </div>

                    <span className="ps-result-check">✓</span>
                  </div>

                  <div className="ps-result-text">
                    {refinedPrompt}
                  </div>

                  <button
                    className="ps-copy-button"
                    type="button"
                    onClick={copyPrompt}
                  >
                    {copied
                      ? "✓ Copied!"
                      : "▣ Copy refined prompt"}
                  </button>
                </div>
              )}
            </section>
          </div>

          <p className="ps-disclaimer">
            <span>⚠</span>
            A shorter prompt does not guarantee proportional energy
            savings. All guidance and impact language here is estimated.
          </p>
        </section>
      </main>
    </div>
  );
}

export default PromptStudio;
