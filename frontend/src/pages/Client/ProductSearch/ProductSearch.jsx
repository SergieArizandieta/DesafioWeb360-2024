import Filters from "./components/Filters/Filters"
import ProductCard from "./components/ProductCard/ProductCard";
import "./styles.css"
import { useParams } from "react-router-dom";

import product13 from "../../../assets/img/products/product13.jpg";

export default function ProductSearch() {
  const { searchTerm } = useParams()

  const product = {
    name: "Wireless Headphones",
    brand: "AudioBrand",
    price: 99.99,
    stock: 150,
    image: product13
  }
  return (
    <div className="productSearch">
      <Filters searchTerm={searchTerm}/>
      <section className="productSearch__content" >
        <ProductCard product={product}/>
        {
          Array(20).fill().map((_, index) => <ProductCard key={index} product={product}/>)
        }
      </section>
    </div>
  )
}