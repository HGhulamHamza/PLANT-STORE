
import Lottie from "lottie-react";
import plantLoader from "../assets/plant-loader.json"; // Adjust path if needed

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <Lottie animationData={plantLoader} loop={true} style={styles.lottieStyle} />
      <p style={styles.text}>Loading products...</p>
    </div>
  );
};

// Styles
const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Full screen height
    textAlign: "center",
  },
  lottieStyle: {
    width: 150, // Adjust size
    height: 150,
  },
  text: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#006600",
    marginTop: "10px",
  },
};

export default Loader;
