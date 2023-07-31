// material
import { Box, Grid, Container, Typography, Card, Button, Modal } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// components
import Page from '../../../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../../../components/_dashboard/app';

// ----------------------------------------------------------------------


const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 5),
  color: "#fff",
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

export default function Home() {
  return (
    <Page title="Dashboard | RepuestosGo">
      <Container maxWidth="xl">
        <Box sx={{ pb: 3 }}>
          <Typography 
            variant="h4" 
            color="white.main"
          >
            RepuestosGo - Dashboard
          </Typography>
        </Box>

        {/*
          <Grid item xs={12}>
            <Box sx={{ borderRadius: "25px", overflow: "hidden" }}>
              <img src="/static/img/Background.png" alt="Banner" />
            </Box>
          </Grid>
        */}

        <Grid sx={{ pb: 3 }} item xs={12}>
          <Card sx={{py: 3, px: 5}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <img src="/assets/svgimg/art-welcome.svg" alt="Banner" />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="info" align='left' variant="h3">
                  La plataforma confiable en repuestos de calidad
                </Typography>
                <Typography color="text.secondary" align='left' variant="p">
                  Visualice estadísticas en tiempo real y optimize al máximo su tiempo navegando de manera rápida por el panel administrativo utilizando los accesos directos.
                </Typography>

                <Box sx={{pt: 2}}>
                  <Button LinkComponent={Link} variant="contained" to="/dashboard/ACcoUNt/prOfile">
                    Perfil
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid container spacing={3}>
          {/* 
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AppBugReports />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits />
            </Grid>

            <Grid item xs={12}>
              <AppNewsUpdate />
            </Grid>
          */}
        </Grid>
      </Container>
    </Page>
  );
}
