import React, {useState} from 'react'
import * as Yup from 'yup';
import { Box, Grid, Container, Typography, Divider, Alert, Stack, TextField, Button } from '@mui/material';
import ProfileImgUploader from "../../../../../components/uploadImage/ProfileImgUploader"
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

function Email() {

    const [formErrors, setformErrors]       = useState("");
    const [isVerify, setisVerify]           = useState(false);

    const LoginSchema = Yup.object().shape({
        password:        Yup.string().required('Debe ingresar su password'),
        newEmail:        Yup.string().required('Debe ingresar un nuevo email'),
        repeatNewEmail:  Yup.string().required('Repita su email para confirmar')
    });

    const formik = useFormik({
        initialValues: {
          password:             '',
          newEmail:             '',
          repeatNewEmail:       ''
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

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Box>
            <Grid sx={{ pb: 3 }} item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" columnSpacing={3}>
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
                                
                                <Stack spacing={3} sx={{my: 2}}>
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
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="newEmail"
                                        type="text"
                                        label="Nuevo email"
                                        {...getFieldProps('newEmail')}
                                        error={Boolean(touched.newEmail && errors.newEmail)}
                                        helperText={touched.newEmail && errors.newEmail}
                                    />
                                </Stack>

                                <Stack spacing={3}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="repeatNewEmail"
                                        type="text"
                                        label="Repita email"
                                        {...getFieldProps('repeatNewEmail')}
                                        error={Boolean(touched.repeatNewEmail && errors.repeatNewEmail)}
                                        helperText={touched.repeatNewEmail && errors.repeatNewEmail}
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
                                    Actualizar Email
                                </LoadingButton>
                            </Form>
                        </FormikProvider>
                    </Grid>
                    
                    <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                    
                    <Grid item md={5} xs={12}>
                        
                        {(!isVerify)
                            ?
                            <div>
                                <Alert sx={{mb: 3}} severity="info">
                                    Su email no se ha certificado aún, muchas funciones del sistema requieren que la certificación este completa.
                                </Alert>
                                <Button fullWidth variant="contained" size="large" color="secondary">
                                    Certificar Email
                                </Button>
                            </div>
                            :
                            <div>
                                <Box sx={{width: "100%", maxWidth: "250px", margin: "auto"}}>
                                    <img src="/static/check.png" alt="Cuenta verificada" />
                                </Box>
                                <Typography sx={{pt: 2, fontWeight: "bold"}} color="text.secondary" component="h4" align='center'>
                                    Cuenta verificada
                                </Typography>
                            </div>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Email