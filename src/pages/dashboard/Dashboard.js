import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Routes, Route, Navigate} from "react-router-dom"

import Loader from "../../components/Loader/Loader"

import DashboardLayout from '../../layouts/dashboard';

import Home from './content/Home';
import InConstruction from '../InConstruction';

import {useSelector, useDispatch} from "react-redux"
import { set_menu, set_role } from '../../store/dashboard/actions';

import RestorePassword from './content/usuarios-y-permisos/RestorePassword';
import Security from './content/configuraciones/Security';
import Permissions from './content/usuarios-y-permisos/Permissions';
import CreateAccount from './content/usuarios-y-permisos/CreateAccount';
import FichaPersonal from './content/rrhh/FichaPersonal';
import InformeMedico from './content/citas/InformeMedico';


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

    async function getRole(){
        let localRole   = localStorage.getItem("role");
        let role        = "";

        if(localRole){
            role = JSON.parse(localRole);
        }else{
            role = session.userData.data.role[0];
        }

        // role = session.userData.data.role[0];
        // console.log("Role:"+role);

        await dispatch(set_role(role));
        return role;
    }

    async function getData(){
        let role = await getRole();
        // console.log(role);

        await dispatch(set_menu(role.id));
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
                {/* dashboard */}
                <Route path="app"    element={<PrivateRoute><Home /></PrivateRoute>}/>
                <Route path=""       element={<Navigate to="/dashboard/app" replace />}/>

                {/* config */}
                <Route path="ACcoUNt/securE"    element={<PrivateRoute><Security /></PrivateRoute>}/>
                <Route path="ACcoUNt/prOfile"    element={<PrivateRoute><InConstruction /></PrivateRoute>}/>

                {/* users */}
                <Route path="admin/ACCounT"    element={<PrivateRoute><CreateAccount /></PrivateRoute>}/>
                <Route path="rEstoRe/PAssWord"    element={<PrivateRoute><RestorePassword/></PrivateRoute>}/>
                    <Route path="aCtivE/ACCounT"    element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
                
                    <Route path="GroUP/aCCOunT"    element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
                <Route path="grant/acCOUnT"    element={<PrivateRoute><Permissions /></PrivateRoute>}/>
                
                {/* rrhh */}
                <Route path="rRHH/EmPloyEE/FILE"        element={<PrivateRoute><FichaPersonal /></PrivateRoute>}/>
            
                {/* citas */}
                <Route path="appointment/admin"         element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
                <Route path="appointment/report"        element={<PrivateRoute><InformeMedico /></PrivateRoute>}/>

                {/* inventario */}
                <Route path="InvenTorY/ADMIN"           element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
                <Route path="InVeNTorY/assigment"       element={<PrivateRoute><InConstruction /></PrivateRoute>}/>
            </Route>

            <Route path="/login"  element={<Navigate to="/dashboard/app" replace />}/>
            <Route path="/"       element={<Navigate to="/dashboard/app" replace />}/>
        </Routes>
    )
}

export default Dashboard