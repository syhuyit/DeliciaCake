import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, getTotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h4>🛒 Giỏ hàng</h4>

      {cart.length === 0 ? (
        <p>Chưa có sản phẩm</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f9f9f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
            }}
          >
            <b>{item.name}</b>
            <br />
            {item.price}đ
            <div style={{ marginTop: "5px" }}>
              <button
                style={{ color: "green", border: "none", background: "none" }}
                onClick={() => decreaseQty(item.id)}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button
                style={{ color: "green", border: "none", background: "none" }}
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>
            </div>
            <hr />
            <button
              onClick={() => removeItem(item.id)}
              style={{ color: "red", border: "none", background: "none" }}
            >
              Xoá
            </button>
          </div>
        ))
      )}

      <h5 style={{ marginTop: "10px", color: "#27ae60" }}>
        Tổng: {getTotal()}đ
      </h5>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          width: "100%",
          background: "#16a085",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        Thanh toán
      </button>
    </div>
  );
}

export default Cart;
