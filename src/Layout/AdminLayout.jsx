import React, { useState, ReactNode } from "react";

import Sidebar, {
  SidebarItem,
  SidebarSubItem,
} from "../components/Sidebar/index";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Home, User, Settings } from "lucide-react";
import { FaChartPie } from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <SidebarItem icon={<Home size={20} />}  text="Dashboard" active={true} to="/dashboard/overview" >
            <SidebarSubItem text="Overview" to="/dashboard/overview" />
            <SidebarSubItem text="Map Page" to="/dashboard/map-page" />
          </SidebarItem>
          <SidebarItem icon={<FaChartPie  size={20} />}  text="Analysis" to="/dashboard/analysis" />
          <SidebarItem icon={<FaChartPie  size={20} />}  text="Map Analysis" to="/dashboard/map" />
          <SidebarItem icon={<FaChartPie  size={20} />}  text="Success Rate" to="/dashboard/success-rate" />
          <SidebarItem icon={<FaChartPie  size={20} />}  text="Couriers Analysis" to="/dashboard/couriers" />
          {/* Other SidebarItems */}
        </Sidebar>
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AdminLayout;
