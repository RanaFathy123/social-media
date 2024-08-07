import React, { useState } from "react";
import PieChart from "../../../../components/charts/PieChart";
import BarChart from "../../../../components/charts/BarChart";
import AreaChart from "../../../../components/charts/AreaChart";
import LineChart from "../../../../components/charts/LineChart";

const Analysis = () => {
  const [pieChartState, setPieChartState] = useState({
    series: [65, 34, 12, 56],
  });
  const [linestate, setLineState] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 65],
      }
    ],
  });
  const [barChartState, setBarChartState] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 65],
      },
      {
        name: "Revenue",
        data: [13, 23, 20, 8, 13, 27, 15],
      },
    ],
  });
  const [areaChartState, setAreaChartState] = useState({
    series: [
      {
        name: "Product One",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },
      {
        name: "Product Two",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
  });  
  return (
    <div className="mt-4 md:mt-6 2xl:mt-7.5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Card Container for each PieChart */}
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <PieChart data={pieChartState.series} setPieChartState={setPieChartState} />
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <BarChart data={barChartState.series} setBarChartState={setBarChartState} />
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <AreaChart  data={areaChartState.series} setAreaChartState={setAreaChartState} categories={areaChartState.categories}/>
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-7.5 transition-transform duration-200 transform hover:scale-105">
          <LineChart data={linestate.series} setLineState={setLineState}  />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
