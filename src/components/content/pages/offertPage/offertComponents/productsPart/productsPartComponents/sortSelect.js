import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortSelect(prop) {
  const handleChange = (event) => {
    prop.setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Sortuj</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={prop.sort}
          label="Sortuj"
          onChange={handleChange}
        >
          <MenuItem value={"priceRise"}>Cena: rosnąco</MenuItem>
          <MenuItem value={"priceDecreas"}>Cena: malejąco</MenuItem>
          <MenuItem value={"ratingRise"}>Ocena: rosnąco</MenuItem>
          <MenuItem value={"ratingDecreas"}>Ocena: malejąco</MenuItem>
          <MenuItem value={"aToZ"}>Alfabetycznie: A do Z</MenuItem>
          <MenuItem value={"zToA"}>Alfabetycznie: Z do A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
