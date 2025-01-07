import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css"


export default function HeaderSearchBar() {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value;
      navigate(`/s/${searchTerm}`);
    }
  };

  return (
    <div className="layoutClient__header__searchBarCenter">
      <TextField
        label="Buscar"
        variant="filled"
        color="quarternary"
        onKeyDown={handleKeyDown}
        fullWidth
      />
    </div>
  )
}