import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';

export default function Filters({searchTerm}) {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <section className="productSearch__filters" >
      <article>
        <Typography variant="h6" sx={{fontSize: "0.8rem"}}>1 a 16 de más de 10,000 resultados para <span style={{ color: "red"}}> "{searchTerm}"  </span></Typography>
      </article>

      <article>
        <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel sx={{ fontSize: "1rem" }}>Filtrar Por:</InputLabel>
          <Select
            value={age}
            onChange={handleChange}
            sx={{
              color: "#000",
              height: "30px", 
              fontSize: "0.8rem",
            }}
          >
            <MenuItem value={10} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Precio: Menor a Mayor
            </MenuItem>
            <MenuItem value={20} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Precio: Mayor a Menor
            </MenuItem>
            <MenuItem value={30} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Llegada: más reciente
            </MenuItem>
            <MenuItem value={30} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Llegada: más antiguos
            </MenuItem>
          </Select>
        </FormControl>

      </article>


    </section>
  )
}