import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectDistrito.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};
export function SelectDistrito({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection(event.target.value);
  };
  return (
    <>
      <>
        <InputLabel id="distrito">Distrito</InputLabel>
        <Select
          {...field}
          labelId="distrito"
          label="distrito"
          defaultValue=""
          value={field.value}
          onChange={handleChange}
        >
          {data &&
            data
              .slice() // Crea una copia del array para no modificar el original
              .sort((a, b) => a.id - b.id) // Ordena ascendente por el campo id
              .map((distrito) => (
                <MenuItem key={distrito.id} value={distrito.id}>
                  {`${distrito.descripcion}`}
                </MenuItem>
              ))}
        </Select>
      </>
    </>
  );
}
