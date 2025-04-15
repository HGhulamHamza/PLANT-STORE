import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { PiLeafLight } from "react-icons/pi"; // Leaf icon from phosphor-icons
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* Logo and Description */}
        <div className="logo-description">
        <div className="logo">
  <div className="leaf-icon-wrapper">
    <PiLeafLight className="icon" />
  </div>
  <h2>Eco Roof</h2>
</div>

  <p>Guiding Your Green Roofing Journey, Every Step of the Way.</p>
</div>


        {/* Company Links */}
        <div className="company-links">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Product</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <h3>Contact Details</h3>
          <ul>
            <li>
              <MdLocationOn className="icon" />
              <span>Pakistan</span>
            </li>
            <li>
              <a href="https://maps.google.com" className="link">View on Google map</a>
            </li>
            <li>
              <MdEmail className="icon" />
              <span>mk5711364@gmail.com</span>
            </li>
            <li>
              <MdPhone className="icon" />
              <span>0330-9222554</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <p>&copy; 2025 Eco Roof. All Rights Reserved </p>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" className="icon"><FaFacebookF /></a>
          <a href="#" className="icon"><FaInstagram /></a>
          <a href="#" className="icon"><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
