import products from "../services/productService";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";

function Menu() {
  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h5>Danh mục</h5>
        <p>Tất cả</p>
        <p>🍰 Bánh ngọt</p>
        <p>🥐 Bánh mặn</p>
      </div>

      {/* Products */}
      <div style={{ flex: 1 }}>
        <h3>Danh sách bánh</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div style={{ width: "280px" }}>
        <Cart />
      </div>
    </div>
  );
}

export default Menu;
