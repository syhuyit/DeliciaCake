function ProductCard({ product }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",

        display: "flex",
        flexDirection: "column",

        height: "100%",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "15px",
        }}
      />

      {/* NAME */}
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

      {/* PRICE */}
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
          {product.price}đ
        </p>
      </div>

      {/* BUTTON */}
      <button
        style={{
          marginTop: "auto",

          background: "#56B6C6",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}

export default ProductCard;
