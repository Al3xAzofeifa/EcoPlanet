import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RecyclingIcon from "@mui/icons-material/Recycling";
import Tooltip from "@mui/material/Tooltip";
import { SelectDetalles_CanjeoMateriales } from "../Form/SelectDetalles_CanjeoMateriales";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

MaterialesForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSelectionChange: PropTypes.func, // Nueva prop para manejar cambios de selección
  field: PropTypes.object,
};

export function MaterialesForm({
  data,
  control,
  index,
  onRemove,
  disableRemoveButton,
  onInputChange,
  //field,
}) {
  return (
    <section key={index}>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem
            style={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <ListItemIcon>
              <Tooltip title={`Materiales ${index + 1}`}>
                <IconButton>
                  <RecyclingIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>

            <ListItemText>
              <Controller
                key={index}
                name={`materiales.${index}.idMaterial`}
                control={control}
                render={({ field }) => (
                  <SelectDetalles_CanjeoMateriales field={field} data={data} />
                )}
              />
            </ListItemText>

            <ListItemText sx={{ m: 2 }}>
              <Controller
                key={index}
                name={`materiales.${index}.cantidad`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    inputProps={{ min: 0 }}
                    label="cantidad"
                    onChange={(e) => {
                      onInputChange(
                        index,
                        `materiales.${index}.cantidad`,
                        e.target.value
                      );
                      // Importante agregar esta línea para que react-hook-form rastree los cambios
                    }}
                  />
                )}
              />
            </ListItemText>

            <ListItemIcon>
              <Tooltip title={`Eliminar material ${index + 1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge="end"
                    disabled={disableRemoveButton}
                    onClick={() => onRemove(index)}
                    aria-label="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  );
}
