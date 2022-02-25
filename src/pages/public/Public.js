import React from 'react'
import PropTypes from 'prop-types';
import {Routes, Route, Navigate} from "react-router-dom"

import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import Login from './content/Login';

function PublicRoute({ children }) {
    // const auth = useAuth();
    let isAuth = false;
    return isAuth ? <Navigate to="/dashboard" /> : children;
}

PublicRoute.propTypes = {
    children: PropTypes.object.isRequired
};

function Public() {
    return (
        <Routes>
            <Route path="/" element={<LogoOnlyLayout />} >
                <Route path="login" element={<PublicRoute><Login /></PublicRoute>}/>
                <Route path=""      element={<Navigate to="/login" replace />}/>
            </Route>

            <Route path="/dashboard">
                <Route path="*"     element={<Navigate to="/" replace />}/>
            </Route>
        </Routes>
    )
}

export default Public