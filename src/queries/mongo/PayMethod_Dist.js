export const createPieChartQuery = (paymentMethods, shippingCompanies) => {
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
  