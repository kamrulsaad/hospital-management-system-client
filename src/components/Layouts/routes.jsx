import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "./ErrorPage";
import Main from "./DashBoardLayouts/Main";
import DashBoard from "../Pages/Dashboard/DashBoradHome/DashBoard";
import DashBoardLayouts from "../Layouts/DashBoardLayouts/DashBoardLayouts";
import AllPatients from "../Pages/Dashboard/Patients/AllPatients";
import Doctors from "../Pages/Dashboard/Doctors/Doctors";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import AddAPatient from "../Pages/Dashboard/Patients/AddAPatient";
import UserProfile from "../Pages/Dashboard/Users/UserProfie/UserProfile";
import AllUser from "../Pages/Dashboard/Users/AllUser/AllUser";
import Appointment from "../Pages/Dashboard/Appointment/Appointment";
import MyAppointments from "../Pages/Dashboard/Doctors/MyAppointments";
import UpdatePassword from "../Pages/Dashboard/Users/UserProfie/UpdatePassword";
import UpdatePresciption from "../Pages/Dashboard/Presciption/UpdatePresciption";
import AllApointments from "../Pages/Dashboard/Appointment/AllApointments";
import CreateInvoice from "../Pages/Dashboard/Invoice/CreateInvoice";
import AllInvoice from "../Pages/Dashboard/Invoice/AllInvoice";
import NewPatientProfile from "../Pages/Dashboard/PatientProfile/NewPatientProfile";
import AllCategories from "../Pages/Dashboard/Categories/AllCategories";
import InvoicePage from "../Pages/Dashboard/Invoice/InvoicePage";
import CreateInvoiceCategory from "../Pages/Dashboard/Categories/CreateInvoiceCatagory";
import AllTest from "../Pages/Dashboard/Test/AllTest";
import UpdateTest from "../Pages/Dashboard/Test/UpdateTest";
import TestDetails from "../Pages/Dashboard/Test/TestDetails";
import AllExpense from "../Pages/Dashboard/Expense/AllExpense";
import CreateExpense from "../Pages/Dashboard/Expense/CreateExpense";
import ExpenseDetails from "../Pages/Dashboard/Expense/ExpenseDetails";
import UpdateExpense from "../Pages/Dashboard/Expense/UpdateExpense";
import AllExpenseCategories from "../Pages/Dashboard/Expense/Categories/AllExpenseCategories";
import CreateExpCat from "../Pages/Dashboard/Expense/Categories/CreateExpCat";
import ExpCatDetails from "../Pages/Dashboard/Expense/Categories/ExpCatDetails";
import UpdateExpCat from "../Pages/Dashboard/Expense/Categories/UpdateExpCat";
import AllBed from "../Pages/Dashboard/Bed/AllBed";
import CreateBed from "../Pages/Dashboard/Bed/CreateBed";
import AdmitPatient from "../Pages/Dashboard/Bed/AdmitPatient";
import AllBedCategories from "../Pages/Dashboard/Bed/Category/AllBedCategories";
import CreateBedCategory from "../Pages/Dashboard/Bed/Category/CreateBedCategory";
import UpdateBedCategory from "../Pages/Dashboard/Bed/Category/UpdateBedCategory";
import BedDetails from "../Pages/Dashboard/Bed/BedDetails";
import UpdateBed from "../Pages/Dashboard/Bed/UpdateBed";
import CategoryDetails from "../Pages/Dashboard/Categories/CategoryDetails";
import UpdateCategory from "../Pages/Dashboard/Categories/UpdateCategory";
import CreateSubCategory from "../Pages/Dashboard/Categories/Subcategories/CreateSubCategory";
import SubCatDetails from "../Pages/Dashboard/Categories/Subcategories/SubCatDetails";
import CreateTestName from "../Pages/Dashboard/Categories/Subcategories/TestName/CreateTestName";
import UpdateSubCat from "../Pages/Dashboard/Categories/Subcategories/UpdateSubCat";
import UpdateTestName from "../Pages/Dashboard/Categories/Subcategories/TestName/UpdateTestName";
import AllPc from "../Pages/Dashboard/PC/AllPc";
import PcDetails from "../Pages/Dashboard/PC/PcDetails";
import RegisterPc from "../Pages/Dashboard/PC/RegisterPc";
import UpdatePc from "../Pages/Dashboard/PC/UpdatePc";
import PCInvoice from "../Pages/Dashboard/PC/PCInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashBoardLayouts></DashBoardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <DashBoard>
            <DashBoardLayouts></DashBoardLayouts>
          </DashBoard>
        ),
      },

      {
        path: "/patients",
        element: <AllPatients></AllPatients>,
      },
      {
        path: "/doctors",
        element: <Doctors></Doctors>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/addapatient",
        element: <AddAPatient></AddAPatient>,
      },
      {
        path: "/user/profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/alluser",
        element: <AllUser></AllUser>,
      },

      {
        path: "/appointment",
        element: <AllApointments></AllApointments>,
      },
      {
        path: "/appointment/:id",
        element: <Appointment></Appointment>,
      },
      {
        path: "/myappointment",
        element: <MyAppointments></MyAppointments>,
      },
      {
        path: "/updatepresciption/:id",
        element: <UpdatePresciption></UpdatePresciption>,
      },
      {
        path: "/createinvoice/:patientId",
        element: <CreateInvoice></CreateInvoice>,
      },

      {
        path: "/allinvoice",
        element: <AllInvoice></AllInvoice>,
      },
      {
        path: "/categories",
        element: <AllCategories></AllCategories>,
      },
      {
        path: "/category/:categoryId",
        element: <CategoryDetails></CategoryDetails>,
      },
      {
        path: "/category/update/:categoryId",
        element: <UpdateCategory></UpdateCategory>,
      },
      {
        path: "/subCategory/new/:categoryId",
        element: <CreateSubCategory></CreateSubCategory>,
      },
      {
        path: "/subCategory/:categoryId",
        element: <SubCatDetails></SubCatDetails>,
      },
      {
        path: "/subCategory/update/:categoryId",
        element: <UpdateSubCat></UpdateSubCat>,
      },

      {
        path: "/testName/new/:categoryId",
        element: <CreateTestName></CreateTestName>,
      },
      {
        path: "/testName/update/:categoryId",
        element: <UpdateTestName></UpdateTestName>,
      },
      {
        path: "/tests",
        element: <AllTest></AllTest>,
      },
      {
        path: "/test/:testId",
        element: <UpdateTest></UpdateTest>,
      },
      {
        path: "/testDetails/:testId",
        element: <TestDetails></TestDetails>,
      },

      {
        path: "/category/new",
        element: <CreateInvoiceCategory></CreateInvoiceCategory>,
      },

      {
        path: "/expense/all",
        element: <AllExpense></AllExpense>,
      },

      {
        path: "/expense/new",
        element: <CreateExpense></CreateExpense>,
      },

      {
        path: "/expense/:expenseId",
        element: <ExpenseDetails></ExpenseDetails>,
      },

      {
        path: "/expense/update/:expenseId",
        element: <UpdateExpense></UpdateExpense>,
      },

      {
        path: "/expense/category/all",
        element: <AllExpenseCategories></AllExpenseCategories>,
      },

      {
        path: "/expense/category/new",
        element: <CreateExpCat></CreateExpCat>,
      },

      {
        path: "/expense/category/:categoryId",
        element: <ExpCatDetails></ExpCatDetails>,
      },

      {
        path: "/expense/category/update/:categoryId",
        element: <UpdateExpCat></UpdateExpCat>,
      },
      {
        path: "/bed/new",
        element: <CreateBed></CreateBed>,
      },
      {
        path: `/admit/:patientId`,
        element: <AdmitPatient></AdmitPatient>,
      },
      {
        path: "/beds",
        element: <AllBed></AllBed>,
      },

      {
        path: "/beds/category",
        element: <AllBedCategories></AllBedCategories>,
      },

      {
        path: "/payment/invoice/:invoiceId",
        element: <InvoicePage></InvoicePage>,
      },
      {
        path: "/payment/invoice/createinvoice",
        element: <CreateInvoice></CreateInvoice>,
      },
      {
        path: "/user/updatepassword",
        element: <UpdatePassword></UpdatePassword>,
      },
      {
        path: "/bed/createbedcategory",
        element: <CreateBedCategory></CreateBedCategory>,
      },
      {
        path: "/bed/updatecategory/:id",
        element: <UpdateBedCategory></UpdateBedCategory>,
      },
      {
        path: "/bed/details/:id",
        element: <BedDetails></BedDetails>,
      },
      {
        path: "/bed/update/:id",
        element: <UpdateBed></UpdateBed>,
      },

      {
        path: "pc/invoice/:invoiceId",
        element: <PCInvoice></PCInvoice>,
      },

      // pc related api's
      {
        path: "/pc",
        element: <AllPc></AllPc>,
      },
      {
        path: "/pc/new",
        element: <RegisterPc></RegisterPc>,
      },
      {
        path: "/pc/update/:id",
        element: <UpdatePc></UpdatePc>,
      },
      {
        path: "/pc/details/:id",
        element: <PcDetails></PcDetails>,
      },
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
  {
    path: "/user",
    element: <Main></Main>,
    children: [
      {
        path: "/user/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/patient",
    element: <Main></Main>,
    children: [
      {
        path: "/patient/newpatientprofile/:id",
        element: <NewPatientProfile></NewPatientProfile>,
      },
    ],
  },
  {
    path: "/qr",
    element: <Main></Main>,
    children: [
      {
        path: "/qr/newpatientprofile/:id",
        element: <NewPatientProfile qr></NewPatientProfile>,
      },
      {
        path: "/qr/payment/invoice/:invoiceId",
        element: <InvoicePage qr></InvoicePage>,
      },
    ],
  },
]);
export default router;
