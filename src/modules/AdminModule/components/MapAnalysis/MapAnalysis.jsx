
///////////////////////////////////////////////////Version @2////////////////////////////////

import React, { useEffect, useState } from "react";
import CardDataStats from "../../../../components/CardDataStats";
import BarChartHorizontal from "../../../../components/charts/BarChartHorizontal";
import PieChart from "../../../../components/charts/PieChart";
import { fetchDataFromAPI } from "../../../../utility_backend/API_Call";

const MapAnalysis = () => {
  const [barChartState, setBarChartState] = useState({
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [xAxisName, setXAxisName] = useState("Order Status"); // X-axis name
  const [yAxisName, setYAxisName] = useState("Count"); // Y-axis name

  
  const [pieChartState, setPieChartState] = useState({
    series: [],
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track selected filters
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [shipping_company_branch, setSelectedShippingCompanies] = useState([]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleShippingCompanyChange = (company) => {
    setSelectedShippingCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const createBarChartQuery = (paymentMethods, shippingCompanies) => {
    const matchStage = {};

    if (paymentMethods.length > 0) {
      matchStage.payment_method = { $in: paymentMethods };
    }

    if (shippingCompanies.length > 0) {
      matchStage.shipping_company_branch = { $in: shippingCompanies };
    }

    return {
      collectionName: "Zapier_data",
      pipeline: [
        { $match: matchStage }, // Apply filters
        {
          $group: {
            _id: "$order_status",
            order_status: { $sum: 1 },
          },
        },
      ],
    };
  };

  const createPieChartQuery = (paymentMethods, shippingCompanies) => {
    const matchStage = {};

    if (paymentMethods.length > 0) {
      matchStage.payment_method = { $in: paymentMethods };
    }

    if (shippingCompanies.length > 0) {
      matchStage.shipping_company_branch = { $in: shippingCompanies };
    }

    return {
      collectionName: "Zapier_data",
      pipeline: [
        { $match: matchStage }, // Apply filters
        {
          $group: {
            _id: "$payment_method", // Group by payment method
            total_value_sum: { $sum: "$order_total" }, // Calculate the sum of total_value
          },
        },
      ],
    };
  };

  // UseEffect for Bar Chart Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const barChartQuery = createBarChartQuery(
          selectedPaymentMethods,
          shipping_company_branch
        );
        const response = await fetchDataFromAPI({
          endpoint: "/api/Query_DB",
          method: "POST",
          body: barChartQuery,
        });

        // Map the response data
        const orderStatuses = response.data.map((item) => ({
          order_status: item._id,
          count: item.order_status,
        }));

        // Extract data and categories
        const barChartData = orderStatuses.map((item) => item.count);
        const barChartCategories = orderStatuses.map(
          (item) => item.order_status
        );

        // Update the chart state with the fetched data
        setBarChartState({
          series: [
            {
              name: "Orders",
              data: barChartData,
            },
          ],
        });
        setCategories(barChartCategories); // Update categories state

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPaymentMethods, shipping_company_branch]);

  // UseEffect for Pie Chart Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pieChartQuery = createPieChartQuery(
          selectedPaymentMethods,
          shipping_company_branch
        );
        const response = await fetchDataFromAPI({
          endpoint: "/api/Query_DB",
          method: "POST",
          body: pieChartQuery,
        });

        // Map the response data
        const pieChartData = response.data.map((item) => ({
          Payment_Type: item._id,
          Total_number: item.total_value_sum,
        }));

        // Extract data and categories
        const pieChartValues = pieChartData.map((item) => item.Total_number);
        const pieChartCategories = pieChartData.map((item) => item.Payment_Type);

        // Optionally, update the pie chart state with actual data if needed
        setPieChartState({
          series: pieChartValues, // Use pie chart data
          categories: pieChartCategories, // Use categories as labels for the pie chart
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPaymentMethods, shipping_company_branch]);

  return (
    <>
      <div className="flex justify-between mb-5 flex-col lg:flex-row">
        <div className="relative z-20 inline-block mb-3">
          <h1 className="mb-3">Payment Method</h1>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              selectedPaymentMethods.includes("مدى")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handlePaymentMethodChange("مدى")}
          >
            مدى
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              selectedPaymentMethods.includes("تابي")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handlePaymentMethodChange("تابي")}
          >
            تابي
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              selectedPaymentMethods.includes("البطاقة الإئتمانية")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handlePaymentMethodChange("البطاقة الإئتمانية")}
          >
            البطاقة الإئتمانية
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              selectedPaymentMethods.includes("دفع عند التسليم")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handlePaymentMethodChange("دفع عند التسليم")}
          >
            دفع عند التسليم
          </button>
        </div>

        {/* Filter Company Shipping */}
        <div className="relative z-20 inline-block mb-3">
          <h1 className="mb-3">Shipping Company</h1>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              shipping_company_branch.includes("شركة الشحن")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handleShippingCompanyChange("شركة الشحن")}
          >
            شركة الشحن
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              shipping_company_branch.includes("البسامي'")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handleShippingCompanyChange("البسامي'")}
          >
            البسامي
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              shipping_company_branch.includes("سحاب للخدمات اللوجستية'")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handleShippingCompanyChange("سحاب للخدمات اللوجستية'")}
          >
            سحاب للخدمات اللوجستية
          </button>
          <button
            className={`py-1 px-3 text-sm font-medium rounded ${
              shipping_company_branch.includes("Last Week")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => handleShippingCompanyChange("Last Week")}
          >
            Last Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-8">
        <div>
          <div>
            <BarChartHorizontal
              data={barChartState.series}
              categories={categories} // Pass categories
              xAxisName={xAxisName} // Pass X-axis name
              yAxisName={yAxisName} // Pass Y-axis name
              isHorizontal={true} // Set true if horizontal bar chart is needed
            />
          </div>
          <div className="mt-5">
            <BarChartHorizontal
              data={barChartState.series}
              categories={categories} // Pass categories
              xAxisName={xAxisName} // Pass X-axis name
              yAxisName={yAxisName} // Pass Y-axis name
              isHorizontal={false} // Set false if vertical bar chart is needed
            />
            <div className="mt-5">
              <PieChart
                data={pieChartState.series}
                categories={pieChartState.categories}
                title="Payment Methods Distribution"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <CardDataStats
              title="Total views"
              total="$3.456K"
              rate="0.43%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
          </div>
          <div className="mt-5">
            <CardDataStats
              title="Total views"
              total="$3.456K"
              rate="0.43%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapAnalysis;

/////////////////////////////////////////////////////Cashing Option //////////////////////////////

// import React, { useState } from "react";
// import CardDataStats from "../../../../components/CardDataStats";
// import BarChartHorizontal from "../../../../components/charts/BarChartHorizontal";
// import PieChart from "../../../../components/charts/PieChart";
// import { useQuery } from "@tanstack/react-query";
// import { fetchDataFromAPI } from "../../../../utility_backend/API_Call";

// const MapAnalysis = () => {
//   const [categories, setCategories] = useState([]); // State for categories
//   const [xAxisName, setXAxisName] = useState("Order Status"); // X-axis name
//   const [yAxisName, setYAxisName] = useState("Count"); // Y-axis name

//   const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
//   const [shipping_company_branch, setSelectedShippingCompanies] = useState([]);

//   const handlePaymentMethodChange = (method) => {
//     setSelectedPaymentMethods((prev) =>
//       prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
//     );
//   };

//   const handleShippingCompanyChange = (company) => {
//     setSelectedShippingCompanies((prev) =>
//       prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
//     );
//   };

//   const createBarChartQuery = (paymentMethods, shippingCompanies) => {
//     const matchStage = {};

//     if (paymentMethods.length > 0) {
//       matchStage.payment_method = { $in: paymentMethods };
//     }

//     if (shippingCompanies.length > 0) {
//       matchStage.shipping_company_branch = { $in: shippingCompanies };
//     }

//     return {
//       collectionName: "Zapier_data",
//       pipeline: [
//         { $match: matchStage }, // Apply filters
//         {
//           $group: {
//             _id: "$order_status",
//             order_status: { $sum: 1 },
//           },
//         },
//       ],
//     };
//   };

//   const createPieChartQuery = (paymentMethods, shippingCompanies) => {
//     const matchStage = {};

//     if (paymentMethods.length > 0) {
//       matchStage.payment_method = { $in: paymentMethods };
//     }

//     if (shippingCompanies.length > 0) {
//       matchStage.shipping_company_branch = { $in: shippingCompanies };
//     }

//     return {
//       collectionName: "Zapier_data",
//       pipeline: [
//         { $match: matchStage }, // Apply filters
//         {
//           $group: {
//             _id: "$payment_method", // Group by payment method
//             total_value_sum: { $sum: "$order_total" }, // Calculate the sum of total_value
//           },
//         },
//       ],
//     };
//   };

//   // Fetch bar chart data using React Query
//   const { data: barChartData, isLoading: isLoadingBarChart, error: barChartError } = useQuery({
//     queryKey: ["fetchBarChartData", selectedPaymentMethods, shipping_company_branch],
//     queryFn: () =>
//       fetchDataFromAPI({
//         endpoint: "/api/Query_DB",
//         method: "POST",
//         body: createBarChartQuery(selectedPaymentMethods, shipping_company_branch),
//       }),
//     staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
//     refetchOnWindowFocus: false, // Do not refetch on window focus
//   });

//   // Fetch pie chart data using React Query
//   const { data: pieChartData, isLoading: isLoadingPieChart, error: pieChartError } = useQuery({
//     queryKey: ["fetchPieChartData", selectedPaymentMethods, shipping_company_branch],
//     queryFn: () =>
//       fetchDataFromAPI({
//         endpoint: "/api/Query_DB",
//         method: "POST",
//         body: createPieChartQuery(selectedPaymentMethods, shipping_company_branch),
//       }),
//     staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
//     refetchOnWindowFocus: false, // Do not refetch on window focus
//   });

//   // Handle loading and error states
//   if (isLoadingBarChart || isLoadingPieChart) return <div>Loading...</div>;
//   if (barChartError || pieChartError)
//     return <div>Error: {barChartError?.message || pieChartError?.message}</div>;

//   // Process bar chart data
//   const orderStatuses = barChartData.data.map((item) => ({
//     order_status: item._id,
//     count: item.order_status,
//   }));

//   const barChartSeries = orderStatuses.map((item) => item.count);
//   const barChartCategories = orderStatuses.map((item) => item.order_status);

//   console.log(barChartSeries,barChartCategories)
//   // Process pie chart data
//   const pieChartSeries = pieChartData.data.map((item) => item.total_value_sum);
//   const pieChartCategories = pieChartData.data.map((item) => item._id);

//   return (
//     <>
//       <div className="flex justify-between mb-5 flex-col lg:flex-row">
//         <div className="relative z-20 inline-block mb-3">
//           <h1 className="mb-3">Payment Method</h1>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               selectedPaymentMethods.includes("مدى")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handlePaymentMethodChange("مدى")}
//           >
//             مدى
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               selectedPaymentMethods.includes("تابي")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handlePaymentMethodChange("تابي")}
//           >
//             تابي
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               selectedPaymentMethods.includes("البطاقة الإئتمانية")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handlePaymentMethodChange("البطاقة الإئتمانية")}
//           >
//             البطاقة الإئتمانية
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               selectedPaymentMethods.includes("دفع عند التسليم")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handlePaymentMethodChange("دفع عند التسليم")}
//           >
//             دفع عند التسليم
//           </button>
//         </div>

//         {/* Filter Company Shipping */}
//         <div className="relative z-20 inline-block mb-3">
//           <h1 className="mb-3">Shipping Company</h1>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               shipping_company_branch.includes("شركة الشحن")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handleShippingCompanyChange("شركة الشحن")}
//           >
//             شركة الشحن
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               shipping_company_branch.includes("البسامي")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handleShippingCompanyChange("البسامي")}
//           >
//             البسامي
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               shipping_company_branch.includes("سحاب للخدمات اللوجستية")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handleShippingCompanyChange("سحاب للخدمات اللوجستية")}
//           >
//             سحاب للخدمات اللوجستية
//           </button>
//           <button
//             className={`py-1 px-3 text-sm font-medium rounded ${
//               shipping_company_branch.includes("Last Week")
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black"
//             }`}
//             onClick={() => handleShippingCompanyChange("Last Week")}
//           >
//             Last Week
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-8">
//         <div>
//           <div>
//             <BarChartHorizontal
//               data={barChartSeries}
//               categories={barChartCategories} // Pass categories
//               xAxisName={xAxisName} // Pass X-axis name
//               yAxisName={yAxisName} // Pass Y-axis name
//               isHorizontal={true} // Set true if horizontal bar chart is needed
//             />
//           </div>
//           <div className="mt-5">
//             <BarChartHorizontal
//               data={barChartSeries}
//               categories={barChartCategories} // Pass categories
//               xAxisName={xAxisName} // Pass X-axis name
//               yAxisName={yAxisName} // Pass Y-axis name
//               isHorizontal={false} // Set false if vertical bar chart is needed
//             />
//             <div className="mt-5">
//               <PieChart
//                 data={pieChartSeries}
//                 categories={pieChartCategories}
//                 title="Payment Methods Distribution"
//               />
//             </div>
//           </div>
//         </div>
//         <div>
//           <div>
//             <CardDataStats
//               title="Total views"
//               total="$3.456K"
//               rate="0.43%"
//               levelUp
//             >
//               <svg
//                 className="fill-primary dark:fill-white"
//                 width="22"
//                 height="16"
//                 viewBox="0 0 22 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
//                   fill=""
//                 />
//                 <path
//                   d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
//                   fill=""
//                 />
//               </svg>
//             </CardDataStats>
//           </div>
//           <div className="mt-5">
//             <CardDataStats
//               title="Total views"
//               total="$3.456K"
//               rate="0.43%"
//               levelUp
//             >
//               <svg
//                 className="fill-primary dark:fill-white"
//                 width="22"
//                 height="16"
//                 viewBox="0 0 22 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
//                   fill=""
//                 />
//                 <path
//                   d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
//                   fill=""
//                 />
//               </svg>
//             </CardDataStats>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MapAnalysis;
