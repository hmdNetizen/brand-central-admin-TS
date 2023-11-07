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

    orders: {
      getBySalespersonId: (salespersonId: string) =>
        `/api/salesperson-orders/admin/${salespersonId}`,
      getById: (orderId: string) =>
        `/api/salesperson-orders/admin/single-order/${orderId}`,
    },
    customers: {
      getById: (salespersonId: string) =>
        `/api/salespersons-customers/admin/${salespersonId}`,
    },
  },
  uploads: {
    single: `/api/uploads/file`,
  },
};
