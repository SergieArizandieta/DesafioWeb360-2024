import { Box, Button, Paper, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function ProductCard({ product }) {

  return (
   <Box sx={{ maxWidth: 300, margin: "auto", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={product.image}
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
          Precio: ${product.price.toFixed(2)}
        </Typography>
        
        <Button variant="contained" color="primary">
          Agregar al carrito
        </Button>

      </Paper>
    </Box>
  )
}