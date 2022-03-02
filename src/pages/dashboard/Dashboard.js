import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Routes, Route, Navigate} from "react-router-dom"

import Loader from "../../components/Loader/Loader"

import DashboardLayout from '../../layouts/dashboard';

import DashboardApp from './content/DashboardApp';
import InConstruction from '../InConstruction';

import {useSelector, useDispatch} from "react-redux"
import { set_menu } from '../../store/dashboard/actions';

function PrivateRoute({ children }) {
    // const auth = useAuth();
    let isAuth = true;
    return isAuth ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired
};

function Dashboard() {
    const [loaded, setloaded]   = useState(false);
    const [loading, setloading] = useState(true);

    const [searchData, setsearchData] = useState(true);

    const dashboard = useSelector(state => state.dashboard);
    const session   = useSelector(state => state.session);

    const dispatch = useDispatch();

    async function getData(){
        let role = session.userData.data.role[0].id;
        await dispatch(set_menu(role));
        setloaded(true);
    }

    useEffect(() => {
        if(loading){
            if(!loaded){
                if(searchData){
                    setsearchData(false);
                    // console.log(session.userData.data.role[0].id);
    
                    getData();
                }
            }else if(dashboard.menu !== null){
                // console.log(dashboard);
                setloading(false);
            }
        }
    });
    
    if(loading){
        return <Loader isFullPage />
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route path="app"    element={<PrivateRoute><DashboardApp /></PrivateRoute>}/>
                <Route path=""       element={<Navigate to="/dashboard/app" replace />}/>

                <Route path="ACcoUNt/securE"    element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
                <Route path="ACcoUNt/prOfile"    element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
            </Route>

            <Route path="/login"  element={<Navigate to="/dashboard/app" replace />}/>
            <Route path="/"       element={<Navigate to="/dashboard/app" replace />}/>
        </Routes>
    )
}

export default Dashboard