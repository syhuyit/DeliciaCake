import { Dropdown } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");

  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!address || !name || !phone || !bank) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const order = {
      userId: user?.id,
      address,
      name,
      phone,
      bank,
      cart,
      total,
      date: new Date().toISOString(),
      status: "pending"
    };

    try {
      await createOrder(order);
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Thanh toán thất bại!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <button onClick={() => navigate("/orders")}>Đơn hàng của bạn</button>
      <h2>Thanh toán</h2>

      <h4>Thông tin nhận hàng</h4>

      <input
        placeholder="Địa chỉ chi tiết"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", marginTop: "10px", padding: "8px" }}
      />

      <h4 style={{ marginTop: "15px" }}>Người nhận</h4>

      <input
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />

      <h4 style={{ marginTop: "15px" }}>Ngân hàng</h4>

      <Dropdown>
        <Dropdown.Toggle variant="success">
          {bank || "Chọn ngân hàng"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setBank("Vietcombank")}>
            Vietcombank
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setBank("MB Bank")}>
            MB Bank
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setBank("Agribank")}>
            Agribank
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <h4 style={{ marginTop: "15px" }}>
        Tổng tiền: {total.toLocaleString()} VND
      </h4>

      <button
        onClick={handleCheckout}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "#FF7F9C",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Thanh toán
      </button>
    </div>
  );
}

export default Checkout;
