import { IconButton } from "@mui/material";
import "./styles.css"
import SingOut from "../../../../SingOut/SingOut";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export default function HeaderButtons() {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    console.log(path)
    navigate(path)
  }
  return (
    <>
      <section className="layoutClient__header__buttonsRight" >
        <SingOut />

        <IconButton onClick={() => handleRedirect("/Profile")}>
          <AccountCircleIcon sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton  onClick={() => handleRedirect("/Profile")}>
          <Inventory2Icon sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton  onClick={() => handleRedirect("/Products")}>
          <ProductionQuantityLimitsIcon sx={{ fontSize: 30 }} />
        </IconButton>
       
      </section>
      <section className="LayoutOperator__header__buttonsRightMobile">
        <IconButton>
          <MenuIcon sx={{ fontSize: 35, color: 'white' }} />
        </IconButton>
      </section>
    </>
  )
}