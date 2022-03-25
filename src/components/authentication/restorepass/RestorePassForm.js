import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  Grid,
  Button,
  Divider,
  Typography
} from '@mui/material';

import { useAuth } from "../../../auth/AuthProvider";
import { LoadingButton } from '@mui/lab';
import axios from '../../../auth/fetch'

// ----------------------------------------------------------------------

export default function RestorePassForm() {
  const navigate                        = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuth();

  // const [email, setemail]               = useState("");

  const [verify, setverify]             = useState(false);
  const [validEmail, setvalidEmail]     = useState(false);

  const [formErrors, setformErrors]     = useState("");

  const [alertSuccessMessage, setalertSuccessMessage] = useState("");
  const [alertErrorMessage,   setalertErrorMessage]   = useState("");

  const validateEmail = (email) => {
    let url = `/accoUnt/EmAIl/VALIDAtor/${email}`;

    setalertSuccessMessage("");
    setalertErrorMessage("");
    setverify(true);

    axios.get(url)
    .then((res) => {
        console.log("-----");
        console.log(res.data);
        if(res.data.result){
          setvalidEmail(true);
        }

        setverify(false);
    }).catch((err) => {
        let error = err.response;
        if(error){
            if(error.data){
                console.error(error.data.data);
                setalertErrorMessage(error.data.data.message);
            }
        }

        setverify(false);
    });
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Verifique el formato de su email').required('Su email es requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setformErrors("");
        await login(values.email, values.password);
      } catch(e) {
        setformErrors(e);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const changeEmail = () => {
    setverify(false);
    setvalidEmail(false);
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {formErrors !== "" &&
          <div>
            <Alert sx={{mb: 3}} severity="error">
              {formErrors.message}
            </Alert>
          </div>
        }

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

        {!validEmail &&
          <Grid container columnSpacing={3}>
            <Grid item md={9}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email"

                // value={email}
                // onChange={(e) => setemail(e.target.value)}

                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item md={3}>
              <LoadingButton 
                sx={{py: 3.5}} 
                size='large' 
                variant='contained' 
                color="primary"
                onClick={() => validateEmail(values.email)}
                type="button"
                loading={verify}
              >
                Validar
              </LoadingButton>
            </Grid>
          </Grid>
        }

        {validEmail &&
          <div>
            <Grid container columnSpacing={3}>
              <Grid item md={9}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email"
                  color="success"
                  focused 
                  // value={email}
                  // onChange={(e) => setemail(e.target.value)}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item md={3}>
                <Button 
                  sx={{py: 3.5}} 
                  size='large' 
                  variant='contained' 
                  color="secondary"
                  onClick={() => changeEmail()}
                  type="button"
                >
                  Cambiar
                </Button>
              </Grid>
            </Grid>

            <Stack spacing={3} sx={{mt: 3}}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Token"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
            </Stack>

            <Stack spacing={3} sx={{mt: 3}}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Nuevo Password"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
            </Stack>
          </div>
        }

        {validEmail &&
          <div>
            <Divider sx={{mt: 3}} />

            <Typography variant="h5" sx={{ py: 3, fontWeight: "bold" }}>
              Preguntas de seguridad
            </Typography>

            <Stack spacing={3}>
                <Typography variant="p" sx={{ fontWeight: "normal", m:0, p:0 }}>
                  Preguntas de seguridad
                </Typography>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Respuesta"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
            </Stack>

            <Stack spacing={3} sx={{mt: 3}}>
              <Typography variant="p" sx={{ fontWeight: "normal", m:0, p:0 }}>
                Preguntas de seguridad
              </Typography>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Respuesta"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
            </Stack>
          </div>
        }

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
          <Typography>
            Si ha recuperado su contraseña puede probar
            <Link component={RouterLink} variant="subtitle2" sx={{ml:1}} 
            // color="" 
            to="/login"
            >
              Iniciar sesion
            </Link>
          </Typography>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          color="secondary"
          sx={{mt: 5}}
          disabled={!validEmail}
        >
          Restaurar Password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
