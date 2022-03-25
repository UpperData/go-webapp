import React, { useEffect, useState } from 'react'
import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import axios from "../../../../auth/fetch"
import Loader from '../../../../components/Loader/Loader';

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

// ----------------------------------------------------------------------


const rows = [
    {
        id:     1,
        name:   "angelds301",
        email:  "angelds301@gmail.com",
        token:  "5659"
    },
    {
        id:     2,
        name:   "eperaray",
        email:  "peperarayanany203@gmail.com",
        token:  "0287"
    },
    {
        id:     3,
        name:   "felipelonga",
        email:  "felipelonga@hotmail.com",
        token:  "3378"
    },
    {
        id:     4,
        name:   "Milpoeid",
        email:  "mileidirusobumbum@gmail.com",
        token:  "4096"
    }
];

let heightColumn = 79.7;
heightColumn *= rows.length;

export default function RestorePassword() {

    const [formErrors, setformErrors]       = useState("");
    const [isVerify, setisVerify]           = useState(false);
    const [isVerifyMsg, setisVerifyMsg]     = useState("");

    const [sending, setsending] = useState(false);

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    let urlIsVerifyEmail    = "/ACCount/ENaBLed/to/RESTAR";

    const getList = async () => {
        axios.get(urlIsVerifyEmail)
        .then((res) => {

            console.log("-----");
            console.log(res.data);

            setdata(res.data.data);
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

    const columns = [
        // { field: 'id',          headerName: 'ID', width: 70 },
        { 
            field: 'name',     
            headerName: 'Nombre de usuario',
            width: 250,
            sortable: false
        },
        { 
            field: 'email',    
            headerName: 'Email',
            width: 300,
            sortable: false
        },
        { 
            field: 'token',    
            headerName: 'Token',
            sortable: false
        },
        { 
            field: 'id',    
            headerName: '',
            renderCell: (cellValues) => {
                let dataId = cellValues;
                return <Button variant="contained" color="primary">
                            Revocar
                        </Button>
            },
            sortable: false
        },
        /*
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        */
    ];

    return (
        <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Restaurar Password
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>
                {!loading &&
                    <Card sx={{py: 3, px: 5}}>

                        {data.length > 0 &&
                            <div>
                                <Grid container sx={{mb: 3}} columnSpacing={3}>
                                    <Grid item xs={12}>
                                        <Typography sx={{mb: 1}} variant="h6">
                                            Filtrar
                                        </Typography>
                                    </Grid>
                                    <Grid sx={{pt: 0}} item xs={10}>
                                        <TextField 
                                            fullWidth 
                                            size="small" 
                                            id="outlined-basic" 
                                            label="Usuario/email" 
                                            variant="outlined" 
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button fullWidth sx={{px: 5, py: 1}} variant="outlined" color="primary">
                                            Restaurar
                                        </Button>
                                    </Grid>
                                </Grid>

                                <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
                                    <DataGrid
                                        sx={{mb:3}}
                                        rows={rows}
                                        columns={columns}

                                        // page={0}
                                        pageSize={6}
                                        // rowsPerPageOptions={[]}
                                        // autoPageSize
                                        rowCount={rows.length}

                                        disableColumnFilter
                                        disableColumnMenu
                                        autoHeight 
                                        disableColumnSelector
                                        disableSelectionOnClick
                                        // checkboxSelection
                                    />
                                </div>

                                <div className="text-center">
                                    <Button sx={{px: 5}} variant="contained" color="primary">
                                        Restaurar
                                    </Button>
                                </div>
                            </div>
                        }

                        {data.length <= 0 &&
                            <Alert severity='info'>
                                No existen cuentas con token de recuperación
                            </Alert>
                        }
                        
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
