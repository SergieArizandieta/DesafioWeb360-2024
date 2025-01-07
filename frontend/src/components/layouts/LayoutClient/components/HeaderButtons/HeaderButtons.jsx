import { IconButton } from "@mui/material";
import "./styles.css"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SingOut from "../../../../SingOut/SingOut";
import MenuIcon from '@mui/icons-material/Menu';


export default function HeaderButtons() {


  return (
    <>
      <section className="layoutClient__header__buttonsRight" >
        <SingOut />
        <IconButton>
          <ShoppingBagIcon  sx={{ fontSize: 30 }}/>
        </IconButton>
        <IconButton>
          <ShoppingCartIcon sx={{ fontSize: 30 }}/>
        </IconButton>
      </section>
      <section className="layoutClient__header__buttonsRightMobile">
        <IconButton>
          <MenuIcon sx={{ fontSize: 35, color: 'white' }} />
        </IconButton>
      </section>
    </>
  )
}