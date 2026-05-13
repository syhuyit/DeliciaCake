import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Card,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { addProduct } from "../services/productService";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    size: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product);
      navigate("/admin");
      window.alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.log(error);
      window.alert("Thêm sản phẩm thất bại!");
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
      color: "#fff",
      borderRadius: "10px",
      padding: "12px",
    },
    imagePreview: {
      width: "100%",
      height: "200px",
      borderRadius: "12px",
      border: "2px dashed #2d3748",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "#0a0a0c",
      color: "#4a5568",
    },
  };

  return (
    <div style={styles.wrapper}>
      <Container style={{ maxWidth: "800px" }}>
        {/* Header & Back Button */}
        <Stack direction="horizontal" className="mb-4">
          <div>
            <h2 className="fw-bold mb-1">Thêm sản phẩm mới</h2>
            <p style={{ color: "#a0aec0", margin: 0 }}>
              Điền thông tin để cập nhật kho hàng
            </p>
          </div>
          <Link to="/admin" className="ms-auto text-decoration-none">
            <Button
              variant="outline-secondary"
              style={{ borderRadius: "10px", color: "#a0aec0" }}
            >
              ← Quay lại
            </Button>
          </Link>
        </Stack>

        <Card style={styles.card}>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Cột trái: Thông tin cơ bản */}
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
                    placeholder="Ví dụ: Bánh xu kem..."
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
                        placeholder="Loại bánh..."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={styles.label}>
                        Kích thước (Size)
                      </Form.Label>
                      <Form.Control
                        required
                        style={styles.input}
                        type="text"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        placeholder="cm/inch..."
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
                    placeholder="0.00"
                  />
                </Form.Group>
              </Col>

              {/* Cột phải: Hình ảnh & Preview */}
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label style={styles.label}>
                    Đường dẫn ảnh (URL)
                  </Form.Label>
                  <Form.Control
                    required
                    style={styles.input}
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Form.Group>

                <div className="mb-2" style={styles.label}>
                  Xem trước hình ảnh:
                </div>
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
                    <span>Chưa có ảnh</span>
                  )}
                </div>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label style={styles.label}>Mô tả chi tiết</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                style={styles.input}
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Nhập mô tả sản phẩm tại đây..."
              />
            </Form.Group>

            <hr style={{ borderColor: "#2d3748", margin: "25px 0" }} />

            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                style={{
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  padding: "15px",
                }}
              >
                Xác nhận thêm sản phẩm
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default AddProduct;
