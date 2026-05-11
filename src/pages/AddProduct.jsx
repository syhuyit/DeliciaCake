import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addProduct, getProducts } from "../services/productService";

function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        size: "",
        price: "",
        image: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(product);
            navigate("/admin");
        } catch (error) {
            console.log(error);
            window.alert("Thêm sản phẩm thất bại!");
        }
    };


    return (
        <div>
            <h1>Add Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control required type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nhap ten san pham..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap ten san pham</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category:</Form.Label>
                    <Form.Control required type="text" name="category" value={product.category} onChange={handleChange} placeholder="Nhap loai san pham..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap loai san pham</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control required type="text" name="description" value={product.description} onChange={handleChange} placeholder="Nhap mo ta..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap mo ta</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control required type="text" name="size" value={product.size} onChange={handleChange} placeholder="Nhap size..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap size</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control required type="number" name="price" value={product.price} onChange={handleChange} placeholder="Nhap gia..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap gia</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control required type="text" name="image" value={product.image} onChange={handleChange} placeholder="Nhap anh..." />
                    <Form.Control.Feedback type="invalid">Vui long nhap anh</Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" type="submit">Add Product</Button>
            </Form>
        </div>
    )
}
export default AddProduct;