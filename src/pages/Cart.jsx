import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  // =========================
  // CONTEXT
  // =========================
  const { cart, removeFromCart, clearCart, getTotal, updateQuantity } = useContext(CartContext);

  const navigate = useNavigate();

  // =========================
  // EMPTY CART
  // =========================
  if (cart.length === 0) {
    return (
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3>🛒 Giỏ hàng</h3>

        <p>Chưa có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: "20px",
      }}
    >
      {/* ========================= */}
      {/* TITLE */}
      {/* ========================= */}
      <h3
        style={{
          marginBottom: "20px",
        }}
      >
        🛒 Giỏ hàng
      </h3>

      {/* ========================= */}
      {/* PRODUCT LIST */}
      {/* ========================= */}
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
            marginBottom: "15px",
          }}
        >
          {/* IMAGE + INFO */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* INFO */}
            <div style={{ flex: 1 }}>
              {/* NAME */}
              <h5
                style={{
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                {item.name}
              </h5>

              {/* PRICE */}
              <p
                style={{
                  color: "#2ecc71",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {item.price.toLocaleString("vi-VN")}đ
              </p>

              {/* QUANTITY */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "5px",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#eee",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </button>

                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#eee",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* REMOVE BUTTON */}
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              marginTop: "10px",

              background: "#ff6b6b",
              color: "white",

              border: "none",

              padding: "8px 12px",

              borderRadius: "8px",

              cursor: "pointer",

              width: "100%",
            }}
          >
            Xóa sản phẩm
          </button>
        </div>
      ))}

      {/* ========================= */}
      {/* TOTAL */}
      {/* ========================= */}
      <div
        style={{
          marginTop: "20px",
          borderTop: "2px solid #eee",
          paddingTop: "15px",
        }}
      >
        <h4>
          Tổng tiền:{" "}
          <span style={{ color: "#2ecc71" }}>
            {getTotal().toLocaleString("vi-VN")}đ
          </span>
        </h4>
      </div>

      {/* ========================= */}
      {/* BUTTONS */}
      {/* ========================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* CHECKOUT */}
        <button
          onClick={() => navigate("/checkout")}
          style={{
            background: "#56B6C6",
            color: "white",

            border: "none",

            padding: "12px",

            borderRadius: "10px",

            cursor: "pointer",

            fontWeight: "bold",
          }}
        >
          Thanh toán
        </button>

        {/* CLEAR CART */}
        <button
          onClick={clearCart}
          style={{
            background: "#ddd",
            color: "black",

            border: "none",

            padding: "12px",

            borderRadius: "10px",

            cursor: "pointer",

            fontWeight: "bold",
          }}
        >
          Xóa toàn bộ
        </button>
      </div>
    </div>
  );
}

export default Cart;
