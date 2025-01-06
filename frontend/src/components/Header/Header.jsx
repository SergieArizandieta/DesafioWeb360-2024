import "./styles.css"
import LogoNameBrand from "../LogoNameBrand/LogoNameBrand"
// eslint-disable-next-line react/prop-types
export default function Header({ Center, Right }) {
   
  return (
     <header className="LayoutLading__header">
         <LogoNameBrand />
         {Center && <Center />}
         {Right && <Right />}
     </header>
  )
}
