import "./styles.css"
import logo from "../../assets/img/logo.png"
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
export default function LogoNameBrand({ link }) {
  const navigate = useNavigate();

  return (
    <section className="LogoName__brand" onClick={() => navigate(link)}>
      <img src={logo} alt="logo" />
      <h1>Mi Tiendita Online</h1>
    </section>
  )
}
