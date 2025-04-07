import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../../public/logo.jpg";
import "../styles/Header.css"; // Create and style this file

function Header() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="logo" />

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <Link to="/cart" className="cart-link">
        <FaShoppingCart className="cart-icon" />
      </Link>

      {/* Signup Button */}
      <Link to="/signup" className="signup-btn">Sign Up</Link>
    </nav>
  );
}

export default Header;
