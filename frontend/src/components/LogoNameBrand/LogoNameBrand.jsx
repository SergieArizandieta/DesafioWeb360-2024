import "./styles.css"
import logo from "../../assets/img/logo.png"

export default function LogoNameBrand() {

  return (
      <section className="LogoName__brand" >
         <img src={logo} alt="logo" />
         <h1>Mi Tiendita Online</h1>
      </section>
  )
}
