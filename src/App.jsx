import {RouterProvider } from 'react-router-dom';
import useUserData from './components/Hooks/useUserData';
import router from './components/Layouts/routes';

function App() {

  return (
    <div >
      <RouterProvider  router={router}></RouterProvider>
    </div>
  );
}

export default App;

