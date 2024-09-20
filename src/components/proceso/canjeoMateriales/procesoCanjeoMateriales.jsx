import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  FormHelperText,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CentroAcopioService from "../../../services/CentroAcopioService";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../../services/UsuarioService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SelectClientes } from "../../mantenimiento/Form/SelectClientes";
import Material_CentroAcopioService from "../../../services/Material_CentroAcopioService";
import AddIcon from "@mui/icons-material/Add";
import { MaterialesForm } from "../../mantenimiento/Form/MaterialesForm";
import toast from "react-hot-toast";
//import CanjeoMaterialesService from "../../../services/CanjeoMaterialesService";
import Button from "@mui/material/Button";
import ProcesoCanjeoService from "../../../services/ProcesoCanjeoService";
import { UserContext } from "../../../context/UserContext";

export function ProcesoCanjeoMateriales() {
  //----------------------------------------------------------------------------------------------------------------------------------
  //Obtener la informacion del ususario logueado
  //Autorize para ocultar
  const { user, decodeToken } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Useffect para que cargue rapido
  useEffect(() => {
    setUserData(decodeToken());
  }, [user]);
  //----------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------[Variables para el codigo]--------------------------------------------------------------

  const navigate = useNavigate();
  const TipoUsuarioCliente = "3";
  const fechaActual = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const fechaConFormato = fechaActual.toLocaleDateString("es-ES", options);
  var totalEcomonedasCanjeo = 0;

  //-------------------------------------------------------------------------------------

  // Esquema de validación
  const canjeoMaterialesSchema = yup.object({
    centroAcopio: yup
      .number()
      .typeError("El centro de acopio es requerido")
      .required("El centro de acopio es requerido"),
    totalEcomonedas: yup
      .number()
      .typeError("El total de ecomonedas es requerido")
      .required("El total de ecomonedas es requerido"),
    usuario: yup
      .number()
      .typeError("El cliente es requerido")
      .required("El cliente es requerido"),
    materiales: yup.array().of(
      yup.object().shape({
        idMaterial: yup
          .number()
          .typeError("El material es requerido")
          .required("El material es requerido"),
        cantidad: yup
          .number()
          .typeError("La cantidad es requerida")
          .required("La cantidad es requerida")
          .moreThan(0, "La cantidad debe ser mayor que 0"),
        nombre: yup
          .string()
          .typeError("El nombre del material es requerido")
          .required("El nombre del material es requerido"),
        descripcion: yup
          .string()
          .typeError("La descripción del material es requerida")
          .required("La descripción del material es requerida"),
        precio: yup
          .number()
          .typeError("El precio del material es requerido")
          .required("El precio del material es requerido"),
        subtotal: yup
          .number()
          .typeError("El subtotal del material es requerido")
          .required("El subtotal del material es requerido"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: fechaConFormato,
      usuario: "",
      centroAcopio: "",
      totalEcomonedas: totalEcomonedasCanjeo,
      materiales: [
        {
          idMaterial: "",
          nombre: "",
          descripcion: "",
          precio: 0,
          cantidad: 0,
          subtotal: 0,
        },
      ],
    },
    // Asignación de validaciones
    resolver: yupResolver(canjeoMaterialesSchema),
  });

  //-----------------------------------------------------------------------------------------------------------------------------
  // Accion submit
  const [error, setError] = useState("");

  // Accion submit
  const onSubmit = (DataForm) => {
    console.log("Formulario:");
    console.log(DataForm);

    try {
      //Crear centro
      if (canjeoMaterialesSchema.isValid()) {
        ProcesoCanjeoService.crearCanjeo(DataForm)
          .then((response) => {
            console.log("Respuesta al crear el centro");
            console.log(response);
            setError(response.error);
            //Respuesta al usuario de creación
            if (response.data.results != null) {
              toast.success("Canjeo realizado exitosamente", {
                duration: 4000,
                position: "top-center",
              });

              return navigate("/canjeosmaterialesByAdmin");
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

  //-----------------------------------------------------------------------------------------------------------------------------

  //Seguimiento de la variable actores Watch
  const watchMaterial = watch("materiales");

  //On change para realizar los calculos
  const handleInputChange = (index, name, value) => {
    // Obtienes todos los valores del formulario
    const valores = getValues();

    // Validar que el material no se haya seleccionado previamente
    const isMaterialRepeated = watchMaterial
      .slice(0, index)
      .some(
        (material) =>
          material.idMaterial === valores.materiales[index].idMaterial
      );

    if (isMaterialRepeated) {
      // Material repetido, mostrar un toast en lugar de agregarlo a la tabla
      toast.error("Material ya agregado", {
        duration: 4000,
        position: "top-center",
      });
      return;
    } else {
      // Material no repetido, continuar con la lógica para agregarlo a la tabla
      // Asignar valor en el formulario al control indicado
      setValue(name, value);

      // Encontrar el material correspondiente
      const selectedMaterial = dataMateriales.find(
        (material) => material.id === valores.materiales[index].idMaterial
      );

      // Verificar si se encontró un material antes de asignar valores
      if (selectedMaterial) {
        setValue(`materiales[${index}].nombre`, selectedMaterial.nombre);
        setValue(
          `materiales[${index}].descripcion`,
          selectedMaterial.descripcion
        );
        setValue(`materiales[${index}].precio`, selectedMaterial.precio);
        setValue(
          `materiales[${index}].subtotal`,
          parseFloat(
            selectedMaterial.precio * valores.materiales[index].cantidad
          )
        );
      }

      // Calcular el total
      let totalEcomonedas = 0;

      valores.materiales.forEach((item) => {
        // Acordarse castear o convertir a número
        totalEcomonedas += parseFloat(item.subtotal || 0);
      });

      // Asignar el total al campo "totalEcomonedas"
      setValue("totalEcomonedas", totalEcomonedas);

      // Asignar el total al campo "total"
      if (data && data.id) {
        setValue("centroAcopio", data.id);
      }
      // setValue("total", total);
      console.log(valores);
    }
  };

  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiales",
  });
  // Eliminar actor de listado
  const removeMaterial = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo actor
  const nuevoMaterial = () => {
    append({
      idMaterial: "", // Asigna un valor a idMaterial si es necesario
      nombre: "", // Agrega esta línea para asignar el nombre del material
      descripcion: "",
      cantidad: 0,
      subtotal: 0,
    });
  };

  //-----------------------------------------------------------------------------------------------------------------------------

  //
  const [data, setData] = useState(null);
  // //Error del API
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  //3 es igual a Alberto Hernandez y centro de acopio 1

  //1 es igual a Jonnan Pais y centro de acopio 3

  useEffect(() => {
    CentroAcopioService.getProcesoCanjeoAdmin(userData.id)
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
        console.log(response.data.results);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, [userData.id]);

  //-----------------------------------------------------------------------------------------------------------------------------
  //Lista de clientes
  const [dataClientes, setDataClientes] = useState({});
  const [loadedClientes, setLoadedClientes] = useState(false);

  useEffect(() => {
    UsuarioService.getUsuarios()
      .then((response) => {
        // Filtrar solo los usuarios con TipoUsuario igual a 3
        const usuarioClientes = response.data.results.filter(
          (usuario) => usuario.TipoUsuario === TipoUsuarioCliente
        );
        console.log(usuarioClientes);
        setDataClientes(usuarioClientes);
        setLoadedClientes(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoadedClientes(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  //-----------------------------------------------------------------------------------------------------------------------------
  //Cliente seleccionado
  const [dataCliente, setDataCliente] = useState([]);
  const [loadedCliente, setLoadedCliente] = useState(false);
  // Obtener id_Provincia del formulario
  let [idCliente, setIdCliente] = useState(0);

  // Función para cargar cantones por id de provincia
  useEffect(() => {
    if (idCliente !== 0) {
      UsuarioService.getUsuarioById(idCliente)
        .then((response) => {
          console.log(response.data.results);

          // Verificar si la respuesta es un objeto o un array
          const clienteData = Array.isArray(response.data.results)
            ? response.data.results
            : [response.data.results];

          setDataCliente(clienteData);
          setLoadedCliente(true);
        })
        .catch((error) => {
          if (error instanceof SyntaxError) {
            console.log(error);
            setError(error);
            setLoadedCliente(false);
            throw new Error("Respuesta no válida del servidor");
          }
        });
    }
  }, [idCliente]);

  //-----------------------------------------------------------------------------------------------------------------------------
  //Lista de materiales
  const [dataMateriales, setDataMateriales] = useState({});
  const [loadedMateriales, setLoadedMateriales] = useState(false);

  useEffect(() => {
    // Verifica si data tiene un valor antes de acceder a su propiedad 'id'
    if (data && data.id) {
      Material_CentroAcopioService.getMaterialByIdCentroAcopio(data.id)
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
    }
  }, [data]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              fontFamily="monospace"
              borderBottom="1px solid green"
              gutterBottom
            >
              Canjear materiales
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#b0bec5" }}>
              <CardHeader
                title="Canjeo de Materiales"
                subheader={"Fecha: " + fechaConFormato}
              />
              <CardContent>
                {/* -----------------------------------------------------------------------------------------------------------------*/}
                {/* Información del centroacopio */}
                <Typography
                  variant="h6"
                  color="text.primary"
                  fontWeight={"bold"}
                  gutterBottom
                >
                  Información del Centro de Acopio:
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Nombre
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Administrador
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{data.nombre}</TableCell>
                        <TableCell>{data.usuario}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* -----------------------------------------------------------------------------------------------------------------*/}
                {/* Información del cliente */}
                <Typography
                  variant="h6"
                  color="text.primary"
                  gutterBottom
                  fontWeight={"bold"}
                  marginTop={"20px"}
                >
                  Información del cliente:
                </Typography>
                <Grid item xs={12} sm={4}>
                  <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                    {/* Lista de clientes */}
                    {loadedClientes && (
                      <Controller
                        name="usuario"
                        control={control}
                        render={({ field }) => (
                          <SelectClientes
                            field={field}
                            data={dataClientes}
                            error={Boolean(errors.usuario)}
                            onSelection={(value) => {
                              setValue("usuario", value, {
                                shouldValidate: true,
                              });
                              setIdCliente(value);
                            }}
                          />
                        )}
                      />
                    )}
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      {errors.usuario ? errors.usuario.message : " "}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Identificación
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Nombre completo
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Correo electrónico
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loadedCliente &&
                        dataCliente.map((item) => {
                          return (
                            <TableRow key={item.id}>
                              <TableCell>{item.id}</TableCell>
                              <TableCell>{item.nombre}</TableCell>
                              <TableCell>{item.correo}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* -----------------------------------------------------------------------------------------------------------------*/}
                {/* Materiales */}
                <Grid item xs={12} sm={6} style={{ marginTop: "20px" }}>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                    fontWeight={"bold"}
                  >
                    Materiales
                    <Tooltip title="Agregar Material">
                      <span>
                        <IconButton color="secondary" onClick={nuevoMaterial}>
                          <AddIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Typography>
                  <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                    {/* seleccion de materiales */}
                    {loadedMateriales &&
                      fields.map((field, index) => (
                        <div key={index}>
                          <MaterialesForm
                            name="materiales"
                            field={field} //
                            data={dataMateriales}
                            key={field.id}
                            index={index} //
                            onRemove={removeMaterial} //
                            control={control}
                            onInputChange={handleInputChange}
                            disableRemoveButton={fields.length === 1}
                            onChange={(e) =>
                              setValue("materiales", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                          {errors.materiales && (
                            <FormHelperText
                              component={"span"}
                              sx={{ color: "#d32f2f" }}
                            >
                              <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              >
                                {errors?.materiales[index]?.idMaterial && (
                                  <Grid item xs={6}>
                                    {errors?.materiales[index]?.idMaterial
                                      ? errors?.materiales[index]?.idMaterial
                                          ?.message
                                      : " "}
                                  </Grid>
                                )}
                                {errors?.materiales[index]?.cantidad && (
                                  <Grid item xs={6}>
                                    {errors?.materiales[index]?.cantidad
                                      ? errors?.materiales[index]?.cantidad
                                          ?.message
                                      : " "}
                                  </Grid>
                                )}
                              </Grid>
                            </FormHelperText>
                          )}
                        </div>
                      ))}
                  </FormControl>
                </Grid>

                <Typography
                  variant="h6"
                  color="text.primary"
                  gutterBottom
                  marginTop={"20px"}
                  fontWeight={"bold"}
                >
                  Detalles del Canjeo de Materiales:
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Material
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Descripción
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Precio
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Cantidad
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          Subtotal
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {watchMaterial.map((material, index) => {
                        const subtotal = material.precio * material.cantidad;
                        totalEcomonedasCanjeo += parseFloat(subtotal);

                        if (
                          material.cantidad > 0 &&
                          material.idMaterial !== ""
                        ) {
                          // Solo carga la fila si la cantidad es diferente de 0
                          return (
                            <TableRow key={index}>
                              <TableCell>{material.nombre}</TableCell>
                              <TableCell>{material.descripcion}</TableCell>
                              <TableCell>
                                {material.precio} ecomonedas
                              </TableCell>
                              <TableCell>
                                {material.cantidad} unidades
                              </TableCell>
                              <TableCell>{subtotal} ecomonedas</TableCell>
                            </TableRow>
                          );
                        } else {
                          // No carga la fila si la cantidad es 0
                          return null;
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                    marginTop={"20px"}
                    textAlign={"right"}
                  >
                    <strong>Total del Canjeo:</strong> {totalEcomonedasCanjeo}{" "}
                    ecomonedas
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ m: 1 }}
                  >
                    Canjear
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
