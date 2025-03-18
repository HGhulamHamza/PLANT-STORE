import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Card, CardContent, CardMedia, Typography, Grid, Container, 
  TextField, InputAdornment, Box, IconButton, Snackbar, Alert 
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/plant-loader.json"; // Adjust path if needed

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  const getCategoryName = (shortCode) => {
    const categoryMap = {
      ARTIFICIALPLANTS: "ARTIFICIAL PLANTS",
      NATURALPLANTSANDLEAVES: "NATURAL PLANTS AND FLOWERS",
      GREENROOFPLANTS: "GREEN ROOF PLANTS",
    };
    return categoryMap[shortCode] || decodeURIComponent(shortCode);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const fullCategoryName = getCategoryName(category);
      const response = await axios.get(`http://localhost:5000/api/products/category/${fullCategoryName}`);
      let filteredProducts = response.data;

      if (query.trim()) {
        filteredProducts = response.data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchProducts(searchQuery);
    }
  };

  const handleAddToCart = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" color="#555555" gutterBottom sx={{ fontWeight: "bold", mt: 3 }}>
        {getCategoryName(category)}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearch}
          sx={{
            width: "40%",
            borderRadius: 2.8,
            backgroundColor: "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="disabled" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Lottie animationData={loaderAnimation} loop={true} style={{ width: 150, height: 150 }} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    width: "90%", // Reduced width for better spacing
                    height: "100%", // Increased height
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={`http://localhost:5000${product.image}`}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: "bold", 
                        fontSize: "large", 
                        fontFamily: "'Bungee', sans-serif", 
                        color: "#333" 
                      }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.category}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h5" sx={{ color: "#006600", fontWeight: "bold" }}>
                        Rs {product.price}
                      </Typography>
                      <IconButton onClick={handleAddToCart}>
                        <ShoppingCart sx={{ color: "#006600" }} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%", mt: 3 }}>
              No products found.
            </Typography>
          )}
        </Grid>
      )}

      {/* Snackbar Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Plant added to cart successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductCategory;
