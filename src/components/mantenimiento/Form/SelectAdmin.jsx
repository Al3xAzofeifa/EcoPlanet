import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectAdmin.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectAdmin({ field, data }) {
  return (
    <>
      <>
      <InputLabel id='admin'>Administrador de Centro de Acopio</InputLabel>
        <Select
          {...field}
          labelId='admin'
          label='admin'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((admin) => (
              <MenuItem key={admin.id} value={admin.id}>
                {admin.nombre}
              </MenuItem> 
            ))}
        </Select>
        
      </>
    </>
  );
}
