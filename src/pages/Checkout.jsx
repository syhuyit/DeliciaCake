import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");

  const handleCheckout = () => {
    if (!district || !address || !name || !phone || !bank) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const order = {
      id: Date.now(),
      district,
      address,
      name,
      phone,
      bank,
      cart,
      total,
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...oldOrders, order]));

    clearCart();

    alert("Thanh toán thành công!");
  };

  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      <Dropdown>
        <Dropdown.Toggle variant="success">
          {district || "Chọn quận"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setDistrict("Hà Đông")}>
            Hà Đông
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDistrict("Thanh Xuân")}>
            Thanh Xuân
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDistrict("Hai Bà Trưng")}>
            Hai Bà Trưng
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
