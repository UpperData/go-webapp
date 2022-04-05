import {useState, useEffect} from "react"
import * as Yup from 'yup';
// material
import { Radio, Alert, ButtonGroup, RadioGroup, FormControlLabel, InputBase, Box, Stack, Grid, Container, Typography, Card, Button, Modal, TextField, Checkbox, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchIcon from '@iconify/icons-ant-design/search';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton, DatePicker, LocalizationProvider  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useSelector } from "react-redux";

import { Icon } from '@iconify/react';
import CaretDown from "@iconify/icons-ant-design/caret-down"
import CaretUp from "@iconify/icons-ant-design/caret-up"
import CaretRight from "@iconify/icons-ant-design/caret-right"
import CaretLeft from "@iconify/icons-ant-design/caret-left"

import axios from "../../../../auth/fetch"
import Loader from '../../../../components/Loader/Loader';

// components
import Page from '../../../../components/Page';
import ModalDirection from "../rrhh/Components/ModalDirection";

export default function AdministrarCita() {

    const [loading,     setloading]                     = useState(true);
    const [search,      setsearch]                      = useState(true);
    const [data, setdata]                               = useState(null);
    const [count, setcount]                             = useState(0);
    const [examsSelected,       setexamsSelected]       = useState([]);

    const phoneTypesList        = useSelector(state => state.dashboard.phoneTypesList.data.data);
    const patientTypesList      = useSelector(state => state.dashboard.patientTypes.data);

    const [typePhone, setTypePhone]                     = useState("1");
    const [typeDni, settypeDni]                         = useState("V");

    const [showModalAddDirection,   setshowModalAddDirection]       = useState(false);
    const [direction, setdirection]                                 = useState(null);

    const [withExams, setwithExams]                     = useState(false);
    const [withMedicine, setwithMedicine]               = useState(false);

    const [selectedGender, setselectedGender]           = useState("");

    const urlGetPersonal    = "/EMplOyeFIle/BYGRoUP/get/?grp=1&grp=2";

    const getPersonal = () => {
        axios.get(urlGetPersonal)
        .then((res) => {

            console.log("-----");

            if(res.data.result){
                console.log(res.data);
                setloading(false);
            }

        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(async () => {
        if(loading){
            if(search){
                getPersonal();
            }
        }
     }, []);

    const LoginSchema =     Yup.object().shape({
        email:              Yup.string().required('Debe ingresar su email'),
        gender:             Yup.string().required().oneOf(["M" , "H"], 'Debe seleccionar un género'),
        cedula:             Yup.string().required('Ingrese la cedula de indentidad'),

        name:               Yup.string().required('Debe ingresar un nombre'),
        lastname:           Yup.string().required('Debe ingresar su apellido'),
        birthday:           Yup.date().nullable(),

        membership:         Yup.string().required('Seleccione un tipo de membresia'),
    });

    const formik = useFormik({
        initialValues: {
            email:      "",
            gender:     "",
            cedula:     "",
            name:       "",
            lastname:   "",
            birthday:   null,
            membership: ""
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
          try {
            // setformErrors("");
            // await login(values.email, values.password);
          } catch(e) {
            // setformErrors(e);
          }
        }
    });

    const toggleValueToExams = async (value) => {
        let newList = examsSelected;
        // console.log(newList);
        let verify  = newList.find(item => item === value);

        if(verify){
            // delete
            newList = newList.filter(item => item !== value);
            await setexamsSelected(newList);
        }else{
            // add
            newList.push(value);
            await setexamsSelected(newList);
        }

        await setcount(count + 5);
        console.log(newList);
    }

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const changeWithMedicine = (showMedicine) => {
        setwithMedicine(showMedicine);
    }

    const changeWithExams = (showWithExams) => {
        setwithExams(showWithExams);
    }


    return (
        <Page title="Ficha de empleado | Cema">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Gestión de Cita
                </Typography>
            </Box>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid sx={{ pb: 3 }} item xs={12}>
                        <Card sx={{py: 3, px: 5}}>
                            {!loading &&
                                <Box>
                                    <Grid sx={{mb: 3}} container columnSpacing={3}>
                                        <Grid item lg={3}>
                                            <Button variant="outlined" fullWidth>
                                                Nuevo
                                            </Button>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Button variant="contained" fullWidth>
                                                Imprimir
                                            </Button>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <Button variant="contained" color="secondary" fullWidth>
                                                Descargar
                                            </Button>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <TextField
                                                label="Buscar cita"
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>

                                    <div>
                                        <Grid sx={{ my:3 }} container columnSpacing={3}>
                                            <Grid lg={3} item>
                                                {direction === null &&
                                                    <Button sx={{py: 1.5}} onClick={() => setshowModalAddDirection(true)} variant="contained" color="secondary" fullWidth>
                                                        Agregar dirección
                                                    </Button>
                                                }

                                                {direction !== null &&
                                                    <Button sx={{py: 1.5}} onClick={() => setdirection(null)} variant="contained" color="primary" fullWidth>
                                                        Eliminar dirección
                                                    </Button>
                                                }
                                            </Grid>
                                            <Grid lg={9} item>
                                                {direction === null &&
                                                    <div>
                                                        <Alert severity="info">
                                                            No se ha seleccionado una dirección
                                                        </Alert>
                                                    </div>
                                                }

                                                {direction !== null &&
                                                    <div>
                                                        <Grid container columnSpacing={3}> 
                                                            <Grid item lg={2}>
                                                                <Typography sx={{ mb:0, fontWeight: "bold" }}>
                                                                    Estado
                                                                </Typography>
                                                                <Typography>
                                                                    {direction.estado.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Typography sx={{ mb:0, fontWeight: "bold" }}>
                                                                    Municipio
                                                                </Typography>
                                                                <Typography>
                                                                    {direction.municipio.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Typography sx={{ mb:0, fontWeight: "bold" }}>
                                                                    Parroquia
                                                                </Typography>
                                                                <Typography>
                                                                    {direction.parroquia.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Typography sx={{ mb:0, fontWeight: "bold" }}>
                                                                    Dirección
                                                                </Typography>
                                                                <Typography>
                                                                    {direction.address}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Stack spacing={3} sx={{my: 3}}>
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="address"
                                            type="text"
                                            label="Dirección"
                                            multiline
                                            minRows={4}
                                            maxRows={6}
                                            {...getFieldProps('address')}
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Stack>

                                    <Typography variant="h5">
                                        Información Paciente
                                    </Typography>

                                    <Grid container columnSpacing={3}>
                                        <Grid item lg={6}>

                                            <Stack spacing={3} sx={{my: 2}}>
                                                <ButtonGroup fullWidth aria-label="outlined button group">
                                                    <Button sx={{py: .81}} onClick={() => setselectedGender("H")} variant={selectedGender === "H"  ? "contained" : "outlined"}>Hombre</Button>
                                                    <Button sx={{py: .81}} onClick={() => setselectedGender("M")} variant={selectedGender === "M"  ? "contained" : "outlined"}>Mujer</Button>
                                                </ButtonGroup>
                                            </Stack>

                                            <Stack spacing={3} sx={{my: 2}}>
                                                <Grid container columnSpacing={1}>
                                                    <Grid item xs={9}>
                                                        <TextField
                                                            size='small'
                                                            fullWidth
                                                            autoComplete="cedula"
                                                            type="text"
                                                            label="Cédula"
                                                            {...getFieldProps('cedula')}
                                                            error={Boolean(touched.cedula && errors.cedula)}
                                                            helperText={touched.cedula && errors.cedula}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            size="small"
                                                            fullWidth
                                                            value={typeDni}
                                                            onChange={(e) => settypeDni(e.target.value)}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            <MenuItem value="V">V</MenuItem>
                                                            <MenuItem value="E">E</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                </Grid>
                                            </Stack>

                                            <Stack spacing={3} sx={{my: 2}}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="name"
                                                    type="text"
                                                    label="Nombres"

                                                    {...getFieldProps('name')}
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />         
                                            </Stack>

                                            <Stack spacing={3} sx={{my: 2}}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="lastname"
                                                    type="text"
                                                    label="Apellidos"

                                                    {...getFieldProps('lastname')}
                                                    error={Boolean(touched.lastname && errors.lastname)}
                                                    helperText={touched.lastname && errors.lastname}
                                                />
                                            </Stack>

                                        </Grid>
                                        <Grid item lg={6}>
                                            
                                            <Stack spacing={3} sx={{my: 2}}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Fecha Nacimiento"
                                                        value={formik.values.birthday}
                                                        onChange={(value) => {
                                                            formik.setFieldValue('birthday', value);
                                                        }}
                                                        
                                                        renderInput={
                                                            (params) => <TextField 
                                                                        fullWidth
                                                                        size='small' 
                                                                        {...getFieldProps('birthday')}
                                                                        helperText={touched.birthday && errors.birthday} 
                                                                        error={Boolean(touched.birthday && errors.birthday)} 
                                                                        {...params} 
                                                            />
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </Stack>

                                            <Stack spacing={3} sx={{my: 2}}>
                                                <Grid container columnSpacing={1}>
                                                    <Grid item xs={9}>
                                                        <TextField
                                                            size='small'
                                                            fullWidth
                                                            autoComplete="phoneNumber"
                                                            type="text"
                                                            label="Teléfono"
                                                            {...getFieldProps('phoneNumber')}
                                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            size="small"
                                                            fullWidth
                                                            value={typePhone}
                                                            onChange={(e) => setTypePhone(e.target.value)}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                        >
                                                            {phoneTypesList.map((item, key) => {
                                                                let itemPhoneType = item;
                                                                return  <MenuItem key={key} value={item.id}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                            })}
                                                        </Select>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="h5" sx={{mb: 1}}>
                                        Personal Asignado
                                    </Typography>

                                    <Grid container>
                                        <Grid item lg={6}>
                                            <Typography variant="h5">
                                                Médico
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Typography variant="h5">
                                                Enfermera
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                        color="primary"
                                        sx={{mt: 4}}
                                    >
                                        Guardar
                                    </LoadingButton>

                                    <ModalDirection save={(data) => setdirection(data)} show={showModalAddDirection} hide={() => setshowModalAddDirection(false)} />
                                </Box>
                            }

                            {loading &&
                                <Loader />
                            }
                        </Card>
                    </Grid>
                </Form>
            </FormikProvider>
        </Container>
        </Page>
    );

}