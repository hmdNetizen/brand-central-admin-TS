export const config = {
  product: {
    get: "/api/products",
    getById: (id: string) => `/api/products/${id}`,
  },
  salespersons: {
    get: "/api/salespersons",
    getById: (id: string) => `/api/salespersons/profile/${id}`,

    orders: {
      getById: (salespersonId: string) =>
        `/api/salesperson-orders/admin/${salespersonId}`,
    },
  },
};
