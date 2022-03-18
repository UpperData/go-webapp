import React, {useState} from 'react'
import * as Yup from 'yup';
import { Box, Grid, Container, Typography, Divider, Alert, Stack, TextField, Button } from '@mui/material';
import ProfileImgUploader from "../../../../../components/uploadImage/ProfileImgUploader"
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

function Secret() {

    const [formErrors, setformErrors]       = useState("");
    const [isVerify, setisVerify]           = useState(true);

    const LoginSchema =  Yup.object().shape({
        password:        Yup.string().required('Debe ingresar su password'),
        responseOne:     Yup.string().required('Debe ingresar su respuesta'),
        responseTwo:     Yup.string().required('Debe ingresar su respuesta')
    });

    const LoginSchema1 =  Yup.object().shape({
        question:        Yup.string().required('Ingrese su pregunta'),
        response:        Yup.string().required('Debe ingresar su respuesta'),

        question2:       Yup.string().required('Ingrese su pregunta'),
        response2:       Yup.string().required('Debe ingresar su respuesta')
    });

    const formik = useFormik({
        initialValues: {
          password:          '',
          responseOne:       '',
          responseTwo:       ''
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

    return (
        <Box>
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

                                <Stack spacing={3} sx={{my: 2}}>
                                    <Typography sx={{fontWeight: "bold"}} component="h6">
                                        Pregunta 1
                                    </Typography>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="responseOne"
                                        type="text"
                                        label="Respuesta"
                                        {...getFieldProps('responseOne')}
                                        error={Boolean(touched.responseOne && errors.responseOne)}
                                        helperText={touched.responseOne && errors.responseOne}
                                    />
                                </Stack>

                                <Stack spacing={3}>
                                    <Typography sx={{fontWeight: "bold"}} component="h6">
                                        Pregunta 2
                                    </Typography>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="responseTwo"
                                        type="text"
                                        label="Respuesta"
                                        {...getFieldProps('responseTwo')}
                                        error={Boolean(touched.responseTwo && errors.responseTwo)}
                                        helperText={touched.responseTwo && errors.responseTwo}
                                    />
                                </Stack>

                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                    color="primary"
                                    sx={{mt: 5}}
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

export default Secret