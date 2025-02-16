import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import CategoryPage from "../views/Category";

const AddCategoryModal = ({ show, handleClose, handleAddCategory }) => {
    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = () => {
        if (categoryName.trim() === "") {
            alert("Tên danh mục không được để trống!");
            return;
        }
        handleAddCategory(categoryName);
        setCategoryName(""); // Reset input sau khi thêm
        handleClose(); // Đóng modal
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Danh Mục</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="categoryName">
                        <Form.Label>Tên Danh Mục</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên danh mục..."
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default AddCategoryModal;