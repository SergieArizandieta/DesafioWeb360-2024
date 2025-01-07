/* eslint-disable react/prop-types */
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { getDetails } from "../../services/getDetails";
import { useAuthStore } from '../../../../../storage/auth';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  minWidth: 300,
  maxWidth: 600,
  maxHeight: "80svh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "#000",
  overflowY: "auto",
};

export default function OrderDetails({ id_order, order }) {
  const idUserDPI = useAuthStore((state) => state.idUserDPI);

  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchDetails = () => {
    const params = {
      id_order: id_order,
      client_id_client: idUserDPI,
    }
    getDetails(params)
      .then((res) => {
        console.log("res", res.data)
        setDetails(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleOpen = () => {
    setOpen(true);
    fetchDetails()
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" fullWidth value={id_order} onClick={handleOpen}>
        Ver Detalles
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton onClick={handleClose} sx={{
              position: 'absolute',
              top: 0,
              right: 10,
              color: "red",
            }}>
              <CloseIcon
                sx={{ fontSize: 30 }}
              />
            </IconButton>
            <Box>

              <Box
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  height: "100%",
                  gap: "1rem",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #60c6b4",
                  marginBottom: "1rem",
                }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ID: {order.id_order}
                  <br />
                  <Typography variant="h7" sx={{ mb: 1 }}>
                    Total: {order.total}
                    <br />
                    <br />
                    Dirección: {order.address}
                  </Typography>
                </Typography>

                <Typography variant="body2" sx={{ mb: 1, textAlign: "right" }}>
                  Fecha de envio: {order.delivery_date}
                  <br />
                  Fecha de creación: {order.creation_date}
                  <br />
                  Estado: {order.status_name}
                </Typography>
              </Box>

              {
                details && details.map((detail, index) => (
                  <Box key={index} sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: "20px",
                    borderBottom: "1px solid gray",
                  }}>
                    <Box
                      component="img"
                      src={detail.picture}
                      alt={detail.name}
                      sx={{ width: "200px", height: "200px", objectFit: "cover", mb: 2 }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        height: "100%",
                        padding: "0 1rem",
                      }}>

                      <Typography variant="h6" sx={{ mb: 1, minWidth: 200 }} color="secondary"  >
                        {detail.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {detail.brand}
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                        Precio: Q{detail.price.toFixed(2)}
                        <br />
                        Cantidad: {detail.quantity}
                        <br />
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, borderTop: "1px solid gray"}}>
                        Subtotal: Q{(detail.subtotal).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ))}

              <Box sx={{marginTop: "1rem",}}>
                <Typography variant="h5" sx={{ color: "#000"}}>
                  Total: Q{details.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}
                </Typography>
              </Box>

            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}