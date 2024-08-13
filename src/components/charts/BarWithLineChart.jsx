import React from "react";
import Chart from "react-apexcharts";

const BarWithLineChart = ({ data }) => {
  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Traffic Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "Central Province",
      "Southern Province",
      "Western Province",
      "Eastern Province",
      "Northen Province",
    ],
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart options={options} series={data} type="line" height={500} />
    </div>
  );
};

export default BarWithLineChart;
