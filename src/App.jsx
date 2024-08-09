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

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <SignIn /> },
        { path: "login", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        { path: "overview", element: <GeneralOverView /> },
        { path: "profile", element: <Profile /> },
        { path: "tables/:tableName", element: <Tables /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "analysis", element: <Analysis /> },
        { path: "map", element: <MapAnalysis /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
