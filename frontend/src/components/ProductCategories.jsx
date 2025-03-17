import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const categories = [
    {
      name: "ARTIFICIAL PLANTS",
      image: "/Artfiicial Plants.jpg",
      route: "/products/ARTIFICIALPLANTS",
    },
    {
      name: "NATURAL PLANTS AND FLOWERS",
      image: "/Natural Plants and Flowers.jpg",
      route: "/products/NATURALPLANTSANDLEAVES",
    },
    {
      name: "GREEN ROOF PLANTS",
      image: "/Green Roof Plants.jpg",
      route: "/products/GREENROOFPLANTS",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>PRODUCT CATEGORIES</h1>
      <p style={styles.subHeading}>
        Discover a greener future—explore wide range of innovative green roofs and premium plants
      </p>
      <div style={styles.cardContainer}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={styles.imageContainer}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => navigate(category.route)}
          >
            <img src={category.image} alt={category.name} style={styles.image} />
            <div
              style={{
                ...styles.overlay,
                opacity: hoverIndex === index ? 1 : 0,
                transform: hoverIndex === index ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <h3 style={styles.overlayText}>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "25px 17px", background: "#f9f9f9", width: "98%" },
  heading: { fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(90deg, #004d00, #008000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "15px", fontFamily: "Lato" },
  subHeading: { fontSize: "1.2rem", color: "#555", marginBottom: "40px", fontFamily: "'Roboto', sans-serif" },
  cardContainer: { display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" },
  imageContainer: { position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: "12px", transition: "transform 0.3s ease-in-out" },
  image: {
    width: "280px",
    height: "380px", // Set a fixed height
    objectFit: "cover", // Ensures the images maintain aspect ratio without distortion
    borderRadius: "10px",
    transition: "transform 0.4s ease-in-out",
  },
  overlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 128, 0, 0.8)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    borderRadius: "12px",
    opacity: "0", // Initially hidden
    transform: "translateY(30px)", // Initially moved down
  },
  overlayText: { margin: 0 },
};

export default ProductCategories;