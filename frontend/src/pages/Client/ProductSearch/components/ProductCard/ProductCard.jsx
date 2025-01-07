/* eslint-disable react/prop-types */
import { Box, Button, Paper, Typography } from "@mui/material";
import { useAuthStore } from '../../../../../storage/auth';

export default function ProductCard({ product }) {
  const shoppingCart = useAuthStore((state) => state.shoppingCart);
  const setProduct = useAuthStore((state) => state.setProduct);
  const setSoppingCart = useAuthStore((state) => state.setSoppingCart);
  
  const handleAddToCart = () => {
    
    const productInCart = shoppingCart.find((item) => item.id_product === product.id_product);

    if (productInCart) {
      const updatedCart = shoppingCart.map((item) => {
        if (item.id_product === product.id_product) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setSoppingCart(updatedCart);
    } else {
      setProduct({ ...product, quantity: 1 });
    }
  }

  return (
   <Box sx={{ maxWidth: 300, margin: "auto", p: 2}}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: 430,
        }}
      >
        <Box
          component="img"
          src={product.picture}
          alt={product.name}
          sx={{ width: "100%", height: "200px", objectFit: "cover", mb: 2 }}
        />

        <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {product.brand} - Stock: {product.stock}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Precio: Q{product.price.toFixed(2)}
        </Typography>
        
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>

      </Paper>
    </Box>
  )
}