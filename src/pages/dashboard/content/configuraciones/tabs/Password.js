import React, {useState} from 'react'
import * as Yup from 'yup';
import { Box, Grid, Container, Typography, Divider, Alert, Stack, TextField } from '@mui/material';
import ProfileImgUploader from "../../../../../components/uploadImage/ProfileImgUploader"
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

function Info() {

    const [formErrors, setformErrors]     = useState("");

    const LoginSchema = Yup.object().shape({
        password:           Yup.string().required('Debe ingresar su password'),
        newpassword:        Yup.string().required('Debe ingresar un nuevo password'),
        repeatnewpassword:  Yup.string().required('Repita su password')
    });

    const formik = useFormik({
        initialValues: {
          password:             '',
          newpassword:          '',
          repeatnewpassword:    ''
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
                                        label="Password actual"
                                        {...getFieldProps('password')}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Stack>

                                <Stack spacing={3} sx={{my: 2}}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="newpassword"
                                        type="password"
                                        label="Nuevo password"
                                        {...getFieldProps('newpassword')}
                                        error={Boolean(touched.newpassword && errors.newpassword)}
                                        helperText={touched.newpassword && errors.newpassword}
                                    />
                                </Stack>

                                <Stack spacing={3}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        autoComplete="repeatnewpassword"
                                        type="password"
                                        label="Repita Nuevo password"
                                        {...getFieldProps('repeatnewpassword')}
                                        error={Boolean(touched.repeatnewpassword && errors.repeatnewpassword)}
                                        helperText={touched.repeatnewpassword && errors.repeatnewpassword}
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
                                    Cambiar Password
                                </LoadingButton>
                            </Form>
                        </FormikProvider>
                    </Grid>
                    
                    <Divider orientation="vertical" flexItem style={{marginRight:"-1px"}} />
                    
                    <Grid item md={5} xs={12}>
                        
                        <img src="/static/password.png" alt="Informacion de perfil" />
                        
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Info