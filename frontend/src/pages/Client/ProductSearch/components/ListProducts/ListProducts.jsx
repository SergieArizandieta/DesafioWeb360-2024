import ProductCard from "../ProductCard/ProductCard";

import product13 from "../../../../../assets/img/products/product13.jpg";

// eslint-disable-next-line react/prop-types
export default function ListProducts({searchTerm}) {

  const product = {
    name: "Wireless Headphones",
    brand: "AudioBrand",
    price: 99.99,
    stock: 150,
    image: product13
  }
  return (
    <>
        {
          Array(20).fill().map((_, index) => <ProductCard key={index} product={product}/>)
        }
    
    </>
  )
}