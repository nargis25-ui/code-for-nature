// import { useNavigate } from "react-router-dom";

// import { useState } from "react";

// import {
//   FaEnvelope,
//   FaLock,
//   FaGoogle,
//   FaEye,
//   FaEyeSlash,
//   FaLeaf,
//   FaRecycle,
//   FaBolt,
//   FaGlobeAmericas,
//   FaTint,
// } from "react-icons/fa";

// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       alert("Please enter email and password.");
//       return;
//     }

//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("userEmail", email.trim());
//     sessionStorage.setItem("rememberMe", String(rememberMe));

//     navigate("/dashboard", { replace: true });
//   };

//   const handleGoogleLogin = () => {
//     console.log("Google login clicked");
//   };

//   return (
//     <div className="login-page">

//       {/* ================= BACKGROUND DECORATION ================= */}

//       <div className="background-shape shape-one">
//         <FaLeaf />
//       </div>

//       <div className="background-shape shape-two"></div>

//       <div className="background-shape shape-three">
//         <FaBolt />
//       </div>

//       <div className="background-shape shape-four">
//         <FaTint />
//       </div>

//       <div className="background-shape shape-five">
//         <FaGlobeAmericas />
//       </div>

//       <div className="background-shape shape-six">
//         <FaRecycle />
//       </div>

//       <div className="background-shape shape-seven">
//         <FaLeaf />
//       </div>


//       {/* ================= LOGIN ================= */}

//       <main className="login-container">

//         <div className="login-card">

//           {/* BRAND */}

//           <div className="brand-section">

//             <div className="brand-icon">
//               <FaLeaf />
//             </div>

//             <div>
//               <h2>Green AI</h2>

//               <p>
//                 Environmental Dashboard
//               </p>
//             </div>

//           </div>


//           {/* WELCOME */}

//           <div className="welcome-section">

//             <h1>
//               Welcome back
//             </h1>

//             <p>
//               Sign in to monitor your AI environmental impact
//             </p>

//           </div>


//           {/* FORM */}

//           <form onSubmit={handleLogin}>

//             {/* EMAIL */}

//             <div className="input-group">

//               <label htmlFor="email">
//                 Email
//               </label>

//               <div className="input-wrapper">

//                 <FaEnvelope className="input-icon" />

//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                   required
//                 />

//               </div>

//             </div>


//             {/* PASSWORD */}

//             <div className="input-group">

//               <label htmlFor="password">
//                 Password
//               </label>

//               <div className="input-wrapper">

//                 <FaLock className="input-icon" />

//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(e.target.value)
//                   }
//                   required
//                 />

//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash />
//                   ) : (
//                     <FaEye />
//                   )}
//                 </button>

//               </div>

//             </div>


//             {/* REMEMBER / FORGOT */}

//             <div className="form-options">

//               <label className="remember">

//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) =>
//                     setRememberMe(e.target.checked)
//                   }
//                 />

//                 <span>
//                   Remember me
//                 </span>

//               </label>

//               <button
//                 type="button"
//                 className="forgot-password"
//               >
//                 Forgot password?
//               </button>

//             </div>


//             {/* LOGIN BUTTON */}

//             <button
//               type="submit"
//               className="login-button"
//             >
//               Sign In to Dashboard
//             </button>

//           </form>


//           {/* ================= SIGN UP / GOOGLE ================= */}

//           <div className="social-login">

//             <button
//               type="button"
//               className="signup-button"
//             >
//               Sign up with email
//             </button>

//             <button
//               type="button"
//               className="google-button"
//               onClick={handleGoogleLogin}
//             >
//               <FaGoogle />
//               Continue with Google
//             </button>

//           </div>


//           {/* REQUEST ACCESS */}

//           <p className="request-access">

//             Don't have an account?

//             <button type="button">
//               Request Access
//             </button>

//           </p>

//         </div>

//       </main>

//     </div>
//   );
// }

// export default Login;







import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Save user session and navigate to dashboard
  const handleSuccess = (user) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("isLoggedIn", "true");
    storage.setItem("userEmail", user.email || "");

    navigate("/dashboard", { replace: true });
  };

  // Email sign in
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      handleSuccess(result.user);
    } catch (error) {
      console.error("Login error:", error);
      alert(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Email sign up
  const handleSignUp = async () => {
    if (loading) return;

    if (!email.trim() || !password) {
      alert("Please enter your email and password first.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      alert("Account created successfully!");
      handleSuccess(result.user);
    } catch (error) {
      console.error("Sign-up error:", error);
      alert(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      handleSuccess(result.user);
    } catch (error) {
      console.error("Google login error:", error);

      if (error.code !== "auth/popup-closed-by-user") {
        alert(getAuthErrorMessage(error.code));
      }
    } finally {
      setLoading(false);
    }
  };

  // Friendly Firebase error messages
  const getAuthErrorMessage = (code) => {
    const messages = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-not-found": "No account found. Please sign up first.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/email-already-in-use": "This email already has an account. Please sign in.",
      "auth/weak-password": "Please choose a stronger password.",
      "auth/operation-not-allowed":
        "Enable this sign-in method in Firebase Console.",
      "auth/popup-blocked":
        "Your browser blocked the Google sign-in popup. Allow popups and try again.",
      "auth/unauthorized-domain":
        "Add your current website domain in Firebase Authentication settings.",
      "auth/api-key-not-valid":
        "Check your Firebase API key in src/firebase.js.",
      "auth/network-request-failed":
        "Network error. Check your internet connection.",
    };

    return messages[code] || `Authentication failed: ${code || "Please try again."}`;
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
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

      {/* Login card */}
      <main className="login-container">
        <div className="login-card">
          {/* Brand */}
          <div className="brand-section">
            <div className="brand-icon">
              <FaLeaf />
            </div>

            <div>
              <h2>Green AI</h2>
              <p>Environmental Dashboard</p>
            </div>
          </div>

          {/* Welcome */}
          <div className="welcome-section">
            <h1>Welcome back</h1>
            <p>Sign in to monitor your AI environmental impact</p>
          </div>

          {/* Email login form */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <FaLock className="input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember me / Forgot password */}
            <div className="form-options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert("Password reset is not configured yet.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* Sign up / Google */}
          <div className="social-login">
            <button
              type="button"
              className="signup-button"
              onClick={handleSignUp}
              disabled={loading}
            >
              Sign up with email
            </button>

            <button
              type="button"
              className="google-button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          {/* Request access */}
          <p className="request-access">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() =>
                alert("Please create an account using Sign up with email.")
              }
            >
              Request Access
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
