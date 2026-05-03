import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img
        src={product.image}
        alt=""
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h5 style={{ marginTop: "10px" }}>{product.name}</h5>

      <p style={{ color: "#2ecc71", fontWeight: "bold" }}>{product.price}đ</p>

      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#56B6C6",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.2s",
        }}
        onMouseDown={(e) => {
          e.target.style.transform = "scale(0.9)";
        }}
        onMouseUp={(e) => {
          e.target.style.transform = "scale(1)";
        }}
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}

export default ProductCard;
