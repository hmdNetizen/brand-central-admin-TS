export const config = {
  product: {
    get: "/api/products",
    getById: (id: string) => `/api/products/${id}`,
  },
};
