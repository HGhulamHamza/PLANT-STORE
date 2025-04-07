import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductCategories from "./components/ProductCategories";
import ProductCategory from "./components/ProductCategory";
import ProductDetails from "./components/ProductDetails";

import BuyNowPage from "./pages/BuyNowPage";
import Signup from "./pages/Signup";
import CartPage from "./components/Cart";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductCategories />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/buy-now" element={<BuyNowPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       

      </Routes>
    </Router>
  );
}

export default App;
