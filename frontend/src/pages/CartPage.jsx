import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/cartSlice";
import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../styles/CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Price calculation
  const convertToRs = (item) => {
    return item.category === "GREEN ROOF PLANTS" 
      ? 4220 * item.quantity 
      : item.price * item.quantity;
  };

  // Grand total
  const total = cart.reduce((sum, item) => sum + convertToRs(item), 0);

  // Delete item
  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    dispatch(setCart(updatedCart));
  };

  // ✅ Fixed: Immutable quantity update
  const updateQuantity = (index, type) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const newQuantity = type === "increment" 
          ? item.quantity + 1 
          : Math.max(item.quantity - 1, 1); // Prevent <1
        
        return {
          ...item,
          quantity: newQuantity,
          price: item.category === "GREEN ROOF PLANTS" ? 4220 : item.price
        };
      }
      return item;
    });

    dispatch(setCart(updatedCart));
  };

  return (
    <div style={styles.container}>
      <button style={styles.homeButton} onClick={() => navigate("/")}>
        ← Go to Home Page
      </button>

      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={styles.noPlants}>No Plants in the cart!</p>
          <button style={styles.addButton} onClick={() => navigate("/products")}>
            Add Products
          </button>
        </div>
      ) : (
        <div className="content-wrapper">
          <div className="cart-list-container">
            <ul style={styles.list}>
              {cart.map((item, index) => (
                <li key={index} style={styles.item}>
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    style={styles.image}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <p>Category: {item.category}</p>
                    <div style={styles.qtySection}>
                      <button 
                        onClick={() => updateQuantity(index, "decrement")} 
                        style={styles.qtyBtn}
                      >
                        <RemoveIcon />
                      </button>
                      <p style={styles.qtyText}>Quantity: {item.quantity}</p>
                      <button 
                        onClick={() => updateQuantity(index, "increment")} 
                        style={styles.qtyBtn}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <p>Price: Rs {item.price}</p>
                    <p>Total: Rs {convertToRs(item)}</p>
                    <div style={styles.icons}>
                      <span 
                        onClick={() => handleDelete(index)} 
                        style={styles.deleteIcon}
                      >
                        <Delete style={{ color: "red", fontSize: "2rem" }} />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="total-box">
            <h3 style={styles.totalHeading}>Grand Total</h3>
            <p style={styles.totalAmount}>Rs {total}</p>
            <button 
              style={styles.proceedButton} 
              onClick={() => navigate("/buy-now")}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles (unchanged)
const styles = {
  container: { padding: "40px", maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif", position: "relative" },
  homeButton: { position: "absolute", top: "20px", left: "10px", backgroundColor: "transparent", color: "#333", padding: "8px 16px", border: "none", fontWeight: "bold", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer" },
  heading: { textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#006D00" },
  emptyContainer: { textAlign: "center" },
  noPlants: { color: "#226830", fontSize: "1.4rem", marginBottom: "20px" },
  addButton: { backgroundColor: "#555", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { display: "flex", gap: "20px", marginBottom: "20px", backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  image: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" },
  icons: { marginTop: "10px" },
  deleteIcon: { cursor: "pointer" },
  qtySection: { display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" },
  qtyBtn: { backgroundColor: "#ddd", border: "none", borderRadius: "50%", padding: "4px", cursor: "pointer" },
  qtyText: { margin: 0, fontWeight: "bold" },
  totalHeading: { fontSize: "1.3rem", marginBottom: "10px", color: "#333" },
  totalAmount: { fontSize: "1.8rem", fontWeight: "bold", color: "#226830" },
  proceedButton: { backgroundColor: "#555", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", transition: "background-color 0.3s ease", width: "100%", marginTop: "20px" },
};

export default CartPage;