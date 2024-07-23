import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import GeneralOverView from "./modules/AdminModule/components/Dashboard/GeneralOverView";
import Profile from "./modules/AdminModule/components/Profile/Profile";
import Tables from "./modules/AdminModule/components/Tables/Tables";
import Settings from "./modules/AdminModule/components/Settings/Settings";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        { index: true, element: <GeneralOverView /> },
        { path: "profile", element: <Profile /> },
        { path: "tables", element: <Tables /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
