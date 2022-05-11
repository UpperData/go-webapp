import React, { useEffect, useState } from 'react'
import axios from "../../../../auth/fetch"

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Alert } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

import Loader from '../../../../components/Loader/Loader';
import Page from '../../../../components/Page';

export default function PatientHistory() {

    const params                = useParams();

    const [sending, setsending] = useState(false);
    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    console.log(params.id);
    let urlGetData          = "/PaTIENT/medicaL/HistoRy/"+params.id;

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
        if(params.id){
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
    }

    useEffect(async () => {
        if(loading){
            if(search){
                await getList();
            }
        }
    }, []);

    return (
        <Page title="Historia del paciente | CEMA">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Historia del paciente
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
