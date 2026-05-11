import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    const resProduct = await getProducts();
    return setProducts(resProduct.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  //xoa san pham
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to DELETE this product")) {
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h2>List of Products ({products.length})</h2>
      <Link to={"/add"}>
        <Button variant="success">Add Product</Button>
      </Link>

      <Table bordered striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Size</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={p.image}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>{p.size}</td>
              <td>{p.price}</td>
              <td>
                <Link to={`/update/${p.id}`}>
                  <Button style={{ marginBottom: "5px" }} variant="warning">
                    Update
                  </Button>
                </Link>
                <Button onClick={() => handleDelete(p.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
