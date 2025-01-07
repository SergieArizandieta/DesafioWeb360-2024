import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/getProducts";
import { useSearchParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// eslint-disable-next-line react/prop-types
export default function ListProducts({ searchTerm, page, setPage, resultsCount, setResultsCount }) {
  const [searchParams] = useSearchParams();
  const { sortBy = "id_product", sortOrder = "ASC" } = Object.fromEntries(searchParams.entries());
  const limit = 10;

  const fetchProducts = async ({ queryKey }) => {
    const { searchTerm, page, limit } = queryKey[1];

    const params = {
      filterBy: "name",
      filterValue: searchTerm,
      sortBy: sortBy,
      sortOrder: sortOrder,
      page,
      limit,
    }

    const response = await getProducts(params)
    setResultsCount(response.data.count)
    const data = {
      data: response.data.rows,
    }
    return data;
  };

  // Uso de React Query para manejar el fetching de productos
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products", { searchTerm, page, limit, sortBy, sortOrder }],
    queryFn: fetchProducts,
    keepPreviousData: true, // Mantiene los datos mientras se obtienen nuevos
    staleTime: 5000, // Los datos se consideran frescos por 5 segundos
  });

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p>Error al cargar los productos.</p>;


  return (
    <div>
      <div className="pagination-controls">
        

        <IconButton
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isFetching}
          sx={{
            width: 40,
            height: 40,
          }}>
          <ArrowBackIosNewIcon
            sx={{ fontSize: 30 }}
          />
        </IconButton>

        <div
          style={{
            display: "flex",
            gap: "10px",
            cursor: "pointer",
          }}>
          {resultsCount > 0 &&
            Array.from({ length: Math.ceil(resultsCount / limit) }, (_, i) => (
              <p
                key={i}
                onClick={() => setPage(i + 1)}
                disabled={isFetching}
                style={{
                  color: i + 1 === page ? "#60c6b4" : "black",
                  fontWeight: i + 1 === page ? "bold" : "normal",
                  textDecoration: i + 1 === page ? "underline" : "none",
                }}
              >
                {i + 1}
              </p>
            ))
          }
        </div>

        <IconButton
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.data?.length < limit || isFetching}
          sx={{
            width: 40,
            height: 40,
          }}>
          <ArrowForwardIosIcon
            sx={{ fontSize: 30 }}
          />
        </IconButton>
      </div>

      <div className="product-list">
        {data.data && data.data.map((product) => (
          <ProductCard key={product.id_product} product={product} />
        ))}
      </div>



      {isFetching && <p>Actualizando productos...</p>}
    </div>
  );
}
