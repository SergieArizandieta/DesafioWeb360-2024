import Filters from "./components/Filters/Filters"
import "./styles.css"
import { useParams } from "react-router-dom";

import ListProducts from "./components/ListProducts/ListProducts";
import { useState } from "react";

export default function ProductSearch() {
  const { searchTerm } = useParams()
  const [resultsCount, setResultsCount] = useState(0);
  const [page, setPage] = useState(1);


  return (
    <div className="productSearch">
      <Filters searchTerm={searchTerm} page={page} resultsCount={resultsCount}/>
      <section className="productSearch__content" >
        <ListProducts searchTerm={searchTerm} page={page} setPage={setPage} resultsCount={resultsCount} setResultsCount={setResultsCount}/>
      </section>
    </div>
  )
}