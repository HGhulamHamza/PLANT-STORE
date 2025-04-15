import "../styles/About.css";
import aboutImage from "../../public/bg.jpg";
import aboutVideo from "../../public/about.mp4";
import Header from "../components/Header"; // Import Header
import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <Header /> {/* Reuse Header Component */}

      <div className="about-hero">
        <img src={aboutImage} alt="About Us" className="about-image" />
        <h1 className="about-title">About Us</h1>
      </div>

      {/* About Content Section */}
      <div className="about-content">
        {/* Left Side - Text Section */}
        <div className="about-text">
          <h2>Your Plant Experts</h2>
          <p>
            We are dedicated to bringing nature closer to you with our premium
            plants, eco-friendly designs, and sustainable green roof solutions.
            Our team of plant experts ensures that your spaces are transformed
            into lush, vibrant, and refreshing environments.
          </p>
        </div>

        {/* Right Side - Video Section */}
        <div className="about-video-container">
          <video controls className="about-video">
            <source src={aboutVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
