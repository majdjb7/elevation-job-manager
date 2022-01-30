import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ selectBy, ArrMenuItems, choice }) {
  const [menuItem, setMenuItem] = React.useState("");

  const handleChange = (event) => {
    setMenuItem(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100, maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectBy}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="menuItem"
          onChange={handleChange}
        >
          {ArrMenuItems.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
