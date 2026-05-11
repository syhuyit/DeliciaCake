import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Card,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { updateProduct, getProductById } from "../services/productService";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    size: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const loadPBI = async () => {
    const res = await getProductById(id);
    setProduct(res);
  };

  useEffect(() => {
    loadPBI();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      navigate("/admin");
      window.alert("Cập nhật thành công!");
    } catch (error) {
      console.log(error);
      window.alert("Cập nhật thất bại!");
    }
  };

  const styles = {
    wrapper: {
      backgroundColor: "#0a0a0c",
      minHeight: "100vh",
      color: "#f8f9fa",
      padding: "50px 0",
    },
    card: {
      backgroundColor: "#161922",
      border: "1px solid #2d3748",
      borderRadius: "15px",
      padding: "30px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    label: {
      color: "#a0aec0",
      fontSize: "0.9rem",
      fontWeight: "500",
      marginBottom: "8px",
    },
    input: {
      backgroundColor: "#0f111a",
      border: "1px solid #2d3748",
      color: "#ffffff",
      borderRadius: "10px",
      padding: "12px",
    },
    imagePreview: {
      width: "100%",
      height: "200px",
      borderRadius: "12px",
      border: "2px solid #2d3748",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "#000",
    },
  };

  return (
    <div style={styles.wrapper}>
      <Container style={{ maxWidth: "800px" }}>
        <Stack direction="horizontal" className="mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#fff" }}>
              Chỉnh sửa sản phẩm
            </h2>
            <p style={{ color: "#a0aec0", margin: 0 }}>
              Đang chỉnh sửa sản phẩm ID:{" "}
              <span style={{ color: "#f59e0b" }}>#{id}</span>
            </p>
          </div>
          <Link to="/admin" className="ms-auto">
            <Button
              variant="outline-secondary"
              style={{
                borderRadius: "10px",
                color: "#a0aec0",
                borderColor: "#2d3748",
              }}
            >
              ← Huỷ bỏ
            </Button>
          </Link>
        </Stack>

        <Card style={styles.card}>
          <Form onSubmit={handleUpdate}>
            <Row>
              {/* Cột trái: Thông tin chính */}
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>Tên sản phẩm</Form.Label>
                  <Form.Control
                    required
                    style={styles.input}
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Danh mục</Form.Label>
                      <Form.Control
                        required
                        style={styles.input}
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>Kích thước</Form.Label>
                      <Form.Control
                        required
                        style={styles.input}
                        type="text"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>Giá bán ($)</Form.Label>
                  <Form.Control
                    required
                    style={styles.input}
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Cột phải: Ảnh */}
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>Đường dẫn ảnh</Form.Label>
                  <Form.Control
                    required
                    style={styles.input}
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div style={styles.label}>Hình ảnh hiện tại:</div>
                <div style={styles.imagePreview}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#4a5568" }}>Không tìm thấy ảnh</span>
                  )}
                </div>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label style={styles.label}>Mô tả chi tiết</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                style={styles.input}
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid pt-3">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#f59e0b",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  padding: "12px",
                  color: "#000",
                }}
              >
                Lưu thay đổi sản phẩm
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default UpdateProduct;
