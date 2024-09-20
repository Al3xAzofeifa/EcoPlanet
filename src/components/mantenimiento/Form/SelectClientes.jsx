import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

SelectClientes.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  onSelection: PropTypes.func,
};
export function SelectClientes({ field, data, onSelection }) {
  const handleChange = (event) => {
    // Propaga el evento al componente padre
    field.onChange(event);
    // Llama a la función de devolución de llamada con el valor seleccionado
    onSelection(event.target.value);
  };
  return (
    <>
      <>
        <InputLabel id="cliente" style={{ fontSize: "15px" }}>
          Clientes
        </InputLabel>
        <Select
          {...field}
          labelId="cliente"
          label="cliente"
          defaultValue=""
          value={field.value}
          onChange={handleChange}
        >
          {data &&
            data.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </MenuItem>
            ))}
        </Select>
      </>
    </>
  );
}
