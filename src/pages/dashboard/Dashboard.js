import React from 'react'
import PropTypes from 'prop-types';
import {Routes, Route, Navigate} from "react-router-dom"

import DashboardLayout from '../../layouts/dashboard';
import DashboardApp from './content/DashboardApp';

function PrivateRoute({ children }) {
    // const auth = useAuth();
    let isAuth = true;
    return isAuth ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired
};

function Dashboard() {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route path="app"    element={<PrivateRoute><DashboardApp /></PrivateRoute>}/>
                <Route path=""       element={<Navigate to="/dashboard/app" replace />}/>
            </Route>

            <Route path="/login"  element={<Navigate to="/dashboard/app" replace />}/>
        </Routes>
    )
}

export default Dashboard