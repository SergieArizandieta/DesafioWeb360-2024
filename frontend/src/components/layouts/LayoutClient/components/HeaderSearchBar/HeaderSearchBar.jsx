import { TextField } from "@mui/material";
import "./styles.css"


export default function HeaderSearchBar() {

  return (
    <div className="layoutClient__header__searchBarCenter">
      <TextField
        label="Buscar"
        variant="filled"
        color="quarternary"
        fullWidth
      />
    </div>
  )
}