import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ErrorPage from './ErrorPage';
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
import PatientProfile from '../Pages/Dashboard/Patients/PatientProfile';

const router = createBrowserRouter([

    {
      path:'/',
      element:<PrivateRoute><DashBoardLayouts></DashBoardLayouts></PrivateRoute>,
      children:[
        
            {
                path:'/',
                element:<DashBoard><DashBoardLayouts></DashBoardLayouts></DashBoard>
            },
            {
                path:'/patients',
                element:<AllPatients></AllPatients>
            },
            {
                path:'/doctors',
                element:<Doctors></Doctors>
            },
            {
                path:'/signup',
                element:<Register></Register>
            },
            {
                path:'/addapatient',
                element:<AddAPatient></AddAPatient>
            },
            {
                path:'/userprofile',
                element:<UserProfile></UserProfile>
            },
            {
                path:'/alluser',
                element:<AllUser></AllUser>
            }, 
            {
                path:'/patientprofile/:id',
                element:<PatientProfile></PatientProfile>
            }, 
            {
                path:'/*',
                element:<ErrorPage></ErrorPage>,
    
            },
         
         
           
        ]},
        {
            path:'/user',
            element:<Main></Main>,
            children :[
              
                {
                    path:'/user/login',
                    element:<Login></Login>,
        
                },
               
                // {
                //     path:'/user/signup',
                //     element:<Register></Register>,
        
                // }, 
                {
                    path:'/user/appointment',
                    element:<Appointment></Appointment>
                },
                {
                    path:'/user/appointment/:id',
                    element:<Appointment></Appointment>
                },
                // {
                //     path:'/*',
                //     element:<ErrorPage></ErrorPage>,
        
                // },
            ]
            
        }
    
   

  ]);
  export default router;