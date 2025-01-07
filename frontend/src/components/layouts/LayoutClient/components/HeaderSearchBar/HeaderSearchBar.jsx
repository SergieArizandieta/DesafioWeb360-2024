import { TextField } from "@mui/material";


export default function HeaderSearchBar() {

  return (
    <div style={{padding: "0px 50px", width: "100%", maxWidth: "1000px"}}>
      <TextField
        label="Buscar"
        variant="filled"
        color="quarternary"
        fullWidth
      />
    </div>
  )
}