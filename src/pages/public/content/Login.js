import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../../layouts/AuthLayout';
// components
import Page from '../../../components/Page';
import { MHidden } from '../../../components/@material-extend';
import { LoginForm } from '../../../components/authentication/login';

// import AuthSocial from '../../../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    // backgroundColor: theme.palette.primary.main,
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
   backgroundColor: "#fff",
  // backgroundColor: theme.palette.primary.main,
  width: 464,
  height: '95vh',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  border: "none",
  // boxShadow: "none"
}));

const SectionStyleInto = styled('div')(({ theme }) => ({
  backgroundColor: "#fff",
  // backgroundColor: theme.palette.primary.main,
  // width: 464,
  // height: '95vh',
  // maxWidth: 464,
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  minWidth: 350,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | CEMA">
      {/* 
      <AuthLayout>
        
          ¿Aun no posees una cuenta? &nbsp;
          <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
            Registrate
          </Link>
        
      </AuthLayout>
      */}

      <MHidden width="mdDown" minHeight="">
        <div>
          <SectionStyle>
            
            <Typography color="primary.main" variant="h1" sx={{ px: 5, mt: 5, mb: 1, fontWeight: 900 }}>
              CEMA
            </Typography>
            <Typography color="body1" variant="h5" sx={{ px: 5 }}>
                Es momento de hacer un plan de salud para ti y tu familia, inicie sesión ahora mismo y hágalo realidad.
            </Typography>
            
            <SectionStyleInto sx={{ py: 2 }}>
              <div className="text-center">
                <img src="/static/mobiledoctor.png" className='mx-auto w-100' style={{maxWidth: "400px", minWidth: "400px"}} alt="login" />
              </div>
            </SectionStyleInto>

          </SectionStyle>
        </div>
      </MHidden>

      <Container className='' maxWidth="sm">
        <div className='overlay-bottom' />
        <ContentStyle>
          
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h3" gutterBottom>
              Iniciar sesión
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingrese sus datos a continuación.</Typography>
          </Stack>

          {/* 
            <AuthSocial />
          */}

          <LoginForm />

          {/* 
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿Aun no posees una cuenta?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
              Registrate
              </Link>
            </Typography>
          </MHidden>
          */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
