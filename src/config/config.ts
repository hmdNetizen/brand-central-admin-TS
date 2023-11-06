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

    orders: {
      getById: (salespersonId: string) =>
        `/api/salesperson-orders/admin/${salespersonId}`,
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
