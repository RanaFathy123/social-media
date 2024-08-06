import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'line',
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 5,
      color: '#000',
      opacity: 0.15,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
  stroke: {
    curve: 'smooth',
    width: [2],
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
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
        fontSize: '0px',
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      radius: 12,
    },
  },
  fill: {
    opacity: 1,
  },
};

const LineChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 65],
      }
    ],
  });

  const [filter, setFilter] = useState("This Week");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    // Example data for different filters
    const data = {
      "This Week": [
        {
          name: "Sales",
          data: [44, 55, 41, 67, 22, 43, 65],
        }
      ],
      "Last Week": [
        {
          name: "Sales",
          data: [34, 45, 31, 60, 20, 50, 70],
        }
      ],
    };

    setState({ series: data[newFilter] });
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Sales this week
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
            series={state.series}
            type="line"
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
