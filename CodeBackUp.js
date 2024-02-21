// const data = await Order.aggregate([
//   {
//     $lookup: {
//       from: "users",
//       localField: "userId",
//       foreignField: "_id",
//       as: "User",
//     },
//   },
//   {
//     $unwind: "$User",
//   },
//   {
//     $match: {
//       "User.role": "DropShipper",
//     },
//   },
// ]);

const data = await Order.aggregate([
  {
    $match: {
      deleted: false,
      ...v,
    },
  },
  {
    $lookup: {
      from: "checkouts",
      localField: "checkout",
      foreignField: "_id",
      as: "checkout",
    },
  },
  {
    $unwind: "$checkout",
  },

  {
    $group: {
      _id: "$orderStatus",
      count: { $sum: 1 },
      earning: { $sum: "$checkout.totalPrice" },
    },
  },
  {
    $group: {
      _id: null,
      countsByStatus: {
        $push: {
          status: "$_id",
          count: "$count",
          earning: "$earning",
        },
      },
      totalOrderCount: { $sum: "$count" },
      totalEarnings: { $sum: "$earning" },
    },
  },
]);

// const data = await Order.aggregate([
//   {
//     $match: {
//       userId: new ObjectId(id),
//       ...v,
//     },
//   },
//   {
//     $lookup: {
//       from: "checkouts",
//       localField: "checkout",
//       foreignField: "_id",
//       as: "checkout",
//     },
//   },
//   {
//     $unwind: "$checkout",
//   },
//   {
//     $lookup: {
//       from: "products",
//       localField: "checkout.products.product",
//       foreignField: "_id",
//       as: "checkout.products",
//     },
//   },
//   {
//     $group: {
//       _id: "$orderStatus",
//       count: { $sum: 1 },
//       sellPriceSum: { $sum: "$checkout.totalPrice" },
//       productsPriceSum: {
//         $sum: {
//           $reduce: {
//             input: "$checkout.products",
//             initialValue: 0,
//             in: { $add: ["$$value", "$$this.price"] },
//           },
//         },
//       },
//     },
//   },
//   {
//     $group: {
//       _id: null,
//       countsByStatus: {
//   $push: {
//     status: "$_id",
//     count: "$count",
//     earning: "$sellPriceSum",
//     ProductOrignalPriceSum: "$productsPriceSum",
//   },
// },
//       totalOrderCount: { $sum: "$count" },
//       totalSellPrice: { $sum: "$sellPriceSum" },
//       ProductOrignalPriceSum: { $sum: "$productsPriceSum" },
//     },
//   },
// ]);

// {
//   $ifNull: [
//     "$checkout.products.product.price",
//     {
//       $map: {
//         input: "$checkout.products.product.variations",
//         as: "item",
//         in: "$$item.price",
//       },
//     },
//   ],
// },

// profit: {
//   $sum: {
//     $multiply: [
//       "$checkout.products.quantity",
//       {
//         $subtract: [
//           "$checkout.products.sellPrice",
//           "$checkout.products.product.variations.price",
//         ],
//       },
//     ],
//   },
// },

const order = Order.aggregate([
  {
    $match: {
      // userId: new ObjectId(id),
      deleted: false,
      ...v,
    },
  },
  {
    $lookup: {
      from: "checkouts",
      localField: "checkout",
      foreignField: "_id",
      as: "checkout",
    },
  },

  {
    $unwind: "$checkout",
  },
  {
    $unwind: "$checkout.products",
  },
  {
    $lookup: {
      from: "products",
      localField: "checkout.products.product",
      foreignField: "_id",
      as: "checkout.products.product",
    },
  },
  {
    $unwind: "$checkout.products.product",
  },
  {
    $unwind: "$checkout.products.product.variations",
  },
  {
    $group: {
      _id: "$orderStatus",
      count: { $sum: 1 },
      earning: { $sum: "$checkout.totalPrice" },
      // profit: {
      //   $sum: {
      //     $multiply: [
      //       "$checkout.products.quantity",
      //       {
      //         $subtract: [
      //           "$checkout.products.sellPrice",
      //           // {
      //           //   $ifNull: [
      //           //     "$checkout.products.product.price",
      //           //     "$checkout.products.product.variations.price",
      //           //   ],
      //           // },
      //           "$checkout.products.product.price",
      //         ],
      //       },
      //     ],
      //   },
      // },
    },
  },
  {
    $group: {
      _id: null,
      countsByStatus: {
        $push: {
          status: "$_id",
          count: "$count",
          earning: "$earning",
          // profit: "$profit",
        },
      },
      totalOrderCount: { $sum: "$count" },
      totalEarnings: { $sum: "$earning" },
    },
  },
]);
