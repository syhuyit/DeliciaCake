import "../css/ProductCard.css";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  // =========================
  // NAVIGATE
  // =========================
  const navigate = useNavigate();

  // =========================
  // CONTEXT
  // =========================
  const { addToCart } = useContext(CartContext);

  // =========================
  // HANDLE ADD TO CART
  // =========================
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      {/* ========================= */}
      {/* IMAGE */}
      {/* ========================= */}
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* ========================= */}
      {/* NAME */}
      {/* ========================= */}
      <div
        style={{
          minHeight: "60px",
          marginBottom: "10px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "22px",
          }}
        >
          {product.name}
        </h4>
      </div>

      {/* ========================= */}
      {/* PRICE */}
      {/* ========================= */}
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <p
          style={{
            color: "#2ecc71",

            fontWeight: "bold",

            fontSize: "20px",

            margin: 0,
          }}
        >
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </div>

      {/* ========================= */}
      {/* BUTTON */}
      {/* ========================= */}
      <button
        onClick={handleAddToCart}
        className="add-btn"
      >
        Thêm ngay
      </button>
    </div>
  );
}

export default ProductCard;
