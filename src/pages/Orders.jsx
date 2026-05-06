function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

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
