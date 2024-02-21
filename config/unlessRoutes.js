module.exports.unlessRoutes = {
  path: [
    { url: "/api/v1/auth/login", method: "POST" },
    { url: "/api/v1/auth/register", method: "POST" },

    { url: /^\/api\/v1\/product\/.*/, method: "GET" },
    { url: "/api/v1/product", method: "GET" },
    { url: /^\/api\/v1\/user\/.*/, method: "GET" },
    { url: "/api/v1/order", method: "GET" },
    { url: "/api/v1/order/convert-to-excel", method: "GET" },
    { url: "/api/v1/filter/products", method: "POST" },
  ],
};
