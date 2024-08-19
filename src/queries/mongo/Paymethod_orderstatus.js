export const createBarChartQuery = (paymentMethods, shippingCompanies) => {
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
