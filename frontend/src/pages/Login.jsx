import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaRecycle,
  FaBolt,
  FaGlobeAmericas,
  FaTint,
} from "react-icons/fa";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember me:", rememberMe);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="login-page">

      {/* ================= NAVBAR ================= */}

      <nav className="top-navbar">

        <div className="navbar-logo">
          <span className="logo-symbol">◉</span>
          <span>AI</span>
        </div>

        <div className="navbar-title">
          Green AI Dashboard
          <span>⌄</span>
        </div>

        <div className="navbar-actions">

          <button className="help-button">
            ?
          </button>

          <button className="signup-button">
            Sign up with email
          </button>

          <button
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
            Continue with Google
          </button>

        </div>

      </nav>


      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="background-shape shape-one">
        <FaLeaf />
      </div>

      <div className="background-shape shape-two"></div>

      <div className="background-shape shape-three">
        <FaBolt />
      </div>

      <div className="background-shape shape-four">
        <FaTint />
      </div>

      <div className="background-shape shape-five">
        <FaGlobeAmericas />
      </div>

      <div className="background-shape shape-six">
        <FaRecycle />
      </div>

      <div className="background-shape shape-seven">
        <FaLeaf />
      </div>


      {/* ================= LOGIN ================= */}

      <main className="login-container">

        <div className="login-card">

          {/* BRAND */}

          <div className="brand-section">

            <div className="brand-icon">
              <FaLeaf />
            </div>

            <div>
              <h2>Green AI</h2>

              <p>
                Environmental Dashboard
              </p>
            </div>

          </div>


          {/* WELCOME */}

          <div className="welcome-section">

            <h1>
              Welcome back
            </h1>

            <p>
              Sign in to monitor your AI environmental impact
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label htmlFor="email">
                Email
              </label>

              <div className="input-wrapper">

                <FaEnvelope className="input-icon" />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <FaLock className="input-icon" />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* REMEMBER / FORGOT */}

            <div className="form-options">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              Sign In to Dashboard
            </button>

          </form>


          {/* REQUEST ACCESS */}

          <p className="request-access">

            Don't have an account?

            <button type="button">
              Request Access
            </button>

          </p>

        </div>

      </main>

    </div>
  );
}

export default Login;