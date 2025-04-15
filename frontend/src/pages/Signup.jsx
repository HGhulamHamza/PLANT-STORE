import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import bgImage from "../../public/bg.jpg";
import logo from "../../public/logo.jpg";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // import action
import { auth, provider } from "../firebase"; // adjust path if needed
import { signInWithPopup } from "firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // add dispatch

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // Save to redux (so it persists via redux-persist)
      dispatch(setUser(user));

      setSnackbar({ open: true, message: "Account created! Please log in.", severity: "success" });
      navigate("/login");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Signup failed. Try again.",
        severity: "error"
      });
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
  
      
  
      dispatch(setUser({ user: userData, token: "google-oauth" }));
      localStorage.setItem("user", JSON.stringify(userData));
  
      navigate("/login");
      setSnackbar({ open: true, message: "Logged in with Google!", severity: "success" });
  
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <Link to="/" className="back-home">← Back to Home</Link>
      <div className="auth-box">
        <img src={logo} alt="Eco Roof Logo" className="logo" />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="password-input">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <div className="google-auth" onClick={handleGoogleLogin}>
  <FaGoogle /> Continue with Google
</div>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Signup;
