import {useState} from "react"
import * as Yup from 'yup';
// material
import { Radio, Input, ButtonGroup, RadioGroup, FormControlLabel, InputBase, Box, Stack, Grid, Container, Typography, Card, Button, Modal, TextField, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchIcon from '@iconify/icons-ant-design/search';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton, DatePicker, LocalizationProvider  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

export default function FichaPersonal() {

    const [data, setdata]       = useState(null);
    const [count, setcount]     = useState(0);

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

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Page title="Ficha de empleado | Cema">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Ficha de Empleado
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
                                        label="Buscar"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container columnSpacing={3}>
                                <Grid item lg={5}>
                                    <Stack spacing={3} sx={{my: 2}}>
                                        <ButtonGroup fullWidth aria-label="outlined button group">
                                            <Button sx={{py: .81}} variant="outlined">Hombre</Button>
                                            <Button sx={{py: .81}} variant="outlined">Mujer</Button>
                                        </ButtonGroup>
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
                                            <ButtonGroup fullWidth aria-label="outlined button group">
                                                <Button sx={{py: .81}} variant="outlined">Casado</Button>
                                                <Button sx={{py: .81}} variant="outlined">Soltero</Button>
                                                <Button sx={{py: .81}} variant="outlined">Divorciado</Button>
                                                <Button sx={{py: .81}} variant="outlined">Viudo</Button>
                                            </ButtonGroup>
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

                                <Grid item lg={4}>
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

                                    <Stack spacing={3} sx={{my: 2}}>
                                        <Grid container columnSpacing={1}>
                                            <Grid item xs={9}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="cedula"
                                                    type="text"
                                                    label="Teléfono"
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
                                        <Grid container alignItems="center" columnSpacing={0}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    autoComplete="cedula"
                                                    type="text"
                                                    label="Adjunta Cédula"
                                                    {...getFieldProps('cedula')}
                                                    error={Boolean(touched.cedula && errors.cedula)}
                                                    helperText={touched.cedula && errors.cedula}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button fullWidth sx={{py: .81}} variant="outlined">
                                                    ...
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button fullWidth sx={{py: .81}} variant="contained" color="secondary">
                                                    Ver
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Stack>

                                    <Stack spacing={3} sx={{my: 2}}>
                                        <ButtonGroup fullWidth aria-label="outlined button group">
                                            <Button sx={{py: .81}} variant="outlined">Activo</Button>
                                            <Button sx={{py: .81}} variant="outlined">Inactivo</Button>
                                        </ButtonGroup>
                                    </Stack>
                                </Grid>

                                <Grid item lg={3}>
                                    <Stack spacing={3} sx={{my: 2}}>
                                        <div className="content-img-uploaded">
                                            Foto de perfil
                                        </div>
                                    </Stack>
                                    <Stack spacing={3} sx={{my: 2}}>
                                        <label className="content-upload-label" htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                            <Button fullWidth variant="contained" component="span">
                                                Explorar
                                            </Button>
                                        </label>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Stack spacing={3} sx={{mt: 3}}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    autoComplete="lastname"
                                    type="text"
                                    label="Apellidos"
                                    multiline
                                    rows={4}
                                    maxRows={6}
                                    {...getFieldProps('lastname')}
                                    error={Boolean(touched.lastname && errors.lastname)}
                                    helperText={touched.lastname && errors.lastname}
                                />
                            </Stack>

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                color="primary"
                                sx={{mt: 3}}
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
