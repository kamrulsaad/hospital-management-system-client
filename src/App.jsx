import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import router from "./components/Layouts/routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
       transition={Slide}
       />
    </div>
  );
}

export default App;
