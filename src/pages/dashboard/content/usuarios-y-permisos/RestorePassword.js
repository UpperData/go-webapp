// material
import { Box, Grid, Container, Typography, Card, Button, Modal, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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


const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 5),
  color: "#fff",
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));
  
/*
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
*/

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

    const columns = [
        // { field: 'id',          headerName: 'ID', width: 70 },
        { 
            field: 'name',     
            headerName: 'Nombre de usuario',
            width: 250
        },
        { 
            field: 'email',    
            headerName: 'Email',
            width: 300
        },
        { 
            field: 'token',    
            headerName: 'Token' 
        },
        { 
            field: 'id',    
            headerName: '',
            renderCell: (cellValues) => {
                let dataId = cellValues;
                return <Button variant="contained" color="primary">
                            Revocar
                        </Button>
            }
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
                <Card sx={{py: 3, px: 5}}>
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
                </Card>
            </Grid>
        </Container>
        </Page>
    );
}
