import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Filters({searchTerm,page,resultsCount }) {
  const navigate = useNavigate();
  const [filterBy, setFilter] = useState('');

  const handleChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    let sortOrder = "ASC";
    let sortBy = "id_product";

    if(newFilter === 2 || newFilter === 1) {
      sortBy = "price";
      sortOrder = newFilter === 1 ? "ASC" : "DESC";
    }

    if(newFilter === 3 || newFilter === 4) {
      sortBy = "creation_date";
      sortOrder = newFilter === 3 ? "DESC" : "ASC";
    }

    navigate(`?sortOrder=${encodeURIComponent(sortOrder)}&sortBy=${encodeURIComponent(sortBy)}`);
  };

  return (
    <section className="productSearch__filters" >
      <article>
        <Typography variant="h6" sx={{fontSize: "0.8rem"}}> {resultsCount === 0 ? 0 : ((page-1)*10)+1}  a { page*10 > resultsCount ? resultsCount:page*10} de {resultsCount} resultados para <span style={{ color: "red"}}> &quot;{searchTerm}&quot;  </span></Typography>
      </article>

      <article>
        <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel sx={{ fontSize: "1rem" }}>Filtrar Por:</InputLabel>
          <Select
            value={filterBy}
            onChange={handleChange}
            sx={{
              color: "#000",
              height: "30px", 
              fontSize: "0.8rem",
            }}
          >
            <MenuItem value={1} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Precio: Menor a Mayor
            </MenuItem>
            <MenuItem value={2} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Precio: Mayor a Menor
            </MenuItem>
            <MenuItem value={3} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Llegada: Más reciente
            </MenuItem>
            <MenuItem value={4} sx={{ color: "#000", fontSize: "0.8rem" }}>
              Llegada: Más antiguos
            </MenuItem>
          </Select>
        </FormControl>

      </article>


    </section>
  )
}