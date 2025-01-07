import { Badge, IconButton } from "@mui/material";
import "./styles.css"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SingOut from "../../../../SingOut/SingOut";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '../../../../../storage/auth';
import { useNavigate } from "react-router-dom";

export default function HeaderButtons() {
  const navigate = useNavigate();
  const shoppingCart = useAuthStore((state) => state.shoppingCart);

  const handleShoppingCart = () => {
    navigate('/ShoppingCart')
  }

  return (
    <>
      <section className="layoutClient__header__buttonsRight" >
        <SingOut />
        <IconButton>
          <ShoppingBagIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={handleShoppingCart}>
          <Badge
            badgeContent={shoppingCart.length}
            color="error"
            overlap="circular"
            sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', minWidth: '18px', height: '18px' } }}
          >
            <ShoppingCartIcon sx={{ fontSize: 30 }} />
          </Badge>

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