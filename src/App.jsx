import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import GeneralOverView from "./modules/AdminModule/components/Dashboard/GeneralOverView";
import Profile from "./modules/AdminModule/components/Profile/Profile";
import Tables from "./modules/AdminModule/components/Tables/Tables";
import Settings from "./modules/AdminModule/components/Settings/Settings";
import SignIn from "./modules/AuthModule/components/SignIn/SignIn";
import AuthLayout from "./Layout/AuthLayout";
import SignUp from "./modules/AuthModule/components/SignUp/SignUp";
import Analysis from "./modules/AdminModule/components/Analysis/Analysis";
import MapAnalysis from "./modules/AdminModule/components/MapAnalysis/MapAnalysis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessRate from "./modules/AdminModule/components/SuccessRate/SuccessRate";
import CouriersAnalysis from "./modules/AdminModule/components/CouriersAnalysis/CouriersAnalysis";
import MapPage from "./modules/AdminModule/components/Dashboard/MapPage";
import ProtectedRoute from "./modules/sharedModule/ProtectedRoute/ProtectedRoute";
import "./App.css";
import PrivateRoute from "./modules/sharedModule/PrivateRoute/PrivateRoute";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><AuthLayout /></PrivateRoute>,
      children: [
        { index: true, element: <SignIn /> },
        { path: "login", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "overview", element: <GeneralOverView /> },
        { path: "profile", element: <Profile /> },
        { path: "tables/:tableName", element: <Tables /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "analysis", element: <Analysis /> },
        { path: "map", element: <MapAnalysis /> },
        { path: "map-page", element: <MapPage /> },
        { path: "success-rate", element: <SuccessRate /> },
        { path: "couriers", element: <CouriersAnalysis /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};

export default App;
