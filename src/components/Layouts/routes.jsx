import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ErrorPage from './ErrorPage';
import Home from '../Pages/Home/Home';
import Main from './Main/Main';
import DashBoard from '../Pages/Dashboard/DashBoradHome/DashBoard';
import DashBoardLayouts from '../Layouts/DashBoardLayouts/DashBoardLayouts'
import AllPatients from '../Pages/Dashboard/Patients/AllPatients';
import Doctors from '../Pages/Dashboard/Doctors/Doctors';
import PrivateRoute from '../PrivateRoutes/PrivateRoutes';
import AddAPatient from '../Pages/Dashboard/Patients/AddAPatient';
import UserProfile from '../Pages/Dashboard/Users/UserProfie/UserProfile';
import AllUser from '../Pages/Dashboard/Users/AllUser/AllUser';
import Appointment from '../Pages/Dashboard/Appointment/Appointment';

const router = createBrowserRouter([

    {
      path:'/',
      element:<Main></Main>,
      children:[
        
            {
                path:'/',
                element:<PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
                
            },
            // {
            //     path:'/home',
            //     element:,
                
            // },
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
            {
                path:'/appointment',
                element:<Appointment></Appointment>
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
                    path:'/dashboard/Home',
                    element:<DashBoard><Home></Home></DashBoard>
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
                {
                    path:'/dashboard/addapatient',
                    element:<AddAPatient></AddAPatient>
                },
                {
                    path:'/dashboard/userprofile',
                    element:<UserProfile></UserProfile>
                },
                {
                    path:'/dashboard/alluser',
                    element:<AllUser></AllUser>
                },
                // {
                //     path:'/dashboard/appointment',
                //     element:<Appointment></Appointment>
                // },

                
            
            ]
            
        }
    
   

  ]);
  export default router;