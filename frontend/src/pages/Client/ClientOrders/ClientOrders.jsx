import { Box, IconButton, Typography } from "@mui/material"
import "./styles.css"
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import { getOrders } from "./services/getOrders";
import { useAuthStore } from '../../../storage/auth';
import OrderDetails from "./components/orderDetails/orderDetails";


export default function ClientOrders() {
  const idUserDPI = useAuthStore((state) => state.idUserDPI);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const params = {
      client_id_client: idUserDPI,
    }
    getOrders(params)
      .then((res) => {
        setOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="clientOrders">
      <Box sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        alignContent: "center",
        justifyContent: "space-between",
        gap: 2,

      }}>

        <IconButton onClick={fetchOrders}>
          <RefreshIcon sx={{ fontSize: 30 }} />
        </IconButton>

        <Typography variant="h4" sx={{ color: "#000" }}>
          Ordenes
        </Typography>
      </Box>

      <section className="shoppingCart__content">
        {
          orders && orders.map((order, index) => (
            <article key={index} >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                  padding: "0 1rem",
                  color: "#000",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #000",
                }}>
                
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    gap: "1rem",
                    justifyContent: "space-between",
                  }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ID: {order.id_order}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1, textAlign: "right" }}>
                    Fecha de envio: {order.delivery_date.split("-").reverse().join("/")}
                    <br/>
                    Fecha de creación: {order.creation_date.split("T")[0].split("-").reverse().join("/")}
                    <br/>
                    Estado: {order.status_name}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 1 }}>
                  Total: {order.total}
                  <br/>
                  Dirección: {order.address}
                </Typography>

                <OrderDetails id_order={order.id_order} order={order} />
              </Box>

            </article>
          ))
        }


        {
          orders.length === 0 &&
          <Typography variant="h5" sx={{ color: "#000" }}>
            No hay ordenes para mostrar
          </Typography>

        }
      </section>

    </div>
  )
}