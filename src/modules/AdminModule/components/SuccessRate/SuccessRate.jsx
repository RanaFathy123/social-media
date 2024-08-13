import React, { useState } from "react";
import BarChartHorizontal from "../../../../components/charts/BarChartHorizontal";
import BarWithLineChart from "../../../../components/charts/BarWithLineChart";
import PieChart from "../../../../components/charts/PieChart";

const SuccessRate = () => {
  const BarWithLoneOneDate = [
    {
      name: "Website Blog",
      type: "column",
      data: [440, 505, 414],
    },
    {
      name: "Social Media",
      type: "line",
      data: [23, 42, 35],
    },
  ];
  const BarWithLoneTwoDate = [
    {
      name: "Website Blog",
      type: "column",
      data: [440, 505, 414,350,250],
    },
    {
      name: "Social Media",
      type: "line",
      data: [23, 42, 35,20,40],
    },
  ];
  const [pieChartState, setPieChartState] = useState({
    series: [65, 34, 12, 56],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-8">
      <div>
        <BarWithLineChart data={BarWithLoneOneDate} />
      </div>
      <div>
        <PieChart
          data={pieChartState.series}
          setPieChartState={setPieChartState}
        />
      </div>
      <div>
        <BarWithLineChart data={BarWithLoneTwoDate} />
      </div>
    </div>
  );
};

export default SuccessRate;
