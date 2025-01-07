import Filters from "./components/Filters/Filters"
import "./styles.css"
import { useParams } from "react-router-dom";

import ListProducts from "./components/ListProducts/ListProducts";

export default function ProductSearch() {
  const { searchTerm } = useParams()

  return (
    <div className="productSearch">
      <Filters searchTerm={searchTerm}/>
      <section className="productSearch__content" >
        <ListProducts searchTerm={searchTerm}/>
      </section>
    </div>
  )
}