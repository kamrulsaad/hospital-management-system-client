import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ErrorPage from './ErrorPage';
import Home from '../Pages/Home/Home';
import Main from './Main/Main';
import DashBoard from '../Pages/Dashboard/DashBoard.jsx';
import DashBoardLayouts from '../Layouts/DashBoardLayouts/DashBoardLayouts'
import AllPatients from '../Pages/Dashboard/Patients/AllPatients';
import Doctors from '../Pages/Dashboard/Doctors/Doctors';
import PrivateRoute from '../PrivateRoutes/PrivateRoutes';

const router = createBrowserRouter([

    {
      path:'/',
      element:<Main></Main>,
      children:[
        
            {
                path:'/',
                element:<Login></Login>,
                
            },
            {
                path:'/home',
                element:<PrivateRoute><Home></Home></PrivateRoute>,
                
            },
            {
                path:'/*',
                element:<ErrorPage></ErrorPage>,
    
            },
            {
                path:'/login',
                element:<Login></Login>,
    
            },
           
            {
                path:'/signup',
                element:<Register></Register>,
    
            },
         
           
        ]},
        {
            path:'/dashboard',
            element:<PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
            children :[
                {
                    path:'/dashboard',
                    element:<DashBoard></DashBoard>
                },
                {
                    path:'/dashboard/patients',
                    element:<AllPatients></AllPatients>
                },
                {
                    path:'/dashboard/doctors',
                    element:<Doctors></Doctors>
                },
                {
                    path:'/dashboard/signup',
                    element:<Register></Register>
                },
            
            ]
            
        }
    
   

  ]);
  export default router;