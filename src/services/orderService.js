import API from "./api";

export const createOrder = async (order) => {
    const res = await API.post("/orders", order);
    return res.data;
}

export const getOrdersByUserId = async (userId) => {
    const res = await API.get(`/orders?userId=${userId}`);
    return res.data;
}