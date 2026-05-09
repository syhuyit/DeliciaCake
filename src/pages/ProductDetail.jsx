import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  // ===============================
  // GET ID FROM URL
  // ===============================
  const { id } = useParams();

  // ===============================
  // CONTEXT
  // ===============================
  const { addToCart } = useContext(CartContext);

  // ===============================
  // STATES
  // ===============================
  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  // ===============================
  // FETCH PRODUCT
  // ===============================
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const foundProduct = await getProductById(id);

    setProduct(foundProduct);
  };

  // ===============================
  // LOADING
  // ===============================
  if (!product) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Đang tải sản phẩm...
      </div>
    );
  }

  // ===============================
  // HANDLE ADD TO CART
  // ===============================
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* MAIN CONTAINER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",

          background: "white",
          borderRadius: "20px",

          padding: "40px",

          display: "flex",
          gap: "50px",

          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* ========================= */}
        {/* LEFT SIDE - IMAGE */}
        {/* ========================= */}
        <div
          style={{
            flex: 1,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "20px",

              transition: "0.3s",

              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          />
        </div>

        {/* ========================= */}
        {/* RIGHT SIDE - INFO */}
        {/* ========================= */}
        <div
          style={{
            flex: 1,

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* NAME */}
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "20px",
            }}
          >
            {product.name}
          </h1>

          {/* PRICE */}
          <h2
            style={{
              color: "#2ecc71",
              marginBottom: "25px",
              fontSize: "34px",
            }}
          >
            {product.price.toLocaleString("vi-VN")}đ
          </h2>

          {/* CATEGORY */}
          <div
            style={{
              marginBottom: "12px",
              fontSize: "18px",
            }}
          >
            <b>Danh mục:</b> {product.category}
          </div>

          {/* SIZE */}
          <div
            style={{
              marginBottom: "25px",
              fontSize: "18px",
            }}
          >
            <b>Kích thước:</b> {product.size}
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              lineHeight: "1.8",
              fontSize: "17px",
              color: "#555",

              marginBottom: "30px",
            }}
          >
            {product.description}
          </div>

          {/* QUANTITY */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",

              marginBottom: "30px",
            }}
          >
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              style={{
                width: "40px",
                height: "40px",

                border: "none",
                borderRadius: "10px",

                background: "#eee",
                cursor: "pointer",

                fontSize: "20px",
              }}
            >
              -
            </button>

            <span
              style={{
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: "40px",
                height: "40px",

                border: "none",
                borderRadius: "10px",

                background: "#eee",
                cursor: "pointer",

                fontSize: "20px",
              }}
            >
              +
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            style={{
              background: "#56B6C6",

              color: "white",

              border: "none",

              padding: "16px",

              borderRadius: "14px",

              fontSize: "18px",
              fontWeight: "bold",

              cursor: "pointer",

              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
