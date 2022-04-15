// material
import {useState} from "react"
import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Tab, Divider, List, ListItemText, ListItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// components
import Page from '../../../../components/Page';
import { useSelector } from "react-redux";

export default function Perfil() {

    const UserData = useSelector(state => state.session.userData.data);
    let dataPeople = UserData.people;
    console.log(UserData);

    return (
        <Page title="Perfil | CEMA">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Perfil
                </Typography>
            </Box>

            <Grid container columnSpacing={3}>
                <Grid sx={{ pb: 3 }} item xs={4}>
                    <Card sx={{py: 3, px: 5}}>
                        Foto de perfil: ...
                    </Card>
                </Grid>

                <Grid sx={{ pb: 3 }} item xs={8}>

                    <Card sx={{py: 3, px: 5}}>
                        <Typography variant="h3" sx={{mb: 0}}>
                            {dataPeople.firstName+" "+dataPeople.lastName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{mb: 0}}>
                            <Typography color="primary" variant="span" sx={{mr: 1}}>
                            <i className="mdi mdi-email" />
                           </Typography> ({UserData.account.email})
                        </Typography>

                        <Box sx={{py: 1}} />
                        <Divider />
                        <Box sx={{py: 1}} />

                        <Typography variant="h6">
                            Fecha de nacimiento: 
                            <Typography color="primary" variant="span" sx={{mx: 1}}>
                                <i className="mdi mdi-cake-variant-outline" />
                            </Typography>
                            {dataPeople.document.birthday.split("T")[0]}
                        </Typography>
                        <Typography variant="h6">
                            Género: 
                            {dataPeople.document.gender === "H" ?
                                <span><Typography color="primary" variant="span" sx={{mx: 1}}><i className="mdi mdi-human-male" /></Typography>Hombre</span>
                            :
                                <span><Typography color="primary" variant="span" sx={{mx: 1}}><i className="mdi mdi-human-female" /></Typography>Mujer</span>
                            }
                        </Typography>
                        <Typography variant="h6">
                            Documento de identificación:
                            <Typography color="primary" variant="span" sx={{mx: 1}}>
                                <i className="mdi mdi-card-account-details-outline" />
                            </Typography>
                            {dataPeople.document.number}
                        </Typography>
                        
                        {/* 
                            <Divider sx={{mt: 2}} />
                        */}
                    </Card>

                    <Card sx={{py: 3, px: 5, mt: 3}}>
                        <Typography variant="h5" sx={{mb: 0}}>
                            Roles de trabajo:
                        </Typography>

                        <List>
                            {UserData.role.map((role, key) => <ListItem color="primary" key={key} >
                                    <ListItemText color="primary" primary={"- "+role.name} />
                                </ListItem>
                            )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        </Page>
    );
}
