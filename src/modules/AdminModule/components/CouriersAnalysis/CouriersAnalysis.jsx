import React, { useState } from "react";
import BarChartVertical from "../../../../components/charts/BarChartVertical";
import PieChart from "../../../../components/charts/PieChart";
import BarChartHorizontal from "../../../../components/charts/BarChartHorizontal";

const CouriersAnalysis = () => {
  const [barChartState, setBarChartState] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 65],
      },
    ],
  });
  const [pieChartState, setPieChartState] = useState({
    series: [65, 34, 12, 56],
  });
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2  gap-4 md:gap-6 2xl:gap-8">
      <div>
        <BarChartVertical data={barChartState.series} />
      </div>
      <div>
        <PieChart data={pieChartState.series} />
      </div>
      <div>
        <BarChartVertical data={barChartState.series} />
      </div>
      <div>
        <BarChartHorizontal data={barChartState.series} />
      </div>
      <div>
        <BarChartVertical data={barChartState.series} />
      </div>
      <div>
        <PieChart data={pieChartState.series} />
      </div>
      <div>
        <BarChartVertical data={barChartState.series} />
      </div>
      <div>
        <BarChartHorizontal data={barChartState.series} />
      </div>
    </div>
  );
};

export default CouriersAnalysis;
