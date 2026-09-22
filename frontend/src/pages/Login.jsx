import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Email + Password Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    // Save login status
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userEmail", email);

    // Go to Dashboard
    navigate("/dashboard", { replace: true });
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", result.user.email);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
        <div className="login-logo">
          🌿
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue with GreenAI
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">
              Email
            </label>

            <div className="input-icon">
              <FaEnvelope className="input-icon" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrapper">
              <FaLock className="input-icon" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FaGoogle />

          {loading
            ? "Signing in..."
            : "Continue with Google"}
        </button>

        {/* Signup */}
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
