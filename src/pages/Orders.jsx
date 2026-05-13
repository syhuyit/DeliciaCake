import { useEffect, useState, useContext } from "react";
import { getOrdersByUserId } from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext); // Lấy user hiện tại

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const data = await getOrdersByUserId(user.id);
          setOrders(data);
        } catch (error) {
          console.error("Lỗi khi tải đơn hàng", error);
        }
      }
    };
    
    fetchOrders();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Đơn hàng của bạn</h2>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <p>
              <b>Tên:</b> {order.name}
            </p>
            <p>
              <b>SĐT:</b> {order.phone}
            </p>
            <p>
              <b>Địa chỉ:</b> {order.address}
            </p>
            <p>
              <b>Tổng:</b> {order.total.toLocaleString()} VND
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
