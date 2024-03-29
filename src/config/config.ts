export const config = {
  product: {
    get: "/api/products",
    getById: (id: string) => `/api/products/${id}`,
  },
  salespersons: {
    get: "/api/salespersons",
    getById: (id: string) => `/api/salespersons/profile/${id}`,
    add: `/api/salespersons/create`,
    update: (id: string) => `/api/salespersons/admin/${id}`,
    delete: (id: string) => `api/salespersons/${id}`,
    filter: "/api/salespersons/filter",

    orders: {
      getBySalespersonId: (salespersonId: string) =>
        `/api/salesperson-orders/admin/${salespersonId}`,
      getById: (orderId: string) =>
        `/api/salesperson-orders/admin/single-order/${orderId}`,
      getOrderTypes: "/api/salesperson-orders/all/admin",
      update: (orderId: string) =>
        `/api/salesperson-orders/order-status/admin/update/${orderId}`,
      countByStatus: "/api/salesperson-orders/count/admin",
      getByCustomerId: (customerId: string) =>
        `/api/salesperson-orders/admin/customer/${customerId}`,
      uploadMultipleStaleOrders: `/api/salesperson-orders/uploads`,
    },
    customers: {
      get: "/api/salespersons-customers",
      getById: (salespersonId: string) =>
        `/api/salespersons-customers/admin/${salespersonId}`,
      profile: (customerId: string) =>
        `/api/salespersons-customers/admin/profile/${customerId}`,
      add: "/api/salespersons-customers",
      delete: (customerId: string) =>
        `/api/salespersons-customers/admin/${customerId}`,
      update: (customerId: string) =>
        `/api/salespersons-customers/admin/${customerId}`,
      filter: "/api/salespersons-customers/filter",
      updateMany: "/api/salespersons-customers/admin/update",
    },
    invoices: {
      updateMany: "/api/salesperson-invoices/update-all",
    },
  },
  uploads: {
    single: `/api/uploads/file`,
  },
};
