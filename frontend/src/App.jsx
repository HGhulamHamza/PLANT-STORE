import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductCategories from "./components/ProductCategories";
import ProductCategory from "./components/ProductCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCategories />} />
        <Route path="/products/:category" element={<ProductCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
