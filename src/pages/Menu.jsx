import products from "../services/productService";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";
import { useState, useRef } from "react";

function Menu() {
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const handleReset = () => {
    setCategory("all");
    setKeyword("");
    setSearchValue("");
    inputRef.current.focus();
  };

  // Filter logic
  const filteredProducts = products.filter((item) => {
    const matchCategory = category === "all" || category === item.category;

    const matchKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          background: "#fff",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h5 style={{ marginBottom: "10px" }}>Danh mục</h5>

        {["all", "sweet", "savory"].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            style={{
              width: "100%",
              marginBottom: "8px",
              padding: "8px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: category === item ? "#56B6C6" : "#f0f0f0",
              color: category === item ? "white" : "black",
            }}
          >
            {item === "all"
              ? "Tất cả"
              : item === "sweet"
                ? "Bánh ngọt"
                : "Bánh mặn"}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            maxWidth: "400px",
          }}
        >
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="🔍 Tìm bánh..."
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <button
            onClick={() => setKeyword(searchValue)}
            style={{
              background: "#FF7F9C",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Tìm
          </button>
          <button
            onClick={handleReset}
            style={{
              background: "#ccc",
              color: "black",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        <h3 style={{ marginBottom: "15px" }}>Danh sách bánh</h3>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm</p>
          )}
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
