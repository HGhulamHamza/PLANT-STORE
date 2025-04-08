import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import Logo from "../../public/logo.jpg";
import "../styles/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="logo" />

      {/* Desktop Nav Links */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>

      {/* Search Bar */}
      <div className={`search-bar ${menuOpen ? 'active' : ''}`}>
        <input type="text" placeholder="Search..." />
      </div>

      {/* Cart Icon */}
      <Link to="/cart" className="cart-link">
        <FaShoppingCart className="cart-icon" />
      </Link>

      {/* Signup Button */}
      <Link to="/signup" className="signup-btn">Sign Up</Link>

      {/* Hamburger Icon for Mobile */}
      <div className={`hamburger-icon ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      {/* Mobile Nav Links */}
      <ul className={`mobile-nav ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
        <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
