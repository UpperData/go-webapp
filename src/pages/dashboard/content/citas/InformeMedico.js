import {useState} from "react"
import * as Yup from 'yup';
// material
import { Radio, Input, ButtonGroup, RadioGroup, FormControlLabel, InputBase, Box, Stack, Grid, Container, Typography, Card, Button, Modal, TextField, Checkbox, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchIcon from '@iconify/icons-ant-design/search';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton, DatePicker, LocalizationProvider  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { Icon } from '@iconify/react';
import CaretDown from "@iconify/icons-ant-design/caret-down"
import CaretUp from "@iconify/icons-ant-design/caret-up"
import CaretRight from "@iconify/icons-ant-design/caret-right"
import CaretLeft from "@iconify/icons-ant-design/caret-left"

// components
import Page from '../../../../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../../../../components/_dashboard/app';


export default function InformeMedico() {

    const [data, setdata]                               = useState(null);
    const [count, setcount]                             = useState(0);
    const [examsSelected,       setexamsSelected]       = useState([]);

    const [typeDni, settypeDni]                         = useState("V");

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

    return (
        <Page title="Ficha de empleado | Cema">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Informe Medico
                </Typography>
            </Box>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid sx={{ pb: 3 }} item xs={12}>
                        <Card sx={{py: 3, px: 5}}>
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

                            <Grid container columnSpacing={3}>
                                <Grid item lg={12}>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography variant="h5">
                                            Información General
                                        </Typography>

                                        <Grid container columnSpacing={3} sx={{my: 1}}>
                                            <Grid item lg={10}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="lastname"
                                                    type="text"
                                                    label="CI – Nombre - Apellido"
                                                    {...getFieldProps('lastname')}
                                                    error={Boolean(touched.lastname && errors.lastname)}
                                                    helperText={touched.lastname && errors.lastname}
                                                />
                                            </Grid>
                                            <Grid item lg={2}>
                                                <ButtonGroup fullWidth aria-label="outlined button group">
                                                    <Button sx={{py: 1.5}} variant="outlined"><Icon icon={CaretUp} /></Button>
                                                    <Button sx={{py: 1.5}} variant="outlined"><Icon icon={CaretDown} /></Button>
                                                </ButtonGroup>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Stack spacing={3} sx={{mb: 1}}>
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="lastname"
                                            type="number"
                                            label="Descripción"
                                            multiline
                                            rows={7}
                                            maxRows={10}
                                            {...getFieldProps('lastname')}
                                            error={Boolean(touched.lastname && errors.lastname)}
                                            helperText={touched.lastname && errors.lastname}
                                        />
                                    </Stack>


                                    <Grid sx={{mt:4}} container columnSpacing={3}>
                                        <Grid item xs={6}>
                                            <Card sx={{py: 3, px: 3}}>
                                                <Typography align="center" sx={{mb: 1, mt:2}} variant="h5">
                                                    Medicamentos Aplicados
                                                </Typography>
                                                <List>
                                                    <ListItem 
                                                        // sx={{ background: membershipsSelected.includes("Drafts") ? "primary" : "" }} 
                                                        // disablePadding
                                                    >
                                                        <Grid container alignItems="center">
                                                            <Grid xs={7}>
                                                                Diclofenaco 10mg 
                                                            </Grid>
                                                            <Grid xs={5}>
                                                                <Grid container alignItems="center">
                                                                    <Grid xs={4}>
                                                                        <Button type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="secondary" variant="contained">
                                                                            <Icon icon={CaretLeft} />
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid xs={4}>
                                                                        <TextField
                                                                            hiddenLabel
                                                                            size='small'
                                                                            fullWidth
                                                                            autoComplete="lastname"
                                                                            type="number"
                                                                            label=""
                                                                            InputProps={{
                                                                                readOnly: true,
                                                                            }}
                                                                            {...getFieldProps('lastname')}
                                                                            error={Boolean(touched.lastname && errors.lastname)}
                                                                            helperText={touched.lastname && errors.lastname}
                                                                        />
                                                                    </Grid>
                                                                    <Grid xs={4}>
                                                                        <Button type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="secondary" variant="contained">
                                                                            <Icon icon={CaretRight} />
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </List>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card sx={{py: 3, px: 3}}>
                                                <Typography align="center" sx={{mb: 1, mt:2}} variant="h5">
                                                    Exámenes Aplicados
                                                </Typography>
                                                <List>
                                                    <ListItem 
                                                        // sx={{ background: membershipsSelected.includes("Drafts") ? "primary" : "" }} 
                                                        // disablePadding
                                                    >
                                                        <ListItemButton 
                                                            selected={examsSelected.includes("Drafts")} 
                                                            onClick={() => toggleValueToExams("Drafts")}
                                                        >
                                                            <ListItemText primary="Drafts" />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </List>
                                            </Card>
                                        </Grid>
                                    </Grid>


                                    <Typography sx={{mt: 4}} variant="h5">
                                        Otros examenes
                                    </Typography>
                                    <Stack spacing={3} sx={{my: 1}}>
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="lastname"
                                            type="number"
                                            label="Otros"
                                            multiline
                                            rows={2}
                                            maxRows={4}
                                            {...getFieldProps('lastname')}
                                            error={Boolean(touched.lastname && errors.lastname)}
                                            helperText={touched.lastname && errors.lastname}
                                        />
                                    </Stack>
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
                        </Card>
                    </Grid>
                </Form>
            </FormikProvider>
        </Container>
        </Page>
    );
}
