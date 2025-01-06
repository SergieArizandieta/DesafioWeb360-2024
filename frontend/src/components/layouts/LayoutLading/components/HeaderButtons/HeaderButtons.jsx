import "./styles.css"
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AsideMenu from "../AsideMenu/AsideMenu";
import { Link } from 'react-router-dom';

export default function HeaderButtons() {

   const handleOpenMenu = () => {
      const menu = document.querySelector(".layoutLading__asideMenu")
      menu.classList.add("open")

      const body = document.querySelector("body")
      body.style.overflow = "hidden"
    };

    const handleCloseMenu = () => {
      const menu = document.querySelector(".layoutLading__asideMenu")
      menu.classList.remove("open")

      const body = document.querySelector("body")
      body.style.overflow = ""
     
      }
  return (
   <>
      <section className="layoutLading__header__buttonsRight" >
         <Button 
            variant="contained" 
            color="tertiary" 
            component={Link}
            to="/SingIn">
               Inicia Sesión
         </Button>
         <Button 
            variant="contained" 
            color="secondary" 
            component={Link}
            to="/SingUp">
               Registrate
         </Button>
      </section>
      <section className="layoutLading__header__buttonsRightMobile">
         <IconButton onClick={handleOpenMenu}>
            <MenuIcon sx={{ fontSize: 35, color: 'white'}} />
         </IconButton>
      </section>
      <AsideMenu handleCloseMenu={handleCloseMenu}/>
   </>
  )
}