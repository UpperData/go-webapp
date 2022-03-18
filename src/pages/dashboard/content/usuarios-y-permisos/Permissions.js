import {useState} from "react"
// material
import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

const rows = [
	{
		id: '1',
		group: 'Requisiones',
		permissions: {
			create: 	true,
			edit: 		false,
			print:		false,
			query:		false,
			reference: 	true
		}
	},
	{
		id: '2',
		group: 'Proveedores',
		permissions: {
			create: 	true,
			edit: 		true,
			print:		true,
			query:		false,
			reference: 	true
		}
	},
	{
		id: '3',
		group: 'Presupuesto',
		permissions: {
			create: 	true,
			edit: 		true,
			print:		true,
			query:		false,
			reference: 	true
		}
	},
	{
		id: '4',
		group: 'Monitor',
		permissions: {
			create: 	true,
			edit: 		true,
			print:		true,
			query:		true,
			reference: 	true
		}
	},
	{
		id: '5',
		group: 'Facturación',
		permissions: {
			create: 	true,
			edit: 		false,
			print:		true,
			query:		false,
			reference: 	true
		}
	},
	{
		id: '6',
		group: 'Productos',
		permissions: {
			create: 	true,
			edit: 		true,
			print:		false,
			query:		false,
			reference: 	true
		}
	},
];

let heightColumn = 79.7;
heightColumn *= rows.length;

export default function Permissions() {

    const [data, setdata]       = useState(rows);
    const [count, setcount]     = useState(0);

    let columns = [
        // { field: 'id',          headerName: 'ID', width: 70 },
        { 
            field: 'group',     
            headerName: 'Tareas para modulo',
            width: 300,
            renderCell: (cellValues) => {
                let data = cellValues;
                // console.log(data);
                return <Typography sx={{fontWeight: 'normal', mb:0}} variant="body">
                    {data.row.group}
                </Typography>
            }
        },
        { 
            field: 'permissions.create',    
            headerName: 'Crea',
            sortable: false,
            // width: 300,
            renderCell: (cellValues) => {
                let data = cellValues;
                let ischecked = data.row.permissions.create;
                return <Checkbox onChange={() => changePermission(data.row.id, "create", !ischecked)} checked={ischecked} />
            }
        },
        { 
            field: 'permissions.edit',    
            headerName: 'Edita',
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let ischecked = data.row.permissions.edit;
                return <Checkbox onChange={() => changePermission(data.row.id, "edit", !ischecked)} checked={ischecked} />
            }
            // width: 300
        },
        { 
            field: 'permissions.query',    
            headerName: 'Consulta',
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let ischecked = data.row.permissions.query;
                return <Checkbox onChange={() => changePermission(data.row.id, "query", !ischecked)} checked={ischecked} />
            }
            // width: 300
        },
        { 
            field: 'permissions.print',    
            headerName: 'Imprime',
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let ischecked = data.row.permissions.print;
                return <Checkbox onChange={() => changePermission(data.row.id, "print", !ischecked)} checked={ischecked} />
            }
            // width: 300
        },
        { 
            field: 'permissions.reference',    
            headerName: 'Referencia',
            sortable: false,
            renderCell: (cellValues) => {
                let data = cellValues;
                let ischecked = data.row.permissions.reference;
                return <Checkbox onChange={() => changePermission(data.row.id, "reference", !ischecked)} checked={ischecked} />
            }
            // width: 300
        }
    ];

    function changePermission (id, permission, isChecked) {
        // console.log(id,permission, isChecked);
        
        let thisGroup = data.find(item => item.id === id);
        let index     = data.indexOf(thisGroup);
        thisGroup.permissions[permission] = isChecked;

        let newTable    =  [...data];
        newTable[index] = thisGroup;

        setdata(data);
        setcount(count + 1);
    }

    return (
        <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Gestión de Permisos
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>
                <Card sx={{py: 3, px: 5}}>
                    <Typography sx={{mb: 1}} variant="h6">
                        Seleccione
                    </Typography>
                    <Grid container sx={{mb: 3}} columnSpacing={3}>
                        <Grid sx={{pt: 0}} item md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Grupos
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value=""
                                    // onChange={handleChange}
                                    autoWidth
                                    label="Grupos"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-autowidth-label">
                                    Módulos
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value=""
                                    // onChange={handleChange}
                                    autoWidth
                                    label="Módulos"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <div>
                        <Grid justifyContent="space-between" container sx={{mb: 3}} columnSpacing={3}>
                            <Grid alignItems="center" item xs={4}>
                                <Typography sx={{mb: 1}} variant="h6">
                                    Administrar Grupo
                                </Typography>
                            </Grid>
                            <Grid sx={{pt: 0}} item xs={4}>
                                <Box sx={{ textAlign: "right" }} item>
                                    <Button sx={{px: 5}} variant="contained" color="primary">
                                        Guardar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>

                        <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>
                            <DataGrid
                                sx={{mb:3}}
                                rows={data}
                                columns={columns}

                                // page={0}
                                pageSize={6}
                                // rowsPerPageOptions={[]}
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

                        <Box sx={{ textAlign: "right" }} item xs={12}>
                            <Button sx={{px: 5}} variant="contained" color="primary">
                                Guardar
                            </Button>
                        </Box>
                    </div>
                
                </Card>
            </Grid>
        </Container>
        </Page>
    );
}
