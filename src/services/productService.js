import API from "./api";

export const getProducts = () => API.get("/products");

export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

// ADD PRODUCT
export const addProduct = (data) => API.post("/products", data);

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};
