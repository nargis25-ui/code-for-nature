// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaLeaf,
//   FaHome,
//   FaList,
//   FaCalendarAlt,
//   FaTrophy,
//   FaLightbulb,
//   FaUser,
//   FaCog,
//   FaRobot,
//   FaSignOutAlt,
// } from "react-icons/fa";

// import "./PromptStudio.css";
// import "./Dashboard/Dashboard.css";

// const navItems = [
//   { label: "My tracker", path: "/dashboard", icon: FaHome },
//   { label: "Eco tips", path: "/eco-tips", icon: FaLightbulb },
//   {
//     label: "Green Optimizer",
//     path: "/green-optimizati",
//     icon: FaLeaf,
//   },
//   {
//     label: "Prompt studio",
//     path: "/prompt-studio",
//     icon: FaRobot,
//     badge: "NEW",
//   },
//   { label: "Record", path: "/dashboard#usage", icon: FaList },
//   { label: "Reports", path: "/reports", icon: FaCalendarAlt },
//   { label: "Rewards", path: "/rewards", icon: FaTrophy },
//   { label: "Profile", path: "/profile", icon: FaUser },
//   { label: "Settings", path: "/settings", icon: FaCog },
// ];

// function PromptStudio() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [prompt, setPrompt] = useState(
//     "Can you please explain JavaScript arrays in a very detailed manner because I am completely new to programming?"
//   );

//   const [refinedPrompt, setRefinedPrompt] = useState("");
//   const [isOptimizing, setIsOptimizing] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [workspace, setWorkspace] = useState("Personal");

//   const wordCount = prompt.trim()
//     ? prompt.trim().split(/\s+/).length
//     : 0;

//   const userName =
//     sessionStorage.getItem("userName") || "Sakshi Suman";

//   const optimizePrompt = () => {
//     if (!prompt.trim()) {
//       setRefinedPrompt("");
//       return;
//     }

//     setIsOptimizing(true);
//     setRefinedPrompt("");
//     setCopied(false);

//     // Frontend demo only; no AI API is called.
//     window.setTimeout(() => {
//       const result = `
// Act as an expert tutor who specializes in teaching beginners.

// TASK:
// ${prompt.trim()}

// GUIDELINES:
// 1. Assume I have no prior programming experience.
// 2. Explain each important concept in simple, beginner-friendly language.
// 3. Break the explanation into clear, logical steps.
// 4. Include practical JavaScript code examples.
// 5. Explain each example line by line.
// 6. Show common mistakes and how to avoid them.
// 7. Include practice exercises with answers.
// 8. Summarize the key takeaways at the end.

// FORMAT:
// Use clear headings, short paragraphs, code blocks, and examples.
// Define unfamiliar technical terms before using them.
// `;

//       setRefinedPrompt(result.trim());
//       setIsOptimizing(false);
//     }, 700);
//   };

//   const copyPrompt = async () => {
//     if (!refinedPrompt) return;

//     try {
//       await navigator.clipboard.writeText(refinedPrompt);
//       setCopied(true);
//       window.setTimeout(() => setCopied(false), 1800);
//     } catch {
//       setCopied(false);
//       window.alert(
//         "Unable to copy automatically. Please select and copy the text."
//       );
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("userName");
//     navigate("/login");
//   };

//   return (
//     <div className="eco-dashboard prompt-studio-page">
//       {/* Dashboard sidebar */}
//       <aside className="eco-sidebar">
//         <div className="eco-brand">
//           <div className="eco-brand-icon">
//             <FaLeaf />
//           </div>

//           <div>
//             <h2>verdant.ai</h2>
//             <span>Sustainability Workspace</span>
//           </div>
//         </div>

//         <div className="workspace-toggle">
//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "Personal" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("Personal")}
//           >
//             Personal
//           </button>

//           <button
//             type="button"
//             className={`workspace-btn ${
//               workspace === "Organization" ? "active" : ""
//             }`}
//             onClick={() => setWorkspace("Organization")}
//           >
//             Organization
//           </button>
//         </div>

//         <nav className="eco-nav">
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             const isActive =
//               item.path === "/dashboard#usage"
//                 ? location.pathname === "/dashboard" &&
//                   location.hash === "#usage"
//                 : location.pathname === item.path;

//             return (
//               <Link
//                 to={item.path}
//                 key={item.label}
//                 className={`eco-nav-link ${
//                   isActive ? "active" : ""
//                 }`}
//               >
//                 <span className="eco-nav-icon">
//                   <Icon />
//                 </span>

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
//               {userName.charAt(0).toUpperCase()}
//             </div>

