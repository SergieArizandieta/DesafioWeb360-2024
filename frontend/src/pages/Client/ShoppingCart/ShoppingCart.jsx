import { Box, Button, IconButton, Typography } from "@mui/material";
import "./styles.css"
import { useAuthStore } from '../../../storage/auth';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShoppingCart() {
   const shoppingCart = useAuthStore((state) => state.shoppingCart);
   const setSoppingCart = useAuthStore((state) => state.setSoppingCart);
   const delAllShoppingCart = useAuthStore((state) => state.delAllShoppingCart);

   const handleAddToCart = (e) => {
      const id_product = parseInt(e.target.value);

      const updatedCart = shoppingCart.map((item) => {
         if (item.id_product === id_product) {
            return { ...item, quantity: item.quantity + 1 };
         }
         return item;
      });
      setSoppingCart(updatedCart);
   }

   const habldelRemoveFromCart = (e) => {
      const id_product = parseInt(e.target.value);

      const productInCart = shoppingCart.find((item) => item.id_product === id_product);

      if (productInCart.quantity === 1) {
         const updatedCart = shoppingCart.filter((item) => item.id_product !== id_product);
         setSoppingCart(updatedCart);
      } else {
         const updatedCart = shoppingCart.map((item) => {
            if (item.id_product === id_product) {
               return { ...item, quantity: item.quantity - 1 };
            }
            return item;
         });
         setSoppingCart(updatedCart);
      }
   }

   const handleDeleteAll = () => {
      delAllShoppingCart();
   }

   return (
      <div className="shoppingCart">
         <Box sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            alignContent: "center",
            justifyContent: "space-between",
            gap: 2,

         }}>

            <IconButton onClick={handleDeleteAll}>
               <DeleteIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <Typography variant="h4" sx={{ color: "#000" }}>
               Carreta
            </Typography>


         </Box>

         <section className="shoppingCart__content">

            {
               shoppingCart && shoppingCart.map((product, index) => (
                  <article key={index} className="shoppingCart__content__products">
                     <Box
                        component="img"
                        src={product.picture}
                        alt={product.name}
                        sx={{ width: "200px", height: "200px", objectFit: "cover", mb: 2 }}
                   
                     />

                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           flexDirection: "column",
                           height: "100%",
                           padding: "0 1rem"
                        }}>

                        <Typography variant="h6" sx={{ mb: 1 }}>
                           {product.name}
                        </Typography>

                        <Typography
                           variant="body2"
                           color="text.secondary"
                           sx={{ mb: 2 }}
                        >
                           {product.brand} - Stock: {product.stock}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                           Precio: ${product.price.toFixed(2)}
                        </Typography>

                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                           }}
                        >
                           <Button variant="contained" color="primary" sx={{ mr: 1 }} value={product.id_product} onClick={habldelRemoveFromCart}>
                              -
                           </Button>
                           <Typography variant="body1" sx={{ mr: 1 }}>
                              {product.quantity}
                           </Typography>
                           <Button variant="contained" color="primary" sx={{ ml: 1 }} value={product.id_product} onClick={handleAddToCart}>
                              +
                           </Button>
                        </Box>

                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                           Subtotal: ${(product.price * product.quantity).toFixed(2)}
                        </Typography>

                     </Box>
                  </article>
               ))

            }

            {
               shoppingCart.length ===0 ?
               <Typography variant="h5" sx={{ color: "#000" }}>
                  No hay productos en el carrito
               </Typography>

               :
               <Box >
                  <Typography variant="h5" sx={{ color: "#000" }}>
                     Total: ${shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                     Confirmar compra
                  </Button>
               </Box>
            }

         </section>
      </div>
   )
}