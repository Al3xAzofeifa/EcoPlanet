import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";

SelectDetalles_CanjeoMateriales.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelectionChange: PropTypes.func, // Nueva prop para manejar cambios de selección
};

export function SelectDetalles_CanjeoMateriales({ field, data }) {
  return (
    <>
      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
        <InputLabel id="material">Materiales</InputLabel>
        <Select
          {...field}
          labelId="material"
          label="material"
          defaultValue=""
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.descripcion}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
