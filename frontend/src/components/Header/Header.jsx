import "./styles.css"
import logo from "../../assets/img/logo.png"

// eslint-disable-next-line react/prop-types
export default function Header({ Center, Right }) {

  return (
     <header className="LayoutLading__header">
         <section className="LayoutLading__header__brand" >
            <img src={logo} alt="logo" />
            <h1>Mi Tiendita Online</h1>
         </section>
         {Center && <Center />}
         {Right && <Right />}
     </header>
  )
}
