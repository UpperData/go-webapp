import {useState} from "react"
import * as Yup from 'yup';

// material
import { Box, Grid, Stack, Container, Typography, Card, Alert, Button, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel, TextField, Checkbox, Select, MenuItem, InputLabel, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton, DatePicker, LocalizationProvider  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// components
import Page from '../../../../components/Page';

export default function CreateAccount() {

    const [formErrors, setformErrors]                   = useState("");
    const [typeDni, settypeDni]                         = useState("V");

    const [membershipsSelected, setmembershipsSelected] = useState([]);
    const [count, setcount]                             = useState(0);

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
        <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Crear Cuenta
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>
                <Card sx={{py: 3, px: 5}}>
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
                                                        error={errors.gender}
                                                        touched={touched.gender}
                                                    >
                                                        <FormControlLabel value="Mujer"  control={<Radio />} label="Mujer" />
                                                        <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
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
                                                            onChange={(val) => settypeDni(val)}
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
                                                <ListItem 
                                                    // sx={{ background: membershipsSelected.includes("Drafts") ? "primary" : "" }} 
                                                    // disablePadding
                                                >
                                                    <ListItemButton 
                                                        selected={membershipsSelected.includes("Drafts")} 
                                                        onClick={() => toggleValueToMemberships("Drafts")}
                                                    >
                                                        <ListItemText primary="Drafts" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                        color="primary"
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
                </Card>
            </Grid>
        </Container>
        </Page>
    );
}
