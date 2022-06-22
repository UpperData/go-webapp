import React, {useState, useEffect} from "react"
import { Box, Grid, Stack, Divider, Container, Typography, Card, CardContent, Alert, Button, Hidden, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel, TextField, Checkbox, Select, MenuItem, InputLabel, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import axios from "../../../../auth/fetch"

import { DataGrid } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import moment from "moment";

// components
import Page from '../../../../components/Page';
import Loader from "../../../../components/Loader/Loader";

function AccountGroups() {

    const [loading, setloading]             = useState(true);
    const [search, setsearch]               = useState(true);
    const [sending, setsending]             = useState(false);
    const [data, setdata]                   = useState([]);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    const [nameNewGroup, setnameNewGroup]   = useState("");

    const urlGet            = "/front/Role/get/";
    const urlCreateNewRole  = "/admin/rOle/CREATE";
    const urlUpdateNewRole  = "/adMin/rOLE/updatE";

    const addGroup = () => {
        if(nameNewGroup !== ""){
            let dataPost = {
                name: nameNewGroup,
                isActived: true
            }

            setsending(true);
            setalertSuccessMessage("");
            setalertErrorMessage("");

            axios({
                method: "post",
                data:   dataPost,
                url: urlCreateNewRole
            }).then((res) => {
                if(res.data.result){
                    setalertSuccessMessage(res.data.message);
                    setsending(false);
                    setnameNewGroup("");
                    getData();

                    setTimeout(() => {
                        setalertSuccessMessage("");
                        setalertErrorMessage("");
                    }, 5000);
                }
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }else{
            setalertErrorMessage("Debe ingresar un nombre para crear un nuevo grupo");
        }
    }

    const getData = () => {
        axios.get(urlGet+"*")
        .then((res) => {
            if(res.data.result){
                console.log(res.data.data);
                setdata(res.data.data);
                setloading(false);
            }
        }).catch((err) => {
            let error = err.response; 
        });
    }

    useEffect(async () => {
        if(loading){
            if(search){
                await getData();
            }
        }
    }, []);

    let columns = [
        { 
            field: 'id',          
            headerName: '#', 
            width: 70,
            sortable: false,
        },
        { 
            field: 'name',     
            headerName: `Nombre`,
            flex: 1,
            minWidth: 300,
            sortable: false,
        },
        { 
            field: 'createdAt',     
            headerName: `Creación`,
            flex: 1,
            minWidth: 120,
            sortable: false,
            renderCell: (cellValues) => {
                let dataItem = cellValues.row.createdAt;
                return moment(dataItem).format("DD/MM/YYYY")
            },
        },
        { 
            field: 'updatedAt',     
            headerName: `Modificación`,
            flex: 1,
            minWidth: 130,
            sortable: false,
            renderCell: (cellValues) => {
                let dataItem = cellValues.row.updatedAt;
                return moment(dataItem).format("DD/MM/YYYY")
            },
        }
    ];

    return (
        <Page title="Grupos de usuario | CEMA">
            <Container maxWidth="xl">
                <Box sx={{ pb: 3 }}>
                    <Typography variant="h4">
                        Grupos de usuario
                    </Typography>
                </Box>

                <Grid sx={{ pb: 3 }} item xs={12}>
                    {!loading ?
                        <Card>
                            <CardContent>
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

                                <Box sx={{mb: 2}}>

                                    <Typography variant="h6" sx={{mb: 2}}>
                                        Nuevo grupo
                                    </Typography>
                                    <Grid container columnSpacing={3}>
                                        <Grid item md={5} xs={12} sx={{mb: 2}}>
                                            <TextField
                                                label="Nombre del grupo"
                                                size="small"
                                                fullWidth
                                                // placeholder="Nombre del grupo"
                                                value={nameNewGroup}
                                                onChange={(e) => setnameNewGroup(e.target.value)}
                                                // disabled={search}
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={12} sx={{mb: 2}}>
                                            <LoadingButton 
                                                variant="contained" 
                                                color="primary"
                                                type="button"
                                                fullWidth
                                                sx={{py: .9}}
                                                onClick={() => addGroup()}
                                                loading={sending}
                                                disabled={nameNewGroup === "" || nameNewGroup.length <= 5}
                                            >
                                                Guardar
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>

                                    <Divider />

                                </Box>

                                {data.length > 0
                                ?
                                <Box>
                                    <div style={{display: 'table', tableLayout:'fixed', width:'100%'}}>        
                                        <DataGrid
                                            sx={{mb:2}}
                                            rows={data}
                                            rowCount={data.length}
                                            columns={columns}

                                            // page={0}
                                            pageSize={10}
                                            rowsPerPageOptions={[10,20,30]}
                                            // autoPageSize

                                            disableColumnFilter
                                            disableColumnMenu
                                            autoHeight 
                                            disableColumnSelector
                                            // disableSelectionOnClick
                                            // checkboxSelection
                                        />

                                    </div>
                                </Box>
                                :
                                    <Alert sx={{mb: 2}} severity="info">
                                        No existen grupos de usuario registrados.
                                    </Alert>
                                }
                            </CardContent>
                        </Card>
                    :    
                    <Card>
                        <CardContent>
                            <Loader />
                        </CardContent>
                    </Card>
                    }
                </Grid>
            </Container>
        </Page>
    );
}

export default AccountGroups