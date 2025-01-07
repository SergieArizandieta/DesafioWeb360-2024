import "./styles.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import { getOrders } from "./services/getOrders";
import { delOrder } from "./services/delOrder";
import CustomQuestionAlert from "../../../components/CustomQuestionAlert/CustomQuestionAlert";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import OrderDetails from "../../../components/OrderDetails/OrderDetails";




export default function DashBoard() {
  const [orders, setOrders] = useState([]);

  const handleApprove = async (row) => {
    const result = await CustomQuestionAlert("Aprobar Orden", "¿Estás seguro que deseas cancelar esta orden?")

    if (result.isConfirmed) {
      const data = {
        id_order: row.id_order,
        id_status: 1
      }

      delOrder(data)
        .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
        .then(() => fetchOrders())
        .catch((err) => {
          CustomAlert("Ah ocurrido un error", err, false)
        })
    }
  };

  const handleReject = async (row) => {
    const result = await CustomQuestionAlert("Cancelar Orden", "¿Estás seguro que deseas cancelar esta orden?")

    if (result.isConfirmed) {
      const data = {
        id_order: row.id_order,
        id_status: 2
      }

      delOrder(data)
        .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
        .then(() => fetchOrders())
        .catch((err) => {
          CustomAlert("Ah ocurrido un error", err, false)
        })
    }
  };

  const processRowUpdate = async(newRow, oldRow) => {

    const updatedFields = Object.keys(newRow).reduce((acc, key) => {
      if (newRow[key] !== oldRow[key]) {
        acc[key] = newRow[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      return newRow;
    }

    if (updatedFields.delivery_date) {
      const [day, month, year] = updatedFields.delivery_date.split("/")
      updatedFields.delivery_date = `${year}-${month}-${day}`
    }

    const data = {
      id_order: oldRow.id_order,
      ...updatedFields
    }
    

    const result = await delOrder(data)
        .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
        .then(() => fetchOrders())
        .then(() => newRow)
        .catch((err) => {
          CustomAlert("Ah ocurrido un error", err, false)
          return oldRow
        })

    return result
    
  };

  const columns = [
    { field: 'id_order', headerName: 'ID', width: 90 },
    {
      field: 'client_id_client',
      headerName: 'ID Cliente',
      width: 150,
    },
    {
      field: 'creation_date',
      headerName: 'Fecha de Creación',
      width: 150,
    },
    {
      field: 'delivery_date',
      headerName: 'Fecha de Entrega',
      width: 170,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
    },
    {
      field: 'address',
      headerName: 'Dirección',
      editable: true,
      sortable: false,
      width: 160,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleApprove(params.row)}
            sx={{ marginRight: 1 }}
          >
            Aprobar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleReject(params.row)}
          >
            Rechazar
          </Button>
        </Box>
      ),
    },
    {
      field: 'details',
      headerName: 'Detalles',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <OrderDetails id_order={params.row.id_order} order={params.row} idUserDPIParam={params.row.client_id_client} />
      ),
    },
  ];

  const fetchOrders = () => {
    const params = {
      limit: 100,
    }
    getOrders(params)
      .then((res) => {
        const orders = res.data.rows.map((order) => {
          return { ...order, id: order.id_order }
        })
        setOrders(orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="DashBoard">
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
          Ordenes Pendientes
        </Typography>
      </Box>

      <br />

      <Box sx={{ height: '100%', width: '100%', padding: "0rem 3rem" }}>
        <DataGrid
          sx={{ color: "#000" }}
          rows={orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </div>
  )
}