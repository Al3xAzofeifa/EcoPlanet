import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CentroAcopioService from "../../../services/CentroAcopioService";
import ProvinciaService from "../../../services/ProvinciaService";
import CantonService from "../../../services/CantonService";
import { SelectProvincia } from "../Form/SelectProvincias";
import { SelectCanton } from "../Form/SelectCanton";
import { SelectAdmin } from "../Form/SelectAdmin";
import { SelectMaterial } from "../Form/SelectMateriales";
import MaterialService from "../../../services/MaterialService";
import AdministradorService from "../../../services/AdministradorService";

//https://www.npmjs.com/package/@hookform/resolvers

export function CreateCentroAcopio() {
  //----------------------------------------------------[Variables para el codigo]--------------------------------------------------------
  const TipoUsuarioAdministrador = "2";
  //----------------------------------------------------[Variables para el codigo]--------------------------------------------------------

  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setValue("estado", event.target.value);
  };

  // Esquema de validación
  const CentroAcopioSchema = yup.object({
    nombre: yup.string().required("El nombre del centro es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    telefono: yup
      .number()
      .required("El teléfono es requerido")
      .typeError("El teléfono debe ser numérico")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? undefined : value
      )
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .test(
        "len",
        "El teléfono debe tener exactamente 8 dígitos",
        (val) => val && val.toString().length === 8
      ),
    horario: yup.string().required("El horario es requerido"),
    administrador: yup
      .mixed()
      .required("Se requiere un administrador para el centro de acopio"),
    Provincia: yup.mixed().required("Se requiere seleccionar una provincia"),
    Canton: yup.mixed().required("Se requiere seleccionar un cantón"),
    materiales: yup.array().min(1, "Se debe seleccionar mínimo un material"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      Provincia: [],
      Canton: [],
      direccion: "",
      telefono: "",
      horario: "",
      administrador: [],
      materiales: [],
    },
    // Asignación de validaciones
    resolver: yupResolver(CentroAcopioSchema),
  });

  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      //Crear centro
      if (CentroAcopioSchema.isValid()) {
        CentroAcopioService.crearCentro(DataForm)
          .then((response) => {
            console.log("Respuesta al crear el centro");
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success(response.data.results, {
                duration: 4000,
                position: "top-center",
              });
              // Redireccion a la tabla
              return navigate("/tabla-centrosAcopio");
            }
          })
          .catch((error) => {
            if (error instanceof SyntaxError) {
              console.log(error);
              setError(error);
              throw new Error("Respuesta no válida del servidor");
            }
          });
      }
    } catch (e) {
      //Capturar error
    }
  };

  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  //Lista de provincia
  const [dataProvincia, setdataProvincia] = useState({});
  const [loadedProvincia, setLoadedProvincia] = useState(false);
  useEffect(() => {
    ProvinciaService.getProvincias()
      .then((response) => {
        console.log(response);
        setdataProvincia(response.data.results);
        setLoadedProvincia(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedProvincia(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  //Lista de canton
  const [dataCanton, setDataCanton] = useState(null);
  const [loadedCanton, setLoadedCanton] = useState(false);
  // Obtener id_Provincia del formulario
  let [idProvincia, setIdProvincia] = useState(0);

  // Función para cargar cantones por id de provincia
  useEffect(() => {
    if (idProvincia !== null) {
      CantonService.getCantonByIdProvincia(idProvincia)
        .then((response) => {
          console.log(response);
          setDataCanton(response.data.results);
          setLoadedCanton(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedCanton(false);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [idProvincia]);

  //Lista de admins
  const [dataAdministrador, setDataAdministrador] = useState({});
  const [loadedAdministrador, setLoadedAdministrador] = useState(false);
  useEffect(() => {
    AdministradorService.getAdministradores() //aqui falta una consulta de solo los admins
      .then((response) => {
        const usuarioAdministrador = response.data.results.filter(
          (usuario) => usuario.TipoUsuario === TipoUsuarioAdministrador
        );
        console.log(usuarioAdministrador);
        setDataAdministrador(usuarioAdministrador);
        setLoadedAdministrador(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedAdministrador(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  //Lista de materiales
  const [dataMateriales, setDataMateriales] = useState({});
  const [loadedMateriales, setLoadedMateriales] = useState(false);
  useEffect(() => {
    MaterialService.getMateriales()
      .then((response) => {
        console.log(response);
        setDataMateriales(response.data.results);
        setLoadedMateriales(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedMateriales(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" gutterBottom>
              Crear centro de acopio
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="nombre"
                    label="Nombre del centro"
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="direccion"
                    label="Dirección"
                    error={Boolean(errors.direccion)}
                    helperText={
                      errors.direccion ? errors.direccion.message : " "
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="telefono"
                    label="Teléfono del centro"
                    error={Boolean(errors.telefono)}
                    inputProps={{ maxLength: 8 }}
                    helperText={errors.telefono ? errors.telefono.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <Controller
                name="horario"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="horario"
                    label="Horario del centro"
                    error={Boolean(errors.horario)}
                    helperText={errors.horario ? errors.horario.message : " "}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {loadedAdministrador ? (
                <Controller
                  name="administrador"
                  control={control}
                  render={({ field }) => (
                    <SelectAdmin
                      field={field}
                      data={dataAdministrador}
                      error={Boolean(errors.administrador)}
                      onChange={(e) =>
                        setValue("administrador", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              ) : (
                <p>No hay administradores disponibles</p>
              )}

              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.administrador ? errors.administrador.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Estado
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  row // Mostrar los RadioButtons en fila
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Activo"
                    checked={selectedValue === "1"}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Inactivo"
                    checked={selectedValue === "0"}
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de Provincia */}
              {loadedProvincia && (
                <Controller
                  name="Provincia"
                  control={control}
                  render={({ field }) => (
                    <SelectProvincia //esto se cambia
                      field={field}
                      data={dataProvincia}
                      error={Boolean(errors.Provincia)}
                      onSelection={(value) => {
                        setValue("Provincia", value, {
                          shouldValidate: true,
                        });
                        setIdProvincia(value);
                      }}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.Provincia ? errors.Provincia.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de Provincia */}
              {loadedCanton && (
                <Controller
                  name="Canton"
                  control={control}
                  render={({ field }) => (
                    <SelectCanton //esto se cambia
                      field={field}
                      data={dataCanton}
                      error={Boolean(errors.Canton)}
                      onChange={(e) =>
                        setValue("Canton", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.Canton ? errors.Canton.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
              {/* Lista de materiales */}
              {loadedMateriales && (
                <Controller
                  name="materiales"
                  control={control}
                  render={({ field }) => (
                    <SelectMaterial
                      field={field}
                      data={dataMateriales}
                      error={Boolean(errors.materiales)}
                      onChange={(e) =>
                        setValue("materiales", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {errors.materiales ? errors.materiales.message : " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
            >
              Crear centro
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