//             <div className="eco-user-info">
//               <strong>{userName}</strong>
//               <span>{workspace} workspace</span>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="eco-logout"
//             onClick={handleLogout}
//           >
//             <FaSignOutAlt />
//             <span>Log out</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main workspace */}
//       <main className="eco-main prompt-studio-main">
//         <header className="ps-topbar">
//           <div className="ps-breadcrumb">
//             <span>Workspace</span>
//             <span className="ps-chevron">›</span>
//             <span className="current">Prompt Studio</span>
//           </div>

//           <div className="ps-topbar-right">
//             <span className="ps-status-dot" />
//             <span>Estimates active</span>
//           </div>
//         </header>

//         <section className="ps-content">
//           <div className="ps-heading-row">
//             <div>
//               <p className="ps-eyebrow">
//                 PROMPT STUDIO / BEFORE YOU SEND
//               </p>

//               <h1>
//                 Say it once.
//                 <br />
//                 <span>Say it clearly.</span>
//               </h1>

//               <p className="ps-subtitle">
//                 A sharper prompt can reduce back-and-forth and help
//                 models get to the point.
//               </p>
//             </div>

//             <span className="ps-analysis-badge">
//               LOCAL ANALYSIS
//             </span>
//           </div>

//           <div className="ps-editor-grid">
//             {/* Prompt editor */}
//             <section className="ps-card ps-input-card">
//               <div className="ps-card-top">
//                 <div>
//                   <p className="ps-label">YOUR PROMPT</p>
//                   <h2>What are you trying to ask?</h2>
//                 </div>

//                 <span className="ps-sparkle">✧</span>
//               </div>

//               <textarea
//                 className="ps-textarea"
//                 value={prompt}
//                 onChange={(event) => setPrompt(event.target.value)}
//                 placeholder="Enter your prompt here..."
//                 aria-label="Your prompt"
//               />

//               <div className="ps-editor-footer">
//                 <span className="ps-word-count">
//                   {wordCount} {wordCount === 1 ? "word" : "words"} ·
//                   ready to refine
//                 </span>

//                 <button
//                   className="ps-optimize-button"
//                   type="button"
//                   onClick={optimizePrompt}
//                   disabled={isOptimizing || !prompt.trim()}
//                 >
//                   <span>✧</span>
//                   {isOptimizing
//                     ? "Optimizing..."
//                     : "Optimize prompt"}
//                 </button>
//               </div>
//             </section>

//             {/* Refined result */}
//             <section
//               className="ps-card ps-result-card"
//               aria-live="polite"
//             >
//               {!refinedPrompt && !isOptimizing ? (
//                 <div className="ps-empty-state">
//                   <div className="ps-empty-icon">✧</div>

//                   <h2>Your refined prompt will appear here.</h2>

//                   <p>
//                     We’ll look for repetition, filler, and opportunities
//                     to make the expected output clearer.
//                   </p>
//                 </div>
//               ) : isOptimizing ? (
//                 <div className="ps-empty-state">
//                   <div className="ps-loader" />

//                   <h2>Refining your prompt...</h2>

//                   <p>Improving clarity and structure.</p>
//                 </div>
//               ) : (
//                 <div className="ps-result-content">
//                   <div className="ps-result-header">
//                     <div>
//                       <p className="ps-label">REFINED PROMPT</p>
//                       <h2>Ready to use</h2>
//                     </div>

//                     <span className="ps-result-check">✓</span>
//                   </div>

//                   <div className="ps-result-text">
//                     {refinedPrompt}
//                   </div>

//                   <button
//                     className="ps-copy-button"
//                     type="button"
//                     onClick={copyPrompt}
//                   >
//                     {copied
//                       ? "✓ Copied!"
//                       : "▣ Copy refined prompt"}
//                   </button>
//                 </div>
//               )}
//             </section>
//           </div>

//           <p className="ps-disclaimer">
//             <span>⚠</span>
//             A shorter prompt does not guarantee proportional energy
//             savings. All guidance and impact language here is estimated.
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default PromptStudio;

import { useState } from 'react'
import {
  Sparkles,
  Copy,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  FileText,
  Zap,
  MessageSquareText,
} from 'lucide-react'
import { createOptimizedPrompt } from '../utils/prompt-optimizer'
import './prompt-optimizer.css'

