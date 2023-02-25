import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ErrorPage from './ErrorPage';
import Home from '../Pages/Home/Home';
import Main from './Main/Main';
import Dashboard from '../Pages/Dashboard/DashBoard.jsx';

const router = createBrowserRouter([

    {
      path:'/',
      element:<Main></Main>,
      children:[
        
            {
                path:'/',
                element:<Home></Home>,
                
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
                path:'/register',
                element:<Register></Register>,
    
            },
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>,
    
            },
           
        ]
    }
   

  ]);
  export default router;