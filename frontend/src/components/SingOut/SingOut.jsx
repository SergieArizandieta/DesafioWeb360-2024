import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { singOut_Service } from "./services/singOut";
import CustomAlert from "../CustomAlert/CustomAlert";
import { useAuthStore } from '../../storage/auth';


export default function SingOut() {

  const logout = useAuthStore((state) => state.logout);
  const fullName = useAuthStore((state) => state.fullName);

  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSingOut = async() => {
    singOut_Service()
    .then(async(res) => await CustomAlert("Exitoso", res.message, true))
    .then(() => {    
      logout();
    })
    .catch((err) => {
      CustomAlert("Ah ocurrido un error", err, false)
    })

    handleClose();
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar sx={{bgcolor: '#403d33',}}>{fullName.substring(0, 2).toUpperCase()}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSingOut} disableRipple sx={{ color: '#403d33' }}>
          <LogoutIcon />
          Salir
        </MenuItem>
      </Menu>
    </>
  )
}