export default function PromptOptimizer() {
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [format, setFormat] = useState('Step-by-step guide')
  const [length, setLength] = useState('Medium')
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [generatedResult, setGeneratedResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const wordCount = prompt.trim()
    ? prompt.trim().split(/\s+/).length
    : 0

  const suggestions = []

  if (wordCount > 0 && wordCount < 8) {
    suggestions.push(
      'Add more detail about the specific task or question.',
    )
  }

  if (prompt.trim() && !context.trim()) {
    suggestions.push(
      'Add relevant background information when the task needs it.',
    )
  }

  if (
    prompt.trim() &&
    !/\b(format|table|bullet|list|paragraph|steps|json|report)\b/i.test(prompt)
  ) {
    suggestions.push(
      'Specify the format you want to receive.',
    )
  }

  if (
    prompt.trim() &&
    !/\b(for|audience|student|beginner|expert|team|customer)\b/i.test(prompt)
  ) {
    suggestions.push(
      'Mention who the response is intended for.',
    )
  }

  function optimizePrompt(event) {
    event.preventDefault()
    setNotice('')
    setError('')

    const task = prompt.trim()

    if (!task) {
      setError('Enter your original prompt first.')
      setOptimizedPrompt('')
      return
    }

    setOptimizedPrompt(
      createOptimizedPrompt(task, context.trim(), format, length),
    )
    setGeneratedResult('')
  }

  async function generateResult() {
    const task = prompt.trim()
    setError('')
    setNotice('')
    setGeneratedResult('')

    if (!task) {
      setError('Enter your prompt first to generate a result.')
      return
    }

    const promptToSend = createOptimizedPrompt(
      task,
      context.trim(),
      format,
      length,
    )

    setOptimizedPrompt(promptToSend)
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Could not generate a result.')
      }

      if (typeof payload.result !== 'string' || !payload.result.trim()) {
        throw new Error('Gemini returned an empty result. Try again.')
      }

      setGeneratedResult(payload.result.trim())
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : 'Could not generate a result. Please try again.',
      )
    } finally {
      setIsGenerating(false)
    }
  }

  async function copyPrompt() {
    if (!optimizedPrompt) return

    try {
      await navigator.clipboard.writeText(optimizedPrompt)
      setNotice('Optimized prompt copied to your clipboard.')
      setError('')
    } catch {
      setError(
        'Clipboard access was unavailable. Select and copy the generated text manually.',
      )
    }
  }

  async function copyResult() {
    if (!generatedResult) return

    try {
      await navigator.clipboard.writeText(generatedResult)
      setNotice('Result copied to your clipboard.')
      setError('')
    } catch {
      setError(
        'Clipboard access was unavailable. Select and copy the result manually.',
      )
    }
  }

  function resetForm() {
    setPrompt('')
    setContext('')
    setFormat('Step-by-step guide')
    setLength('Medium')
    setOptimizedPrompt('')
    setGeneratedResult('')
    setError('')
    setNotice('')
  }

  return (
    <div className="optimizer-page">
      <header className="optimizer-intro">
        <span className="optimizer-eyebrow">
          ECOAI / AI EFFICIENCY
        </span>
        <h2>Prompt Optimizer</h2>
        <p>
          Write clearer instructions for AI, reduce ambiguity, and
          help avoid unnecessary follow-up requests.
        </p>
      </header>

      <section className="optimizer-hero">
        <div className="optimizer-hero-icon">
          <Sparkles size={24} />
        </div>
        <div>
          <h3>Better prompts. More useful responses.</h3>
          <p>
            Turn a rough request into a structured prompt with a clear
            task, relevant context, and output requirements.
          </p>
        </div>
      </section>

      <div className="optimizer-layout">
        <section className="optimizer-card">
          <div className="optimizer-card-heading">
            <span className="optimizer-heading-icon">
              <FileText size={19} />
            </span>
            <div>
              <h3>Your original prompt</h3>
              <p>Start with the question or instruction you want to improve.</p>
            </div>
          </div>

          <form onSubmit={optimizePrompt}>
            <label className="optimizer-field">
              Original prompt <span>*</span>
              <textarea
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value)
                  setOptimizedPrompt('')
                  setGeneratedResult('')
                  setError('')
                  setNotice('')
                }}
                placeholder="Example: Explain climate change and how students can help."
                rows={6}
                maxLength={5000}
                required
              />
            </label>

            <div className="optimizer-word-count">
              {wordCount} words Â· {prompt.length}/5000 characters
            </div>

            <label className="optimizer-field">
              Additional context <small>Optional</small>
              <textarea
                value={context}
                onChange={(event) => {
                  setContext(event.target.value)
                  setOptimizedPrompt('')
                  setGeneratedResult('')
                  setNotice('')
                }}
                placeholder="Who is this for? What background, goals, or limitations should the AI know?"
                rows={3}
                maxLength={2000}
              />
            </label>

            <div className="optimizer-options">
              <label className="optimizer-field">
                Output format
                <select
                  value={format}
                  onChange={(event) => {
                    setFormat(event.target.value)
                    setOptimizedPrompt('')
                    setGeneratedResult('')
                  }}
                >
                  <option>Bullet points</option>
                  <option>Step-by-step guide</option>
                  <option>Short paragraphs</option>
                  <option>Table</option>
                  <option>Report</option>
                  <option>Code with explanation</option>
                </select>
              </label>

              <label className="optimizer-field">
                Level of detail
                <select
                  value={length}
                  onChange={(event) => {
                    setLength(event.target.value)
                    setOptimizedPrompt('')
                    setGeneratedResult('')
                  }}
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Detailed</option>
                </select>
              </label>
            </div>

            <div className="optimizer-actions">
              <button
                className="optimizer-primary-button"
                type="submit"
              >
                <Sparkles size={17} />
                Optimize prompt
              </button>

              <button
                className="optimizer-secondary-button"
                type="button"
                onClick={generateResult}
                disabled={isGenerating}
              >
                <MessageSquareText size={16} />
                {isGenerating ? 'Generating...' : 'Result'}
              </button>

              <button
                className="optimizer-reset-button"
                type="button"
                onClick={resetForm}
                aria-label="Clear the form"
              >
                <RotateCcw size={16} />
                Clear
              </button>
            </div>
          </form>

          {error && (
            <p className="optimizer-message optimizer-error" role="alert">
              {error}
            </p>
          )}

          {notice && (
            <p className="optimizer-message optimizer-success" role="status">
              <CheckCircle2 size={16} />
              {notice}
            </p>
          )}
        </section>

        <aside className="optimizer-side-column">
          <section className="optimizer-card optimizer-tips-card">
            <div className="optimizer-card-heading">
              <span className="optimizer-heading-icon">
                <Lightbulb size={19} />
              </span>
              <div>
                <h3>Prompt improvement tips</h3>
                <p>Things to consider before sending your prompt.</p>
              </div>
            </div>

            {prompt.trim() ? (
              <ul className="optimizer-tip-list">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))
                ) : (
                  <li>
                    Your prompt includes some useful details. Review
                    whether the task, context, and expected result are clear.
                  </li>
                )}
              </ul>
            ) : (
              <ul className="optimizer-tip-list">
                <li>Describe one clear task or question.</li>
                <li>Include only relevant background information.</li>
                <li>Specify the audience and desired output.</li>
                <li>Use constraints when they genuinely matter.</li>
              </ul>
            )}
          </section>

          <section className="optimizer-efficiency-card">
            <span className="optimizer-efficiency-icon">
              <Zap size={20} />
            </span>
            <h3>Use AI more thoughtfully</h3>
            <p>
              Clearer instructions can reduce avoidable clarification
              and rework. Check the result before sending another request.
            </p>
            <div className="optimizer-efficiency-note">
              <strong>Honest impact tracking</strong>
              <span>
                This tool does not measure tokens, energy use, or carbon
                emissions, and it does not guarantee fewer AI requests.
              </span>
            </div>
          </section>
        </aside>
      </div>

      {optimizedPrompt && (
        <section className="optimizer-result-card">
          <div className="optimizer-result-header">
            <div className="optimizer-card-heading">
              <span className="optimizer-heading-icon">
                <Sparkles size={19} />
              </span>
              <div>
                <h3>Optimized prompt</h3>
              </div>
            </div>

            <button
              className="optimizer-primary-button optimizer-copy-button"
              type="button"
              onClick={copyPrompt}
            >
              <Copy size={16} />
              Copy prompt
            </button>
          </div>

          <pre className="optimizer-result-text">{optimizedPrompt}</pre>
        </section>
      )}

      {generatedResult && (
        <section className="optimizer-result-card" aria-live="polite">
          <div className="optimizer-result-header">
            <div className="optimizer-card-heading">
              <span className="optimizer-heading-icon">
                <MessageSquareText size={19} />
              </span>
              <div>
                <h3>Result</h3>
              </div>
            </div>

            <button
              className="optimizer-primary-button optimizer-copy-button"
              type="button"
              onClick={copyResult}
            >
              <Copy size={16} />
              Copy result
            </button>
          </div>

          <pre className="optimizer-result-text">{generatedResult}</pre>
        </section>
      )}
    </div>
  )
}

