import { useSelector } from "react-redux";
import { useState } from "react";

const BuyNow = () => {
  const cart = useSelector((state) => state.cart.cart);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    alert("Order placed successfully!");
    console.log("Order details:", form, cart);
  };

  const convertToRs = (item) => {
    return item.category === "GREEN ROOF PLANTS"
      ? 4220 * item.quantity
      : item.price * item.quantity;
  };

  const total = cart.reduce((sum, item) => sum + convertToRs(item), 0);

  return (
    <div style={styles.page}>
      <div style={styles.formSection}>
        <h2 style={styles.heading}>Buyer Details</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Address / Location"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
        />

        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>Payment Method:</label>
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={form.payment === "COD"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Easypaisa"
              checked={form.payment === "Easypaisa"}
              onChange={handleChange}
            />
            Easypaisa
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Bank Transfer"
              checked={form.payment === "Bank Transfer"}
              onChange={handleChange}
            />
            Bank Transfer
          </label>
        </div>
      </div>

      <div style={styles.summarySection}>
        <h2 style={styles.heading}>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} style={styles.itemCard}>
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.title}
                  style={styles.image}
                />
                <div>
                  <h3 style={styles.title}>{item.title}</h3>
                  <p style={styles.detail}>Quantity: {item.quantity}</p>
                  <p style={styles.detail}>Price: Rs {item.price}</p>
                  <p style={styles.total}>
                    Total: Rs {convertToRs(item)}
                  </p>
                </div>
              </div>
            ))}
            <hr />
            <h3 style={styles.grandTotal}>Grand Total: Rs {total}</h3>
            <button style={styles.orderBtn} onClick={handleOrder}>
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },
  formSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  summarySection: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#1A4D2E",
    borderBottom: "2px solid #ccc",
    paddingBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  radioGroup: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "1rem",
  },
  radioLabel: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  itemCard: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    color: "#1A4D2E",
  },
  detail: {
    margin: "4px 0",
    fontSize: "0.95rem",
    color: "#555",
  },
  total: {
    marginTop: "6px",
    fontWeight: "bold",
    color: "#2E7D32",
  },
  grandTotal: {
    fontSize: "1.3rem",
    marginTop: "20px",
    fontWeight: "bold",
    color: "#2E7D32",
  },
  orderBtn: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "#2E7D32",
    color: "#fff",
    padding: "12px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default BuyNow;
