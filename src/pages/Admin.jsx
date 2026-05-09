import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Admin() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    const resProduct = await getProducts();
    return setProducts(resProduct);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h2>List of Products ({products.length})</h2>
    </div>
  );
}

export default Admin;
