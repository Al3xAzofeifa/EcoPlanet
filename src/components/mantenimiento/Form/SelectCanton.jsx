import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectCanton.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};
export function SelectCanton({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection(event.target.value);
  };
  return (
    <>
      <>
        <InputLabel id="canton">Cantón</InputLabel>
        <Select
          {...field}
          labelId="canton"
          label="canton"
          defaultValue=""
          value={field.value}
          onChange={handleChange}
        >
          {data &&
            data
              .slice() // Crea una copia del array para no modificar el original
              .sort((a, b) => a.id - b.id) // Ordena ascendente por el campo id
              .map((canton) => (
                <MenuItem key={canton.id} value={canton.id}>
                  {`${canton.descripcion}`}
                </MenuItem>
              ))}
        </Select>
      </>
    </>
  );
}
