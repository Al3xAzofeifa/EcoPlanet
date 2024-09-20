import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectMaterial.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelectionChange: PropTypes.func, // Nueva prop para manejar cambios de selección
};

export function SelectMaterial({ field, data }) {
  return (
    <>
      <>
        <InputLabel id="material">Materiales</InputLabel>
        <Select
          {...field}
          labelId="material"
          label="material"
          multiple
          defaultValue={[]}
          value={field.value}
        >
          {data &&
            data.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.descripcion}    
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
