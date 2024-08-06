import React from "react";
import PieChart from "../../../../components/charts/PieChart";
import BarChart from "../../../../components/charts/BarChart";
import AreaChart from "../../../../components/charts/AreaChart";
import LineChart from "../../../../components/charts/LineChart";


const Analysis = () => {
  return (
    <div className="mt-4 md:mt-6 2xl:mt-7.5">
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Card Container for each PieChart */}
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <PieChart />
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <BarChart />
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <AreaChart />
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
