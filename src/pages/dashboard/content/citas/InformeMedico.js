import { useState, useEffect } from "react"
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

import axios from "../../../../auth/fetch"
import Loader from '../../../../components/Loader/Loader';

// components
import Page from '../../../../components/Page';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
    },
};

export default function InformeMedico() {

    const [data, setdata]                               = useState(null);

    const [loading, setloading]                         = useState(true);
    const [search, setsearch]                           = useState(true);
    const [sending, setsending]                         = useState(false);

    const [count, setcount]                             = useState(0);
    const [examsSelected,       setexamsSelected]       = useState([]);

    const [listDates, setlistDates]                     = useState(null);
    const [examsList, setexamsList]                     = useState(null);
    const [medicinesList, setmedicinesList]             = useState(null);

    const urlGetAppointmentByDoctor                     = "/aPPoINtMent/DOCToR/By";
    const urlGetMedicines                               = "/invENtOrY/aSSGNmEnT/byDoCTOR/";
    const urlGetExams                                   = "/exaMs/geT/*";

    // SearchData
    const [textSearchData, settextSearchData]           = useState("");
    const [searchingData, setsearchingData]             = useState(false);
    const [dataToEdit, setdataToEdit]                   = useState(null);
    const [idToEdit, setidToEdit]                       = useState(null);
    const [typeForm, settypeForm]                       = useState("create");

    const LoginSchema =     Yup.object().shape({
        appointmentId:      Yup.string().required('Debe seleccionar una cita'),
        description:        Yup.string().required('Debe ingresar una descripción'),

        withExams:          Yup.boolean(),
        withMedicine:       Yup.boolean(),

        otherExams:         Yup.string(),
    });

    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            appointmentId:  "",

            description:    "",

            withExams:      false,
            withMedicine:   false,

            otherExams:     "",
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

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    const changeWithMedicine = (showMedicine) => {
        setFieldValue("withMedicine", showMedicine);
    }

    const changeWithExams = (showWithExams) => {
        setFieldValue("withExams", showWithExams);
    }

    const getData = () => {
        axios.get(urlGetAppointmentByDoctor)
        .then((res) => {
            let data        = res.data;
            let dataList    = res.data.data;

            console.log(res.data);

            if(data.result){

                setlistDates(res.data.data);
                setsearch(false);
                setloading(false);

            }

        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(async () => {
        if(loading){
            if(search){
                getData();
            }
        }
    }, []);

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
                                    <Grid container columnSpacing={1}>
                                        <Grid item lg={9}>
                                            <TextField
                                                label="Buscar"
                                                size="small"
                                                value={textSearchData}
                                                onChange={(e) => settextSearchData(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item lg={3}>
                                            <LoadingButton 
                                                variant="contained" 
                                                color="primary"
                                                type="button"
                                                sx={{ minWidth: "100%", width: "100%"}}
                                                // onClick={() => searchDataToEdit(setFieldValue)}
                                                loading={searchingData}
                                                disabled={textSearchData === ""}
                                            >
                                                <i className="mdi mdi-magnify" />
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {(loading || searchingData) &&
                                <Loader />
                            }

                            {!loading && !searchingData &&
                                <div>
                                    <Grid container columnSpacing={3}>
                                        <Grid item lg={12}>
                                            
                                            <Box sx={{ pb: 1 }}>
                                                <Typography variant="h5">
                                                    Información General
                                                </Typography>

                                                <Grid container columnSpacing={3} sx={{my: 2}}>
                                                    <Grid item xs={12}>
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id="demo-simple-select-date">
                                                                ID Cita - CI – Nombre - Apellido
                                                            </InputLabel>
                                                            <Select
                                                                fullWidth
                                                                labelId="demo-simple-select-date"
                                                                id="demo-simple-select-date"

                                                                // value={values.direccion}
                                                                // onChange={(e) => changeDirection(setFieldValue, `${e.target.value}`)}
                                                                
                                                                label="ID Cita - CI – Nombre - Apellido"
                                                                MenuProps={MenuProps}

                                                                {...getFieldProps('appointmentId')}
                                                                error={Boolean(touched.appointmentId && errors.appointmentId)}
                                                                helperText={touched.appointmentId && errors.appointmentId}
                                                            >

                                                                {listDates !== null && listDates.map((item, key) => {
                                                                    let dataItem = item;
                                                                    return <MenuItem key={key} value={`${dataItem.patientId}`}>
                                                                                {`${dataItem.document.number} - ${dataItem.nombre} ${dataItem.apellido}`}
                                                                            </MenuItem>
                                                                })}

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            <Stack spacing={3} sx={{mb: 1}}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="description"
                                                    type="number"
                                                    label="Descripción"
                                                    multiline
                                                    rows={7}
                                                    maxRows={10}

                                                    {...getFieldProps('description')}
                                                    error={Boolean(touched.description && errors.description)}
                                                    helperText={touched.description && errors.description}
                                                />
                                            </Stack>


                                            <Grid sx={{mt:4}} container columnSpacing={3}>
                                                <Grid item xs={6}>

                                                    <Typography sx={{mb: 1}} align="center" variant="h5">
                                                        ¿Se aplicaron medicamentos? 
                                                    </Typography>
                                                    <ButtonGroup sx={{mb: 3}} fullWidth aria-label="outlined button group">
                                                        <Button onClick={() => changeWithMedicine(!values.withMedicine)} sx={{py: .81}} variant={values.withMedicine  ? "contained" : "outlined"} color="primary">Si</Button>
                                                        <Button onClick={() => changeWithMedicine(!values.withMedicine)} sx={{py: .81}} variant={!values.withMedicine ? "contained" : "outlined"} color="primary">No</Button>
                                                    </ButtonGroup>

                                                    {values.withMedicine &&
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
                                                                                <Grid xs={4} sx={{px: .5}}>
                                                                                    <Button type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="primary" variant="contained">
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
                                                                                    />
                                                                                </Grid>
                                                                                <Grid xs={4} sx={{px: .5}}>
                                                                                    <Button type="button" size="small" sx={{py: 1.5, px: 0, minWidth: 0, width: "100%"}} color="primary" variant="contained">
                                                                                        <Icon icon={CaretRight} />
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </ListItem>
                                                            </List>
                                                        </Card>
                                                    }

                                                </Grid>
                                                <Grid item xs={6}>

                                                    <Typography sx={{mb: 1}} align="center" variant="h5">
                                                        ¿Requiere exámenes médicos? 
                                                    </Typography>
                                                    <ButtonGroup sx={{mb: 3}} fullWidth aria-label="outlined button group">
                                                        <Button onClick={() => changeWithExams(!values.withExams)} sx={{py: .81}} variant={values.withExams  ? "contained" : "outlined"} color="primary">Si</Button>
                                                        <Button onClick={() => changeWithExams(!values.withExams)} sx={{py: .81}} variant={!values.withExams ? "contained" : "outlined"} color="primary">No</Button>
                                                    </ButtonGroup>

                                                    {values.withExams &&
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
                                                    }

                                                </Grid>
                                            </Grid>


                                            <Typography sx={{mt: 4}} variant="h5">
                                                Otros examenes
                                            </Typography>
                                            <Stack spacing={3} sx={{my: 1}}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="otherExams"
                                                    type="number"
                                                    label="Otros"
                                                    multiline
                                                    rows={2}
                                                    maxRows={4}

                                                    {...getFieldProps('otherExams')}
                                                    error={Boolean(touched.otherExams && errors.otherExams)}
                                                    helperText={touched.otherExams && errors.otherExams}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    {typeForm === "create" &&
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            loading={sending}
                                            color="primary"
                                            sx={{mt: 3}}
                                        >
                                            Guardar
                                        </LoadingButton>
                                    }

                                    {typeForm === "edit" &&
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            loading={sending}
                                            color="secondary"
                                            sx={{mt: 3}}
                                        >
                                            Editar
                                        </LoadingButton>
                                    }
                                </div>
                            }

                        </Card>
                    </Grid>
                </Form>
            </FormikProvider>
        </Container>
        </Page>
    );
}
