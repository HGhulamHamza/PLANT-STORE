import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import bgImage from "../../public/bg.jpg";
import logo from "../../public/logo.jpg";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice"; // Import the cart action
import { auth, provider } from "../firebase"; // adjust path if needed
import { signInWithPopup } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser({ user, token }));

      navigate("/");
      

      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login failed. Check credentials.",
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
  
      navigate("/");
      setSnackbar({ open: true, message: "Logged in with Google!", severity: "success" });
  
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };
  
  

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <Link to="/" className="back-home">← Back to Home</Link>
      <div className="auth-box login-narrow">
        <img src={logo} alt="Eco Roof Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <button type="submit">Login</button>
        </form>
        <div className="google-auth" onClick={handleGoogleLogin}>
  <FaGoogle /> Continue with Google
</div>

        <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
