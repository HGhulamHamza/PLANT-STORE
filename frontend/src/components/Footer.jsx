
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* <div className="footer-content">
        <h2 className="footer-heading">ECO ROOFS</h2>

        <div className="footer-contact">
          <p className="footer-email">Email: eco@example.com</p>
          <p className="footer-phone">Phone: +123 456 7890</p>
        </div>

        <div className="footer-icons">
          <FaFacebookF className="footer-icon" />
          <FaInstagram className="footer-icon" />
          <FaWhatsapp className="footer-icon" />
        </div>
      </div> */}

      <img src="\Footer.jpg" alt="Footer Background" className="footer-image" />
    </footer>
  );
};

export default Footer;
