import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const data = await getProducts();
    const foundProduct = data.find((item) => item.id === Number(id));
    setProduct(foundProduct);
  };

  if (!product) {
    return <h2>Đang tải...</h2>;
  }

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        gap: "40px",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "400px",
          borderRadius: "16px",
        }}
      />

      {/* INFO */}
      <div>
        <h1>{product.name}</h1>

        <h3 style={{ color: "#2ecc71" }}>{product.price}đ</h3>

        <p>
          <b>Kích thước:</b> {product.size}
        </p>

        <p>
          <b>Danh mục:</b> {product.category}
        </p>

        <p>{product.description}</p>

        <button
          style={{
            background: "#56B6C6",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
