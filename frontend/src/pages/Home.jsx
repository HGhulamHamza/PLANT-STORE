import  { useEffect } from 'react';
import { Link } from "react-router-dom";
import "../styles/Home.css";
import heroImage from "../../public/Hero7.jpg";
import Header from "../components/Header";
import Typed from "typed.js"; // Import Typed.js library

function Home() {
  useEffect(() => {
    const options = {
      strings: ["Natural Plants", "Artificial Plants", "Green Roof Plants"], // The array of strings to be typed
      typeSpeed: 60, // Speed at which the text is typed
      backSpeed: 60, // Speed at which the text is deleted
      loop: true, // Enable looping of the animation
    };

    // Initialize Typed.js on the span with the class name 'element'
    const typed = new Typed('.element', options);

    // Cleanup the Typed instance when the component is unmounted
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="home-container">
      <Header /> {/* Reuse Header Component */}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>
            Greenery Redefined with Our <span className="element"></span> {/* The span will be animated */}
          </h1>
          <p>
            Elevate your space with our Green Roof Systems and premium plants & flowers!
            We design lush, eco-friendly rooftops and offer high-quality greenery, ensuring
            beauty, sustainability, and lasting value you can trust.
          </p>
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <img src={heroImage} alt="Green Roof" className="styled-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
