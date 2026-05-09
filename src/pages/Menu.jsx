import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";

import { useState, useRef, useEffect } from "react";

function Menu() {
  // ==============================
  // STATE
  // ==============================

  // Danh sách sản phẩm
  const [products, setProducts] = useState([]);

  // Category hiện tại
  const [category, setCategory] = useState("all");

  // Keyword dùng để filter
  const [keyword, setKeyword] = useState("");

  // Giá trị input search
  const [searchValue, setSearchValue] = useState("");

  // Sắp xếp giá
  const [sortOrder, setSortOrder] = useState("");

  // Trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Ref focus input
  const inputRef = useRef();

  // Số sản phẩm mỗi trang
  const productsPerPage = 4;

  // ==============================
  // FETCH API
  // ==============================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // ==============================
  // CATEGORY LIST
  // Tạo category động từ database
  // ==============================

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  // ==============================
  // HANDLE RESET
  // ==============================

  const handleReset = () => {
    setCategory("all");
    setKeyword("");
    setSearchValue("");
    setSortOrder("");
    setCurrentPage(1);

    inputRef.current.focus();
  };

  // ==============================
  // FILTER PRODUCTS
  // ==============================

  const filteredProducts = products.filter((item) => {
    // Filter category
    const matchCategory = category === "all" || category === item.category;

    // Filter keyword
    const matchKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

  // ==============================
  // SORT PRODUCTS
  // ==============================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Giá tăng dần
    if (sortOrder === "asc") {
      return a.price - b.price;
    }

    // Giá giảm dần
    if (sortOrder === "desc") {
      return b.price - a.price;
    }

    return 0;
  });

  // ==============================
  // PAGINATION
  // ==============================

  // Tổng số trang
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Vị trí bắt đầu
  const startIndex = (currentPage - 1) * productsPerPage;

  // Danh sách sản phẩm của trang hiện tại
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // ==============================
  // UI
  // ==============================

  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        padding: "25px",
        background: "#f7f8fa",
        minHeight: "100vh",
      }}
    >
      {/* ==============================
          SIDEBAR
      ============================== */}

      <div
        style={{
          width: "220px",
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          height: "fit-content",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>Danh mục</h4>

        {categories.map((item) => (
          <button
            key={item}
            onClick={() => {
              setCategory(item);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",

              background: category === item ? "#56B6C6" : "#f3f3f3",

              color: category === item ? "white" : "#333",

              transition: "0.2s",
            }}
          >
            {item === "all" ? "Tất cả" : item}
          </button>
        ))}
      </div>

      {/* ==============================
          MAIN CONTENT
      ============================== */}

      <div style={{ flex: 1 }}>
        {/* ==============================
            SEARCH + SORT
        ============================== */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search Input */}
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="🔍 Tìm bánh..."
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setKeyword(searchValue);
                setCurrentPage(1);
              }
            }}
            style={{
              width: "260px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
            }}
          />

          {/* Search Button */}
          <button
            onClick={() => {
              setKeyword(searchValue);
              setCurrentPage(1);
            }}
            style={{
              background: "#FF7F9C",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Tìm
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            style={{
              background: "#dcdcdc",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              backgroundColor: "#FF61F8",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginLeft: "auto",
            }}
          >
            <option value="">Sắp xếp theo giá</option>

            <option value="asc">Giá tăng dần</option>

            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        {/* Title */}
        <h2 style={{ marginBottom: "20px" }}>Danh sách bánh</h2>

        {/* ==============================
            PRODUCT GRID
        ============================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
          }}
        >
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm</p>
          )}
        </div>

        {/* ==============================
            PAGINATION
        ============================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "30px",
          }}
        >
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              width: "42px",
              height: "42px",
              border: "none",
              borderRadius: "12px",
              background: currentPage === 1 ? "#e8e8e8" : "#56B6C6",
              color: currentPage === 1 ? "#aaa" : "white",
              fontSize: "18px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.2s",
              boxShadow:
                currentPage === 1 ? "none" : "0 3px 8px rgba(86,182,198,0.35)",
            }}
          >
            ←
          </button>

          {/* Page Info */}
          <span
            style={{
              background: "white",
              padding: "10px 22px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "15px",
              color: "#333",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              letterSpacing: "0.5px",
            }}
          >
            Trang{" "}
            <span style={{ color: "#56B6C6", fontSize: "17px" }}>
              {currentPage}
            </span>{" "}
            / {totalPages}
          </span>

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              width: "42px",
              height: "42px",
              border: "none",
              borderRadius: "12px",
              background:
                currentPage === totalPages ? "#e8e8e8" : "#56B6C6",
              color: currentPage === totalPages ? "#aaa" : "white",
              fontSize: "18px",
              cursor:
                currentPage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.2s",
              boxShadow:
                currentPage === totalPages
                  ? "none"
                  : "0 3px 8px rgba(86,182,198,0.35)",
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* ==============================
          CART
      ============================== */}

      <div style={{ width: "300px" }}>
        <Cart />
      </div>
    </div>
  );
}

export default Menu;
