import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductCategories from "./components/ProductCategories";
import ProductCategory from "./components/ProductCategory";
import ProductDetails from "./components/ProductDetails";
import BuyNowPage from "./pages/BuyNowPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import { setUser } from "./redux/userSlice";

// Protected Route component for cart access
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // If no user, redirect to login page
    localStorage.setItem("redirectAfterLogin", "/cart"); // Save path for redirect
    return <Navigate to="/login" replace />;
  }

  return children; // If user exists, render the children (CartPage)
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sync Redux with localStorage on initial load
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductCategories />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/buy-now" element={<BuyNowPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Route for Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
