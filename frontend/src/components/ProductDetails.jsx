import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Typography, Button, Box, Card, CardMedia, IconButton
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  console.log(product);

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

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const item = { ...product, quantity };
    dispatch(addToCart(item));
    navigate("/cart");
  };


  if (!product) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mt: 5, color: "#555", fontWeight: "bold" }}>
        &larr; Back to All Plants
      </Button>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" gap={4} sx={{ mt: 10 }}>
        <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={`http://localhost:5000${product.image}`}
            alt={product.title}
            sx={{ height: 350, objectFit: "cover", borderRadius: "6px 6px 0 0" }}
          />
        </Card>

        <Box sx={{ maxWidth: 500, flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>{product.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{product.category}</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>{product.description}</Typography>
          <Typography variant="h5" sx={{ color: "#006600", mb: 2 }}>Rs {product.price}</Typography>

          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <IconButton onClick={() => setQuantity(prev => Math.max(1, prev - 1))}><Remove /></IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity(prev => prev + 1)}><Add /></IconButton>
          </Box>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" onClick={handleAddToCart} sx={{ backgroundColor: "#555" }}>Add to Cart</Button>
            <Button variant="contained" sx={{ backgroundColor: "#008000" }} onClick={() => navigate("/buy-now")}>
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
