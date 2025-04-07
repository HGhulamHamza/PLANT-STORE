import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, Box, Card, CardMedia, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  const displayPrice = () => {
    if (product.category === "GREEN ROOF PLANTS") {
      return "15$ per sqrft";
    }
    return `Rs ${product.price}`;
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* 🔹 Back Button with Margin-Top */}
      <Button onClick={() => navigate(-1)} sx={{ mt: 5,  color: "#555555", fontWeight: "bold" }}>
        &larr; Back to All Plants
      </Button>

      {/* 🔹 Content Centering */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" gap={4} sx={{ mt: 10 }}>
        {/* Product Image */}
        <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={`http://localhost:5000${product.image}`}
            alt={product.title}
            sx={{
              height: 350,
              objectFit: "cover",
              borderRadius: "6px 6px 0 0",
            }}
          />
        </Card>

        {/* Product Details */}
        <Box sx={{ maxWidth: 500, flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 1 }}>
            {product.category}
          </Typography>

          <Typography variant="body1" sx={{ color: "#555", mb: 4, fontWeight: "bold" }}>
            {product.description}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#006600", mb: 2, fontSize: "2rem" }}>
            {displayPrice()}
          </Typography>

          {/* 🔹 Counter with Box */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              border: "2px solid #555555",
              borderRadius: "8px",
              width: "140px",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              mb: 2,
            }}
          >
            <IconButton
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              sx={{
                backgroundColor: "#ddd",
                borderRadius: "14px",
                "&:hover": { backgroundColor: "#ccc" },
                padding: "5px",
              }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton
              onClick={() => setQuantity((prev) => prev + 1)}
              sx={{
                backgroundColor: "#ddd",
                borderRadius: "14px",
                "&:hover": { backgroundColor: "#ccc" },
                padding: "5px",
              }}
            >
              <Add />
            </IconButton>
          </Box>

          {/* 🔹 Buttons (Add to Cart & Buy Now) */}
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#555555",
                color: "#fff",
                "&:hover": { backgroundColor: "#444444" },
                padding: "10px 20px",
              }}
              onClick={() => navigate("/cart")}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#008000",
                color: "#fff",
                "&:hover": { backgroundColor: "#006600" },
                padding: "10px 20px",
              }}
              onClick={() => navigate("/buy-now")}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
