import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};


const AreaChart = ({data,setAreaChartState,categories}) => {
  const [filter, setFilter] = useState("Month");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    const data = {
      Day: {
        series: [
          {
            name: "Product One",
            data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          },
          {
            name: "Product Two",
            data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
          },
        ],
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
      },
      Week: {
        series: [
          {
            name: "Product One",
            data: [25, 30, 35, 40, 45, 50, 55],
          },
          {
            name: "Product Two",
            data: [20, 25, 30, 35, 40, 45, 50],
          },
        ],
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      Month: {
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
      },
    };

    setAreaChartState(data[newFilter]);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => handleFilterChange("Day")}
              className={`rounded py-1 px-3 text-xs font-medium ${filter === "Day" ? "bg-primary text-white" : "text-black hover:bg-white dark:text-white dark:hover:bg-boxdark"}`}
            >
              Day
            </button>
            <button
              onClick={() => handleFilterChange("Week")}
              className={`rounded py-1 px-3 text-xs font-medium ${filter === "Week" ? "bg-primary text-white" : "text-black hover:bg-white dark:text-white dark:hover:bg-boxdark"}`}
            >
              Week
            </button>
            <button
              onClick={() => handleFilterChange("Month")}
              className={`rounded py-1 px-3 text-xs font-medium ${filter === "Month" ? "bg-primary text-white" : "text-black hover:bg-white dark:text-white dark:hover:bg-boxdark"}`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { categories: categories } }}
            series={data}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
