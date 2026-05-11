import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import { Table, Button, Container, Card, Badge, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    const resProduct = await getProducts();
    setProducts(resProduct || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn XÓA sản phẩm này không?")) {
      await deleteProduct(id);
      loadData();
    }
  };

  const styles = {
    wrapper: {
      backgroundColor: "#0a0a0c",
      minHeight: "100vh",
      color: "#f8f9fa",
      padding: "50px 0",
    },
    headerCard: {
      background: "#161922",
      border: "1px solid #2d3748",
      borderRadius: "15px",
      padding: "25px",
      marginBottom: "30px",
    },
    mainCard: {
      backgroundColor: "#161922",
      border: "1px solid #2d3748",
      borderRadius: "15px",
      overflow: "hidden",
    },
    table: {
      marginBottom: 0,
      color: "#e2e8f0",
      verticalAlign: "middle",
    },
  };

  return (
    <div style={styles.wrapper}>
      <Container>
        <div style={styles.headerCard}>
          <Stack direction="horizontal" gap={3}>
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#ffffff" }}>
                Quản lý kho hàng
              </h2>
              <p
                className="mb-0"
                style={{ color: "#a0aec0", fontSize: "0.9rem" }}
              >
                Chào mừng bạn trở lại, hệ thống có{" "}
                <strong>{products.length}</strong> sản phẩm hiện hữu.
              </p>
            </div>
            <Link to={"/add"} className="ms-auto">
              <Button
                variant="primary"
                className="px-4 fw-bold"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                }}
              >
                + Thêm sản phẩm
              </Button>
            </Link>
          </Stack>
        </div>

        <Card style={styles.mainCard}>
          <Table responsive hover variant="dark" style={styles.table}>
            <thead style={{ backgroundColor: "#1f232e" }}>
              <tr>
                <th className="ps-4 py-3 border-0" style={{ color: "#94a3b8" }}>
                  ID
                </th>
                <th className="py-3 border-0" style={{ color: "#94a3b8" }}>
                  Thông tin sản phẩm
                </th>
                <th className="py-3 border-0" style={{ color: "#94a3b8" }}>
                  Danh mục
                </th>
                <th
                  className="py-3 border-0 text-center"
                  style={{ color: "#94a3b8" }}
                >
                  Giá bán
                </th>
                <th
                  className="py-3 border-0 text-end pe-4"
                  style={{ color: "#94a3b8" }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #232734" }}>
                  <td
                    className="ps-4"
                    style={{ color: "#718096", fontSize: "0.85rem" }}
                  >
                    #{p.id}
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <div className="fw-bold text-white mb-0">{p.name}</div>
                        <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                          Kích thước: {p.size}
                        </div>
                      </div>
                    </Stack>
                  </td>
                  <td>
                    <Badge
                      bg="dark"
                      style={{ border: "1px solid #3e4451", color: "#cbd5e1" }}
                    >
                      {p.category}
                    </Badge>
                  </td>
                  <td
                    className="text-center"
                    style={{ color: "#10b981", fontWeight: "700" }}
                  >
                    ${p.price}
                  </td>
                  <td className="text-end pe-4">
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="justify-content-end"
                    >
                      <Link to={`/update/${p.id}`}>
                        <Button
                          variant="outline-info"
                          size="sm"
                          style={{ borderRadius: "6px" }}
                        >
                          Sửa
                        </Button>
                      </Link>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ borderRadius: "6px" }}
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
}

export default Admin;
