import "./styles.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import CustomQuestionAlert from "../../../components/CustomQuestionAlert/CustomQuestionAlert";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import { getProducts } from "./services/getProducts";
import { updateProduct } from "./services/updateProduct";
import DeleteIcon from '@mui/icons-material/Delete';



export default function Products() {
  const [products, setProduts] = useState([]);

    const updateImgProduct =  async(e,id_product) => {
      console.log("updateImgProduct")
      console.log(e.target.files[0])
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("id_product", id_product);
      const result = await updateProduct(formData)
        .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
        .then(() => fetchOrders())
        .catch((err) => {
          CustomAlert("Ah ocurrido un error", err, false)
        })

      return result
    }

    const processRowUpdate = async (newRow, oldRow) => {
      console.log("processRowUpdate")

      const updatedFields = Object.keys(newRow).reduce((acc, key) => {
        if (newRow[key] !== oldRow[key]) {
          acc[key] = newRow[key];
        }
        return acc;
      }, {});

      if (Object.keys(updatedFields).length === 0) {
        return newRow;
      }

      const data = {
        id_product: newRow.id_product,
        ...updatedFields
      }

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
      });

      console.log("data", formData)

      const result = await updateProduct(formData)
        .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
        .then(() => fetchOrders())
        .then(() => newRow)
        .catch((err) => {
          CustomAlert("Ah ocurrido un error", err, false)
          return oldRow
        })

      return result

    };

    const handleDelete = async (row) => {
      const result = await CustomQuestionAlert("Eliminar", "¿Estás seguro de eliminar este producto?")

      if (result.isConfirmed) {
        const data = {
          id_product: row.id_product,
          status_id_status: 2
        }

        const result = await updateProduct(data)
          .then(async (res) => { await CustomAlert("Exitoso", res.message, true); })
          .then(() => fetchOrders())
          .catch((err) => {
            CustomAlert("Ah ocurrido un error", err, false)
          })

        return result
      }
    }

  const columns = [
    { field: 'id_product', headerName: 'ID', width: 10 },
    {
      field: 'code',
      headerName: 'code',
      width: 100,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200,
      editable: true,
    },
    {
      field: 'brand',
      headerName: 'Marca',
      width: 150,
      editable: true,
    },
    {
      field: 'stock',
      headerName: 'stock',
      width: 100,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 100,
      editable: true,
    },
    {
      field: 'category_id_category',
      headerName: 'ID Categoria',
      width: 150,
    },
    {
      field: 'status_id_status',
      headerName: 'ID Estado',
      width: 150,
    },
    {
      field: "picture",
      headerName: "Imagen",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={params.row.picture}
            alt="Imagen"
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
          />

          <Button
            sx={{ marginLeft: 5 }}
            variant="contained"
            component="label"
            color="secondary"
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => updateImgProduct(e, params.row.id_product)}
            />
          </Button>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 70,
      sortable: false,
      renderCell: (params) => (
       <IconButton onClick={() => handleDelete(params.row)}>
        <DeleteIcon sx={{ fontSize: 30, color: "red"}}  />
       </IconButton>
      ),
    },
  ];

  const fetchOrders = () => {
    const params = {
      limit: 100,
    }

    getProducts(params)
      .then((res) => {
        const products = res.data.rows.map((product) => {
          return { ...product, id: product.id_product }
        })
        setProduts(products)
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
          Productos
        </Typography>

        <Button variant="contained" color="secondary" onClick={fetchOrders}>
          Nuevo
        </Button>
      </Box>

      <br />

      <Box sx={{ height: '100%', width: '100%', padding: "0rem 3rem" }}>
        <DataGrid
          sx={{ color: "#000" }}
          rows={products}
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