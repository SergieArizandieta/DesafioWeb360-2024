import CategoryCard from "./components/CategoryCard/CategoryCard";
import StoreCategories from "./components/StoreCategories/StoreCategories";
import StoreGalery from "./components/StoreGalery/StoreGalery";
import "./styles.css"

import product1 from "../../../assets/img/products/product1.jpg";
import product2 from "../../../assets/img/products/product2.jpg";
import product3 from "../../../assets/img/products/product3.jpg";
import product4 from "../../../assets/img/products/product4.jpg";

import product5 from "../../../assets/img/products/product5.jpg";
import product6 from "../../../assets/img/products/product6.jpg";
import product7 from "../../../assets/img/products/product7.jpg";
import product8 from "../../../assets/img/products/product8.jpg";

import product9 from "../../../assets/img/products/product9.jpg";
import product10 from "../../../assets/img/products/product10.jpg";
import product11 from "../../../assets/img/products/product11.jpg";
import product12 from "../../../assets/img/products/product12.jpg";

export default function Store() {

  const imagesArr1 = [
    {
      img: product1,
      title: "Sillas"
    },
    {
      img: product2,
      title: "Headset"
    },
    {
      img: product3,
      title: "Teclados"
    },
    { 
      img: product4,
      title: "Mouse"
    }
  ]

  const imagesArr2 = [
    {
      img: product5,
      title: "Ropa para cama"
    },
    {
      img: product6,
      title: "Decoración"
    },
    {
      img: product7,
      title: "Almacenamiento"
    },
    { 
      img: product8,
      title: "Liempieza"
    }
  ]

  const imagesArr3 = [
    {
      img: product9,
      title: "Ollas y sartenes"
    },
    {
      img: product10,
      title: "Mejoras de cocina"
    },
    {
      img: product11,
      title: "Decoración"
    },
    { 
      img: product12,
      title: "Ropa de cama y baño"
    }
  ]

  return (
    <div className="store">
      <StoreCategories/>
      <section className="store__content" >
        <article className="store__content__galery" >
          <StoreGalery/>
        </article>
        <article className="store__content__cards">
          <CategoryCard title={"Accesorios para juegos"} imagesArr={imagesArr1}/>
          <CategoryCard title={"Compra los esenciales para tu hogar"} imagesArr={imagesArr2}/>
          <CategoryCard title={"Novedades en cocina"} imagesArr={imagesArr3}/>
        </article>
      </section>

    </div>
  )
}