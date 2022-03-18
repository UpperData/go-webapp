import React from 'react'
import { Box, Grid, Container, Typography, Divider } from '@mui/material';
import ProfileImgUploader from "../../../../../components/uploadImage/ProfileImgUploader"

function Info() {
  return (
    <Box>
        <Grid sx={{ pb: 3 }} item xs={12}>
            <Grid container justifyContent="space-between" columnSpacing={3}>
                <Grid item md={6} xs={12}>

                    <Grid sx={{mb: 3}} container columnSpacing={3}>
                        <Grid item xs={6} md={5}>
                            <Typography style={{fontWeight:'bold'}}>
                                Fecha Creación: 
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography color="text.secondary">
                                02, febrero 2022
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid sx={{mb: 3}} container columnSpacing={3}>
                        <Grid item xs={6} md={5}>
                            <Typography style={{fontWeight:'bold'}}>
                                Última modificación:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={7}>
                            <Typography color="text.secondary">
                                02, febrero 2022
                            </Typography>
                        </Grid>
                    </Grid>

                    <div>
                        <Typography style={{fontWeight:'bold'}} sx={{mb: 1}}>
                            Membresías: 
                        </Typography>
                        <Box sx={{px: 3}}>
                            <ul className="list-unstyled">
                                <li>
                                    <Typography color="text.secondary">
                                        - Administrador
                                    </Typography>
                                </li>
                                <li>
                                    <Typography color="text.secondary">
                                        - Médico Internista
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                    </div>

                </Grid>
                <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                <Grid item md={5} xs={12}>
                    <Box sx={{width: "100%", maxWidth: "250px", margin: "auto"}}>
                        <img src="/static/info.png" alt="Informacion de perfil" />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Info