import {useState} from "react"
import { Navigate, useRoutes, Routes } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DashboardApp from './pages/dashboard/content/DashboardApp';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
// import User from './pages/User';
// import NotFound from './pages/Page404';


import Dashboard from "./pages/dashboard/Dashboard";
import Public from "./pages/public/Public";
// ----------------------------------------------------------------------

function Router() {

  // const dispatch              = useDispatch();

  const session               = useSelector(state => state.session);
  const auth                  = session.auth;

  // const [loged, setloged]             = useState(false);
  // const [loadingData, setLoadingData] = useState(true);

  // const [loading, setloading] = useState(true);
  // const [loaded, setloaded]   = useState(true);

  let failRequestByToken      = false;

  /*
  const CustomRoute = (Component, access = true, isPrivate = false, ...rest) => { 
    if(!isPrivate){
      if(auth){
        return <Navigate to="/dashboard/" />
      }
      return <Component />
    }

    // Private
    if(!auth){
      return <Navigate to="/" />
    }
    return <Component />
  }
  */

  /*
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { element:        <Navigate to="/dashboard/app" replace /> },
        { path: 'app',    element: <CustomRoute Component={DashboardApp} isPrivate /> },
        
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login',    element: <CustomRoute Component={Login} /> },
        // { path: 'register', element: <Register /> },
        { path: '404',      element: <NotFound /> },
        { path: '/',        element: <Navigate to="/login" /> },
        { path: '*',        element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]); 
  */

  if(auth){
    return <Dashboard />
  }

  return <Public />
}

export default Router


