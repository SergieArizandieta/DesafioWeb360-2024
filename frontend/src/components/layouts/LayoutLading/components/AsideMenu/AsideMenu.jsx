import "./styles.css"
import LogoNameBrand from "../../../../LogoNameBrand/LogoNameBrand"
import { useTheme } from '@mui/material/styles';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function AsideMenu({ handleCloseMenu }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    handleCloseMenu();
    navigate(path);
  };

  return (
    <aside className="layoutLading__asideMenu">
      <div className="layoutLading__asideMenu__container">
        <section style={{ backgroundColor: theme.palette.primary.main }}>
          <IconButton color="inherit" aria-label="menu" onClick={handleCloseMenu} >
            <CloseIcon sx={{ fontSize: 32.5 }} />
          </IconButton>
        </section>
        <section style={{ backgroundColor: theme.palette.primary.main }}>
          <LogoNameBrand />
        </section>
        <section onClick={() => handleNavigation('/SingIn')} >
          <IconButton color="secondary" >
            <LoginIcon sx={{ fontSize: 32.5 }} />
          </IconButton>
          Iniciar Sesión
        </section>
        <section>
          <IconButton color="secondary" >
            <PersonAddIcon sx={{ fontSize: 32.5 }} />
          </IconButton>
          Registrarse
        </section>
      </div>
    </aside>
  )
}
