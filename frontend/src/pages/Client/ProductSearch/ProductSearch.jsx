import Filters from "./components/Filters/Filters"
import "./styles.css"
import { useParams } from "react-router-dom";

import ListProducts from "./components/ListProducts/ListProducts";
import { useState } from "react";

export default function ProductSearch() {
  const { searchTerm } = useParams()
  const [resultsCount, setResultsCount] = useState([]);

  return (
    <div className="productSearch">
      <Filters searchTerm={searchTerm} resultsCount={resultsCount}/>
      <section className="productSearch__content" >
        <ListProducts searchTerm={searchTerm} setResultsCount={setResultsCount}/>
      </section>
    </div>
  )
}