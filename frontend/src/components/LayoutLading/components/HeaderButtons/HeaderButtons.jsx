import "./styles.css"
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function HeaderButtons() {
  return (
   <>
      <section className="layoutLading__header__buttonsRight" >
         <Button variant="contained" color="tertiary" >Inicia Sesión</Button>
         <Button variant="contained" color="secondary" >Registrate</Button>
      </section>
      <section className="layoutLading__header__buttonsRightMobile">
         <IconButton color="secondary"><MenuIcon  sx={{ fontSize: 35 }}/></IconButton>
      </section>
   </>
  )
}