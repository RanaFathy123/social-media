import React, { useState } from "react";
import PieChart from "../../../../components/charts/PieChart";
import BarChart from "../../../../components/charts/BarChart";
import AreaChart from "../../../../components/charts/AreaChart";
import LineChart from "../../../../components/charts/LineChart";
import { FaChartPie } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Analysis = () => {
  const [pieChartState, setPieChartState] = useState({
    series: [65, 34, 12, 56],
  });
  const [showPieChart, setShowPieChart] = useState(false);
  const [showDataPieChart, setShowDataPieChart] = useState(false);
  const [linestate, setLineState] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 65],
      },
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
  const aggregations = [
    "Sum",
    "Average",
    "Median",
    "Mode",
    "Minimum",
    "Maximum",
    "Range",
    "Variance",
    "Standard Deviation",
    "Percentile",
    "Quartiles",
    "Growth Rate",
    "Moving Average",
  ];
  const handleShowPieChart = () => {
    setShowPieChart(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setShowPieChart(false)
    setShowDataPieChart(true)
  };

  return (
    <>
      <button
        onClick={handleShowPieChart}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
      >
        <FaChartPie className="mr-2" />
        Pie Chart
      </button>
      <div className="mt-4 md:mt-6 2xl:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-8">
          {showPieChart && (
            <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-8 transition-transform duration-200 transform hover:scale-105">
              <h1 className="font-bold mb-4 text-center text-lg md:text-xl">
                Choose Data
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-4 p-4 rounded bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex flex-col mb-4 w-full md:w-auto">
                  <label
                    htmlFor="features"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Number of Features
                  </label>
                  <select
                    id="features"
                    className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    {...register("nooffeatures", {
                      required: "Please choose the number of features",
                    })}
                  >
                    <option value="">Select number of features</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                    <option value="three">Three</option>
                  </select>
                  {errors.nooffeatures && (
                    <p className="text-red-600 mt-1 text-xs font-bold">
                      {errors.nooffeatures.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mb-4 w-full md:w-auto">
                  <label
                    htmlFor="aggregation"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type of Aggregate
                  </label>
                  <select
                    id="aggregation"
                    className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    {...register("TypeofAggregate", {
                      required: "Please choose the type of aggregate",
                    })}
                  >
                    <option value="">Select type of aggregate</option>
                    {aggregations.map((aggregate, index) => (
                      <option key={index} value={aggregate}>
                        {aggregate}
                      </option>
                    ))}
                  </select>
                  {errors.TypeofAggregate && (
                    <p className="text-red-600 mt-1 text-xs font-bold">
                      {errors.TypeofAggregate.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mb-4 w-full md:w-auto">
                  <label
                    htmlFor="source"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Table Source
                  </label>
                  <select
                    id="source"
                    className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    {...register("SrcData", {
                      required: "Please choose the table source",
                    })}
                  >
                    <option value="">Select table source</option>
                    <option value="SrcData">Src Data</option>
                  </select>
                  {errors.SrcData && (
                    <p className="text-red-600 mt-1 text-xs font-bold">
                      {errors.SrcData.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col mb-4 w-full md:w-auto">
                  <label
                    htmlFor="column"
                    className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Column Source
                  </label>
                  <select
                    id="column"
                    className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    {...register("ColumnSource", {
                      required: "Please choose the column source",
                    })}
                  >
                    <option value="">Select column source</option>
                    <option value="columnSource">Column Source</option>
                  </select>
                  {errors.ColumnSource && (
                    <p className="text-red-600 mt-1 text-xs font-bold">
                      {errors.ColumnSource.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex justify-center py-2">
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
                    Export Chart
                  </button>
                </div>
              </form>
              <img
                src="https://diagrammm.com/img/diagrams/pie-chart-sectors.svg"
                alt="Pie Chart"
                className="mt-4"
              />
            </div>
          )}
          {showDataPieChart && (
            <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-8 transition-transform duration-200 transform hover:scale-105">
              <PieChart
                data={pieChartState.series}
                setPieChartState={setPieChartState}
              />
            </div>
          )}
          <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-8 transition-transform duration-200 transform hover:scale-105">
            <BarChart
              data={barChartState.series}
              setBarChartState={setBarChartState}
            />
          </div>
          <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-8 transition-transform duration-200 transform hover:scale-105">
            <AreaChart
              data={areaChartState.series}
              setAreaChartState={setAreaChartState}
              categories={areaChartState.categories}
            />
          </div>
          <div className="bg-white rounded-lg shadow-md dark:bg-boxdark dark:border-strokedark p-4 md:p-6 2xl:p-8 transition-transform duration-200 transform hover:scale-105">
            <LineChart data={linestate.series} setLineState={setLineState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
