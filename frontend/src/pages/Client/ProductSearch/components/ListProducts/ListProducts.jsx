import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";
import { getProducts } from "../../services/getProducts";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ListProducts({ searchTerm, setResultsCount}) {
  const [searchParams] = useSearchParams();
  const { sortBy = "id_product", sortOrder = "ASC" } = Object.fromEntries(searchParams.entries());
  const [page, setPage] = useState(1);
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
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Anterior
        </button>

        <span>Página {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.data?.length < limit || isFetching}
        >
          Siguiente
        </button>
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
