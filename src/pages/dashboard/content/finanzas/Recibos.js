import React, { useEffect, useState } from 'react'
import axios from "../../../../auth/fetch"

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Alert, FormControl,InputLabel,Select } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import Loader from '../../../../components/Loader/Loader';
import Page from '../../../../components/Page';


let dummyData = [
    {
        id: 1, 
        description: "Citas 01235",
        price: 100,
        quantity: 1
    }
]

export default function Bills() {

    const [sending, setsending] = useState(false);
    const [loading, setloading] = useState(false);
    const [search, setsearch]   = useState(false);
    const [data, setdata]       = useState(dummyData);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    let urlGetData          = "";

    const LoginSchema =     Yup.object().shape({
        text:               Yup.string().required('')
    });

    const formik = useFormik({
        initialValues: {
            text:      ""
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {resetForm}) => {
          try {

            setsending(true);
            setalertErrorMessage("");
            setalertSuccessMessage("");
            
          } catch(e) {
            setsending(false);
          }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const getList = async () => {
        axios.get(urlGetData)
        .then((res) => {

            console.log("---Data---");
            console.log(res.data);

            setdata(res.data.data);
            setsending(false);
            setloading(false);

        }).catch((err) => {

            let error = err.response;
            if(error){
                if(error.data){
                    setloading(true);
                }
            }
            
        });
    }

    useEffect(async () => {
        if(loading){
            if(search){
                await getList();
            }
        }
    }, []);


    let columns = [
        { 
            field: 'id',          
            headerName: '#', 
            width: 50,
            headerAlign: 'center',
            sortable: false,
            align: "center"
        },
        { 
            editable: false,
            field: 'articleId',     
            headerName: `Descripción`,
            width: 300,
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                // console.log(data);
                return  <Typography sx={{fontWeight: "bold"}}>
                    {data.row.description}
                </Typography> 
            }
        },
        { 
            field: 'price',    
            headerName: 'Precio',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (cellValues) => {
                let data = cellValues;
                let price = data.row.price;
                return  <Typography>
                    {"Bs."+price}
                </Typography> 
            }
        },
        { 
            field: 'quantity',    
            headerName: 'Cantidad',
            sortable: false,
            width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'sub-total',     
            headerName: `Sub Total`,
            width: 200,
            headerAlign: 'right',
            align: "right",
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let price = data.row.price;
                return  <Typography>
                    {"Bs."+price}
                </Typography> 
            }
        }
    ];

    return (
        <Page title="Recibos | CEMA">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Recibos
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>
                {!loading &&
                    <Card sx={{py: 3, px: 5}}>

                        {alertSuccessMessage !== "" &&
                            <Alert sx={{my: 3}} severity="success">
                                {alertSuccessMessage}
                            </Alert>
                        }

                        {alertErrorMessage !== "" &&
                            <Alert sx={{my: 3}} severity="error">
                                {alertErrorMessage}
                            </Alert>
                        }

                        <Box sx={{mb: 3}}>

                            <Grid sx={{mb: 5}} container columnSpacing={3}>
                                <Grid item lg={8}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="bill-user-id">
                                            Empleado / Contratado
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="Doctor"
                                            id="bill-user-id"
                                            defaultValue=""
                                            // value={doctor === null ? "" : doctor}
                                            // onChange={(e) => changeDoctor(e.target.value)}
                                            label="Empleado / Contratado"
                                            // MenuProps={MenuProps}
                                            // disabled={municipios.length === 0}

                                            // {...getFieldProps('departamento')}
                                            // error={Boolean(touched.municipio && errors.municipio)}
                                            // helperText={touched.departamento && errors.departamento}
                                        >
                                            {/*
                                                doctors.map((item, key) => {
                                                    let dataItem = item;
                                                    // console.log(dataItem.account.employeeFiles);
                                                    return <MenuItem key={key} value={dataItem.account.accountId.toString()}>
                                                                {dataItem.account.employeeFiles.length > 0
                                                                    ?
                                                                    dataItem.account.employeeFiles[0].fisrtName+ " " +dataItem.account.employeeFiles[0].lastName
                                                                    :
                                                                    dataItem.account.name
                                                                }
                                                            </MenuItem>
                                                })
                                            */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4}>
                                    <Grid container columnSpacing={1}>
                                        <Grid item lg={8}>
                                            <TextField
                                                label="Honorario"
                                                size="small"
                                                // value={textSearchData}
                                                // onChange={(e) => settextSearchData(e.target.value)}
                                                // disabled={!permissions.consulta}
                                            />
                                        </Grid>
                                        <Grid item lg={4}>
                                            <LoadingButton 
                                                variant="contained" 
                                                color="primary"
                                                type="button"
                                                sx={{ minWidth: "100%", width: "100%"}}
                                                // onClick={() => searchDataToEdit(setFieldValue)}
                                                // loading={searchingData}
                                                // disabled={textSearchData === "" || !permissions.consulta}
                                            >
                                                Actualizar
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid sx={{mb: 5}} container columnSpacing={3}>
                                <Grid item lg={2}>
                                    <Button 
                                        // onClick={() => reset()} 
                                        variant="outlined" 
                                        fullWidth
                                    >
                                        Anular
                                    </Button>
                                </Grid>
                                <Grid item lg={2}>
                                    <Button 
                                        // disabled={!permissions.imprime || typeForm === "create"} 
                                        variant="contained" fullWidth
                                    >
                                        Imprimir
                                    </Button>
                                </Grid>
                                <Grid item lg={2}>
                                    <Button 
                                        // disabled={!permissions.imprime || typeForm === "create"} 
                                        variant="contained" fullWidth
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item lg={2}>
                                    &nbsp;
                                </Grid>
                                <Grid item lg={4}>
                                    <Grid container columnSpacing={1}>
                                        <Grid item lg={8}>
                                            <TextField
                                                label="Recibo #"
                                                size="small"
                                                // value={textSearchData}
                                                // onChange={(e) => settextSearchData(e.target.value)}
                                                // disabled={!permissions.consulta}
                                            />
                                        </Grid>
                                        <Grid item lg={4}>
                                            <LoadingButton 
                                                variant="contained" 
                                                color="primary"
                                                type="button"
                                                sx={{ minWidth: "100%", width: "100%"}}
                                                // onClick={() => searchDataToEdit(setFieldValue)}
                                                // loading={searchingData}
                                                // disabled={textSearchData === "" || !permissions.consulta}
                                            >
                                                Buscar
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Box>

                        <Box>
                            <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}> 
                                <DataGrid
                                    sx={{mb:4}}
                                    rows={data}
                                    columns={columns}

                                    // onCellEditStop={(params) => handleCellEditStop(params)}
                                    // experimentalFeatures={{ newEditingApi: true }}
                                    // onCellEditStart={(params) => handleCellEditStart(params)}
                                    // processRowUpdate={processRowUpdate}

                                    // onCellEditCommit={(params) => handleCellEditStop(params)}
                                    // onCellFocusOut={(params)   => validateChanges(params)}

                                    hideFooter
                                    page={0}
                                    pageSize={6}
                                    rowsPerPageOptions={[6,10,20]}
                                    // autoPageSize
                                    rowCount={data.length}

                                    disableColumnFilter
                                    disableColumnMenu
                                    autoHeight 
                                    disableColumnSelector
                                    disableSelectionOnClick
                                    // checkboxSelection
                                />
                            </div>
                        </Box>

                        {/* form */}

                        {/* 
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    
                                </Form>
                            </FormikProvider>
                        */}

                    </Card>
                }

                {loading &&
                    <Card sx={{py: 3, px: 5}}>
                        <Loader />
                    </Card>
                }
            </Grid>
        </Container>
        </Page>
    );
}
