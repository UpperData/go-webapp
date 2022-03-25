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
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../auth/fetch'
import { useAuth } from "../../../auth/AuthProvider";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate                        = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuth();

  const [formErrors, setformErrors]     = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Debe utilizar un email valido').required('El email es requerido'),
    password: Yup.string().required('El password es requerido')
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
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Recuerdame"
          />

          <Link component={RouterLink} variant="subtitle2" 
          // color="" 
          to="/restore-password"
          >
            ¿Olvidó su password?
          </Link>
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
          Iniciar sesión
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
