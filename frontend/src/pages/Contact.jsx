import { useState } from "react";
import { FaEnvelope, FaPhone, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import "../styles/Contact.css";
import Header from "../components/Header";
import bgImage from "../../public/bg.jpg";
import emailjs from "@emailjs/browser"; // Import EmailJS

function Contact() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qrtl8qo", // Replace with your EmailJS Service ID
        "template_cz3n93b", // Replace with your EmailJS Template ID
        {
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          message: formData.message,
        },
        "Zzy5W-BepN_he_8WA" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setShowSnackbar(true);
          setTimeout(() => setShowSnackbar(false), 3000);
          setFormData({ name: "", whatsapp: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div>
      <Header />
      <div className="contact-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <h1 className="contact-title">Contact Us</h1>
      </div>

      <div className="contact-container">
        <div className="contact-card">
          <h2>Contact Information</h2>
          <p>Contact us on the given information or fill out the form to submit your query or feedback.</p>

          <div className="contact-details">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:mk5711364@gmail.com">mk5711364@gmail.com</a>
          </div>

          <div className="contact-details">
            <FaPhone className="contact-icon" />
            <a href="tel:+923435886834">+92 343 5886834</a>
          </div>

          <div className="social-icons">
            <a href="https://wa.me/923435886834" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>We Love To Hear From You!</h2>
          <p>Fill out the form and our team will reach out to you soon.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="whatsapp" placeholder="WhatsApp Number" value={formData.whatsapp} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Issue or Suggestion" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>

      {showSnackbar && <div className="snackbar">Your message has been sent!</div>}
    </div>
  );
}

export default Contact;
