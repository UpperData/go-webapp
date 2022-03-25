import React, {useState, useEffect} from 'react'
import * as Yup from 'yup';
import { Box, Grid, Container, Typography, Divider, Alert, Stack, TextField, Button } from '@mui/material';
import ProfileImgUploader from "../../../../../components/uploadImage/ProfileImgUploader"
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

import axios from "../../../../../auth/fetch"
import Loader from '../../../../../components/Loader/Loader';

function Secret() {

    const [formErrors, setformErrors]       = useState("");
    const [isVerify, setisVerify]           = useState(true);

    const [sending, setsending]             = useState(false);
    const [loading, setloading]             = useState(true);
    const [search, setsearch]               = useState(true);

    const [data, setdata]                       = useState(null);
    const [secretQuestions, setsecretQuestions] = useState(null);

    const [alertSuccessMessage, setalertSuccessMessage] = useState("");
    const [alertErrorMessage,   setalertErrorMessage]   = useState("");

    let urlGetSecretQuestions = "/secREt/CURRENT/GET";

    const getQuestions = async () => {
        axios.get(urlGetSecretQuestions)
        .then((res) => {

            console.log("-----");

            if(res.data.result){
                console.log(res.data);
                setsecretQuestions(res.data.data);
                setloading(false);
            }

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
                await getQuestions();
            }
        }
     }, []);

    const LoginSchema =  Yup.object().shape({
        // password:        Yup.string().required('Debe ingresar su password'),
        responseOne:     Yup.string().required('Debe ingresar su respuesta'),
        responseTwo:     Yup.string().required('Debe ingresar su respuesta')
    });

    const LoginSchema1 =  Yup.object().shape({
        response:        Yup.string().required('Debe ingresar su respuesta'),
        response2:       Yup.string().required('Debe ingresar su respuesta')
    });

    const formik = useFormik({
        initialValues: {
          // password:          '',
          responseOne:       '',
          responseTwo:       ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {resetForm}) => {
          try {
            setalertSuccessMessage("");
            setalertErrorMessage("");
            setsending(true);

            let urlUpdateSecurity = "/cema/security/cont/";
            let formattedData = {
                secret: [
                    {
                        answer:     secretQuestions[0],
                        question:   values.responseOne
                    },
                    {
                        answer:     secretQuestions[1],
                        question:   values.responseTwo
                    }
                ]
            }

            axios({
                method: "GET",
                url: urlUpdateSecurity+`?`+formattedData,
                // data: formattedData
            }).then((res) => {
                console.log(res.data);
                setsending(false);

                if(res.data.result){
                    setalertSuccessMessage(res.data.message);
                    resetForm();

                    setTimeout(() => {
                        setalertSuccessMessage("");
                    }, 20000);
                }

            }).catch((err) => {
                let fetchError = err;

                console.error(fetchError);
                if(fetchError.response){
                    console.log(err.response);
                    setalertErrorMessage(err.response.data.message);
                    setsending(false);
                    // return Promise.reject(err.response.data.data);
                }
            });
          } catch(e) {
            // setformErrors(e);
          }
        }
    });

    const formik1 = useFormik({
        initialValues: {
            question:   '',
            response:   '',

            question2:  '',
            response2:  ''
        },
        validationSchema: LoginSchema1,
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
    const { errors : errors1, touched : touched1, values : values1, isSubmitting : isSubmitting1, handleSubmit : handleSubmit1, getFieldProps : getFieldProps1 } = formik1;

    if(!loading){
        return (
            <Box>
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

                <Grid sx={{ pb: 3 }} item xs={12}>
                    <Grid container alignItems="end" justifyContent="space-between" columnSpacing={3}>
                        <Grid item md={6} xs={12}>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    {formErrors !== "" &&
                                        <div>
                                            <Alert sx={{mb: 3}} severity="error">
                                                {formErrors.message}
                                            </Alert>
                                        </div>
                                    }

                                    {/* 
                                        <Stack spacing={3} sx={{mt: 2, mb: 5}}>
                                            <TextField
                                                size='small'
                                                fullWidth
                                                autoComplete="password"
                                                type="password"
                                                label="Ingrese su password"
                                                {...getFieldProps('password')}
                                                error={Boolean(touched.password && errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </Stack>
                                    */}

                                    <Box sx={{mb: 4}}>
                                        <Typography sx={{fontWeight: "bold", my: 2}} component="h6">
                                            #1: {secretQuestions[0]}
                                        </Typography>
                                        <TextField
                                            sx={{mt:0, pt:0}}
                                            size='small'
                                            fullWidth
                                            autoComplete="responseOne"
                                            type="text"
                                            label="Respuesta"
                                            {...getFieldProps('responseOne')}
                                            error={Boolean(touched.responseOne && errors.responseOne)}
                                            helperText={touched.responseOne && errors.responseOne}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography sx={{fontWeight: "bold", my: 2}} component="h6">
                                            #2: {secretQuestions[1]}
                                        </Typography>
                                        <TextField
                                            sx={{mt:0, pt:0}}
                                            size='small'
                                            fullWidth
                                            autoComplete="responseTwo"
                                            type="text"
                                            label="Respuesta"
                                            {...getFieldProps('responseTwo')}
                                            error={Boolean(touched.responseTwo && errors.responseTwo)}
                                            helperText={touched.responseTwo && errors.responseTwo}
                                        />
                                    </Box>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={sending}
                                        color="primary"
                                        sx={{mt: 5}}
                                        disabled
                                    >
                                        Actualizar Respuestas
                                    </LoadingButton>
                                </Form>
                            </FormikProvider>
                        </Grid>
                        
                        <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                        
                        <Grid item md={5} alignItems="end" xs={12}>

                            <FormikProvider value={formik1}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit1}>
                                    <Stack spacing={3} sx={{my: 2}}>
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="question"
                                            type="text"
                                            label="Pregunta 1"
                                            {...getFieldProps1('question')}
                                            error={Boolean(touched1.question && errors1.question)}
                                            helperText={touched1.question && errors1.question}
                                        />
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="response"
                                            type="text"
                                            label="Respuesta 1"
                                            {...getFieldProps1('response')}
                                            error={Boolean(touched1.response && errors1.response)}
                                            helperText={touched1.response && errors1.response}
                                        />
                                    </Stack>

                                    <Stack spacing={3}>
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="question2"
                                            type="text"
                                            label="Pregunta 2"
                                            {...getFieldProps1('question2')}
                                            error={Boolean(touched1.question2 && errors1.question2)}
                                            helperText={touched1.question2 && errors1.question2}
                                        />
                                        <TextField
                                            size='small'
                                            fullWidth
                                            autoComplete="response2"
                                            type="text"
                                            label="Respuesta 2"
                                            {...getFieldProps1('response2')}
                                            error={Boolean(touched1.response2 && errors1.response2)}
                                            helperText={touched1.response2 && errors1.response2}
                                        />
                                    </Stack>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting1}
                                        color="secondary"
                                        sx={{mt: 5}}
                                        disabled
                                    >
                                        Renovar Preguntas
                                    </LoadingButton>
                                </Form>
                            </FormikProvider>  
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return <Loader />
}

export default Secret