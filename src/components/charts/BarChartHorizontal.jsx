import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const BarChartHorizontal = ({ data, setBarChartState }) => {
  const [filter, setFilter] = useState("This Week");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    // Example data for different filters
    const data = {
      "This Week": [
        {
          name: "Sales",
          data: [44, 55, 41, 67, 22, 43, 65],
        },
        {
          name: "Revenue",
          data: [13, 23, 20, 8, 13, 27, 15],
        },
      ],
      "Last Week": [
        {
          name: "Sales",
          data: [34, 45, 31, 60, 20, 50, 70],
        },
        {
          name: "Revenue",
          data: [15, 25, 18, 10, 12, 30, 20],
        },
      ],
    };

    setBarChartState({ series: data[newFilter] });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Profit this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <button
              onClick={() => handleFilterChange("This Week")}
              className={`py-1 px-3 text-sm font-medium rounded ${filter === "This Week" ? "bg-primary text-white" : "bg-transparent text-black"}`}
            >
              This Week
            </button>
            <button
              onClick={() => handleFilterChange("Last Week")}
              className={`py-1 px-3 text-sm font-medium rounded ${filter === "Last Week" ? "bg-primary text-white" : "bg-transparent text-black"}`}
            >
              Last Week
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={data}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChartHorizontal;
