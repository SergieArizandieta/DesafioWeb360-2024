import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import "./styles.css"
import { useAuthStore } from '../../../storage/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import { createOrder } from "../ProductSearch/services/createOrder";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";


export default function ShoppingCart() {
  const idUserDPI = useAuthStore((state) => state.idUserDPI);

  const shoppingCart = useAuthStore((state) => state.shoppingCart);
  const setSoppingCart = useAuthStore((state) => state.setSoppingCart);
  const delAllShoppingCart = useAuthStore((state) => state.delAllShoppingCart);

  const handleSubmitt = (e) => {
    e.preventDefault();
    const address = e.target[0].value;
    const delivery_date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const details = shoppingCart.map((item) => {
      return { id_product: item.id_product, quantity: item.quantity }
    });

    const order = {
      address,
      delivery_date,
      client_id_client: idUserDPI,
      details,
    };

    createOrder(order)
    .then(async(res) => {await CustomAlert("Exitoso", res.message, true); })
    .then(() => delAllShoppingCart())
    .catch((err) => {
      CustomAlert("Ah ocurrido un error", err, false)
    })
  }
 
  const editQuantity = (id_product, add) =>{
    const updatedCart = shoppingCart.map((item) => {
      if (item.id_product === id_product) {
        return { ...item, quantity: add ? item.quantity + 1 : item.quantity - 1 };
      }
      return item;
    });

    return updatedCart
  }

  const handleAddToCart = (e) => {
    const id_product = parseInt(e.target.value);

    const updatedCart = editQuantity(id_product,true)
    setSoppingCart(updatedCart);
  }

  const habldelRemoveFromCart = (e) => {
    const id_product = parseInt(e.target.value);

    const productInCart = shoppingCart.find((item) => item.id_product === id_product);

    if (productInCart.quantity === 1) {
      const updatedCart = shoppingCart.filter((item) => item.id_product !== id_product);
      setSoppingCart(updatedCart);
    } else {
      const updatedCart = editQuantity(id_product,false)
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

                <Typography variant="h6" sx={{ mb: 1, minWidth: 200  }}>
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
                  Precio: Q{product.price.toFixed(2)}
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

                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, borderTop: "1px solid gray", marginTop: "1.5rem" }}>
                  Subtotal: Q{(product.price * product.quantity).toFixed(2)}
                </Typography>

              </Box>
            </article>
          ))

        }

        {
          shoppingCart.length === 0 ?
            <Typography variant="h5" sx={{ color: "#000" }}>
              No hay productos en el carrito
            </Typography>

            :
            <Box >
              <Typography variant="h5" sx={{ color: "#000", marginBottom: 2 }}>
                Total: Q{shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
          
              <form onSubmit={handleSubmitt}>
                <TextField
                  label="Dirección de envío"
                  variant="filled"
                  color="quarternary"
                  required
                  fullWidth
                />
                <br/>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth type="submit">
                  Confirmar compra
                </Button>
              </form>
            </Box>
        }

      </section>
    </div>
  )
}