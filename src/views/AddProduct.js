import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        size: "",
        color: "",
        price: 0,
        description: "",
    });

    const [images, setImages] = useState([]); // Mảng chứa nhiều ảnh đã chọn

    const handleChange = (e) => {
        const { name, value } = e.target;
            setProduct((prev) => ({
                ...prev,
                [name]: value,
            }));
    };

    // Hàm xử lý thay đổi hình ảnh và upload lên Cloudflare R2
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Lấy tất cả các file được chọn
        setImages(files); // Lưu các file đã chọn vào state
    };

    // Hàm gửi dữ liệu và ảnh lên server
// Hàm gửi dữ liệu và ảnh lên server
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi
        if (!product.name || !product.price || !product.quantity || !product.description || images.length === 0) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm và chọn ít nhất một ảnh!");
            return;
        }

        // Tạo đối tượng FormData
        const formData = new FormData();

        // Thêm các trường thông tin sản phẩm vào FormData
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("description", product.description);
        formData.append("size", product.size);  // Truyền mảng size mà không cần JSON.stringify
        formData.append("color", product.color);  // Truyền mảng color mà không cần JSON.stringify

        // Thêm tất cả ảnh vào FormData
        images.forEach((file, index) => {
            formData.append("files", file);
        });

        try {
            // Gửi request tới server với FormData
            const response = await fetch("http://160.30.21.59:3000/upload/product", {
                method: "POST",
                body: formData,
            });

            // Kiểm tra kết quả trả về
            if (response.ok) {
                const result = await response.json();
                alert(result.message); // Hiển thị thông báo thành công
            } else {
                const error = await response.json();
                alert(error.error); // Hiển thị lỗi
            }
        } catch (error) {
            console.error("Lỗi khi gửi form:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };


    return (
        <Container>
            <h2>Add New Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product size (separate by commas)"
                        name="size"
                        value={product.size}  // Hiển thị mảng dưới dạng chuỗi
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product color (separate by commas)"
                        name="color"
                        value={product.color}  // Hiển thị mảng dưới dạng chuỗi
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter product description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formProductImages">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
