import {useState, useEffect} from "react"
import * as Yup from 'yup';

// material
import { Box, Grid, Stack, Container, Typography, Card, Alert, Button, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel, TextField, Checkbox, Select, MenuItem, InputLabel, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton, DatePicker, LocalizationProvider  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from "../../../../auth/fetch"

// components
import Page from '../../../../components/Page';
import Loader from "../../../../components/Loader/Loader";
import Scrollbar from "../../../../components/Scrollbar";
import { useSelector } from "react-redux";

export default function CreateAccount() {

    const [formErrors,  setformErrors]                  = useState("");
    const [typeDni,     settypeDni]                     = useState("V");

    const [loading,     setloading]                     = useState(true);
    const [search,      setsearch]                      = useState(true);
    const [roleList,    setroleList]                    = useState(null);

    const [membershipsSelected, setmembershipsSelected] = useState([]);
    const [count, setcount]                             = useState(0);

    const [sending, setsending] = useState(false);
    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    let urlGetRoleList      = "/front/Role/get/*";
    let urlCreateAccount    = "/accOunT/RegisTER";

    let MenuPermissionList = useSelector(state => state.dashboard.menu);

    const getRoleList = () => {
        axios.get(urlGetRoleList)
        .then((res) => {

            console.log("-----");

            if(res.data.result){
                console.log(res.data.data);
                setroleList(res.data.data);
                setloading(false);
            }

        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(async () => {
        if(loading){
            if(search){
                getRoleList();
            }
        }
     }, []);

    const LoginSchema =     Yup.object().shape({
        email:              Yup.string().required('Debe ingresar su email'),
        gender:             Yup.string().required('Debe seleccionar un género'),
        cedula:             Yup.string().required('Ingrese la cedula de indentidad'),

        name:               Yup.string().required('Debe ingresar un nombre'),
        lastname:           Yup.string().required('Debe ingresar su apellido'),
        birthday:           Yup.date().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            email:      "",
            gender:     "M",
            cedula:     "",
            name:       "",
            lastname:   "",
            birthday:   null,
            membership: []
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {resetForm}) => {
          try {

            let formattedData = {
                email:          values.email,
                memberships:    membershipsSelected,

                people: {
                    document: {
                        nationality:    typeDni,
                        numbre:         values.cedula,
                        civil:{
                            id:2,
                            name:"Soltero"
                        },
                        gender:         values.gender,
                    }
                },

                firstName:  values.name,
                lastName:   values.lastname,
                birthDate:  values.birthday,
                gender:     values.gender,
            }

            console.log(formattedData);

            setalertSuccessMessage("");
            setalertErrorMessage("");
            setsending(true);
            
            axios({
                method: "POST",
                url:    urlCreateAccount,
                data:   formattedData
            }).then((res) => {

                console.log(res.data);
                setsending(false);
                setmembershipsSelected([]);

                if(res.data.result){
                    setalertSuccessMessage(res.data.message);
                    resetForm();

                    setTimeout(() => {
                        setalertSuccessMessage("");
                    }, 20000);
                }

            }).catch((err) => {
                
                let fetchError = err;

                console.error(fetchError);
                if(fetchError.response){
                    console.log(err.response);
                    setalertErrorMessage(err.response.data.message || err.response.data.data.message);
                    setsending(false);
                    // return Promise.reject(err.response.data.data);
                }

            });

            // setformErrors("");
            // await login(values.email, values.password);
          } catch(e) {
            // setformErrors(e);
          }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const toggleValueToMemberships = async (value) => {
        let newList = membershipsSelected;
        // console.log(newList);
        let verify  = newList.find(item => item === value);

        if(verify){
            // delete
            newList = newList.filter(item => item !== value);
            await setmembershipsSelected(newList);
        }else{
            // add
            newList.push(value);
            await setmembershipsSelected(newList);
        }

        await setcount(count + 5);
        console.log(newList);
    }

    return (
        <Page title="Crear cuenta | CEMA">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Crear Cuenta
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>


                <Card sx={{py: 3, px: 5}}>

                    {alertSuccessMessage !== "" &&
                        <Alert sx={{mb: 3}} severity="success">
                            {alertSuccessMessage}
                        </Alert>
                    }

                    {alertErrorMessage !== "" &&
                        <Alert sx={{mb: 3}} severity="error">
                            {alertErrorMessage}
                        </Alert>
                    }


                    {!loading 
                    ?
                        <Grid container alignItems="center" justifyContent="space-between" columnSpacing={3}>
                            <Grid item md={7} xs={12}>
                                <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <Grid container justifyContent="space-between" columnSpacing={3}>
                                            <Grid item xs={6}>
                                                
                                                    {formErrors !== "" &&
                                                        <div>
                                                            <Alert sx={{mb: 3}} severity="error">
                                                                {formErrors.message}
                                                            </Alert>
                                                        </div>
                                                    }

                                                    <Stack spacing={3} sx={{my: 2}}>
                                                        <TextField
                                                            size='small'
                                                            fullWidth
                                                            autoComplete="email"
                                                            type="email"
                                                            label="Email"
                                                            {...getFieldProps('email')}
                                                            error={Boolean(touched.email && errors.email)}
                                                            helperText={touched.email && errors.email}
                                                        />
                                                    </Stack>

                                                    <FormControl>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="gender"

                                                            {...getFieldProps('gender')}
                                                        >
                                                            <FormControlLabel value="M" control={<Radio />} label="Mujer" />
                                                            <FormControlLabel value="H" control={<Radio />} label="Hombre" />
                                                        </RadioGroup>
                                                    </FormControl>

                                                    <Stack spacing={3} sx={{my: 2}}>
                                                        <Grid container columnSpacing={1}>
                                                            <Grid item xs={8}>
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
                                                            <Grid item xs={4}>
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
                                                    
                                                
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography color="text.secondary" align="center" sx={{mb: 1, mt:2}} component="p" variant="body">
                                                    Membresías
                                                </Typography>
                                                <List>
                                                    {roleList.length > 0 &&
                                                        
                                                            <Scrollbar
                                                                sx={{
                                                                    height: 320,
                                                                    '& .simplebar-content': { maxHeight: 320 ,height: 320, display: 'flex', flexDirection: 'column' }
                                                                }}
                                                            >
                                                            {roleList.map((role, key) => {
                                                                let item = role;
                                                                return <ListItem 
                                                                        // sx={{ background: membershipsSelected.includes("Drafts") ? "primary" : "" }} 
                                                                        disablePadding
                                                                        key={key}
                                                                    >
                                                                        <ListItemButton 
                                                                            selected={membershipsSelected.includes(role.id)} 
                                                                            onClick={() => toggleValueToMemberships(role.id)}
                                                                        >
                                                                            <ListItemText primary={role.name} />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                            })}
                                                            </Scrollbar>
                                                        
                                                    }
                                                </List>
                                            </Grid>
                                        </Grid>

                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            loading={sending}
                                            color="primary"
                                            sx={{mt: 3}}
                                        >
                                            Crear Cuenta
                                        </LoadingButton>
                                    </Form>
                                </FormikProvider>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <img src="/static/createapp.png" alt="Create img" />
                            </Grid>
                        </Grid>
                    :
                        <Loader />
                    }
                </Card>
            </Grid>
        </Container>
        </Page>
    );
}
