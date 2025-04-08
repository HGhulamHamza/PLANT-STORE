import { useState, useEffect } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your Cart is Empty 🛒</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.item}>
                <img src={`http://localhost:5000${item.image}`} alt={item.title} style={styles.image} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Category: {item.category}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: Rs {item.price}</p>
                  <p>Total: Rs {item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 style={styles.total}>Grand Total: Rs {total}</h3>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#333",
  },
  empty: {
    textAlign: "center",
    fontSize: "1.3rem",
    color: "#999",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    backgroundColor: "#f8f8f8",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  total: {
    textAlign: "right",
    fontSize: "1.5rem",
    marginTop: "20px",
    color: "#222",
  },
};

export default CartPage;
