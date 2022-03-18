// material
import {useState} from "react"
import { Box, Grid, Container, Typography, Card, Button, Modal, TextField, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


// components
import Page from '../../../../components/Page';
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
} from '../../../../components/_dashboard/app';
import Info from "./tabs/Info";
import Password from "./tabs/Password";
import Email from "./tabs/Email";
import Secret from "./tabs/Secret";


export default function Security() {

    const [tab, setTab] = useState('1');

    const handleChange = (event, value) => {
        setTab(value);
    };

    return (
        <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
            <Box sx={{ pb: 3 }}>
                <Typography variant="h4">
                    Seguridad
                </Typography>
            </Box>

            <Grid sx={{ pb: 3 }} item xs={12}>
                <Card sx={{py: 3, px: 5}}>
                    
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Info."      value="1" />
                            <Tab label="Password"   value="2" />
                            <Tab label="Email"      value="3" />
                            <Tab label="Secret"     value="4" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Info />
                        </TabPanel>
                        <TabPanel value="2">
                            <Password />
                        </TabPanel>
                        <TabPanel value="3">
                            <Email />
                        </TabPanel>
                        <TabPanel value="4">
                            <Secret />
                        </TabPanel>
                    </TabContext>
                </Card>
            </Grid>
        </Container>
        </Page>
    );
}
