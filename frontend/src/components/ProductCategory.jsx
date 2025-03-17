import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Container, TextField, InputAdornment, CircularProgress, Box } from "@mui/material";
import { Search } from "@mui/icons-material";

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert category short code to full name without spaces
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
      console.log("Fetching products for category:", fullCategoryName);
  
      const response = await axios.get(`http://localhost:5000/api/products/category/${fullCategoryName}`); // ✅ Fixed URL
  
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

  return (
    <Container>
      <Typography variant="h4" align="center" color="#555555" gutterBottom sx={{ fontWeight: "bold", mt: 3 }}>
        {getCategoryName(category)}
      </Typography>

      {/* Search Bar */}
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

      {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardMedia
               component="img"
               height="250"
               image={`http://localhost:5000/uploads/${product.image}`} // ✅ Fixed template literals
               alt={product.title}
/>

                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.category}</Typography>
                  <Typography variant="h5" color="primary">${product.price}</Typography>
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
    </Container>
  );
};

export default ProductCategory;