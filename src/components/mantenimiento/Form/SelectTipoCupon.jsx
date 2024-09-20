import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectTipoCupon.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
};
export function SelectTipoCupon({ field, data }) {
  return (
    <>
      <>
      <InputLabel id='tipoCupon'>Tipo de Cupón</InputLabel>
        <Select
          {...field}
          labelId='tipoCupon'
          label='tipoCupon'
          defaultValue=''
          value={field.value}
        >
          {data &&
            data.map((tipoCupon) => (
              <MenuItem key={tipoCupon.id} value={tipoCupon.id}>
                {tipoCupon.descripcion}
              </MenuItem> 
            ))}
        </Select>
        
      </>
    </>
  );
}
