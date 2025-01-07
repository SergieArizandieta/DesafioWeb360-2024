import "./styles.css"
import LogoNameBrand from "../LogoNameBrand/LogoNameBrand"
// eslint-disable-next-line react/prop-types
export default function Header({ Center, Right, link = "/" }) {
   
  return (
     <header className="Layout__header">
         <LogoNameBrand link={link} />
         {Center && <Center />}
         {Right && <Right />}
     </header>
  )
}
