import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import AddCategoryModal from "../modals/AddCate";
import axios from "../service/axios";
import { toast } from "react-toastify";
import DeleteModal from "../modals/DeleteModal";

const CategoryPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const res = await axios.get("/category");
            if (res?.data) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
            toast.error("Không thể lấy danh mục!");
        }
    };

    const deleteCategory = async () => {
        if (!categoryIdToDelete) return;

        try {
            const res = await axios.delete(`/category/${categoryIdToDelete}`);
            if (res?.data) {
                toast.success("Xóa danh mục thành công!");
                getCategories(); // Cập nhật danh sách sau khi xóa
            }
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            toast.error("Không thể xóa danh mục!");
        }
    };

    const handleAddCategory = async (categoryName) => {
        try {
            const res = await axios.post("/category", {
                categoryName,
                image: " "
            });

            if (res?.data) {
                toast.success("Thêm danh mục thành công!");
                getCategories(); // Cập nhật danh sách
                setShowModal(false); // Đóng modal
            }
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
            toast.error(error.response?.data?.message || "Lỗi server, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mt-4">
            <Button variant="success" onClick={() => setShowModal(true)}>
                + Thêm Danh Mục
            </Button>

            {/* Danh sách danh mục */}
            <div className="mt-3">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Card key={category._id} className="mt-3">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <Card.Title className="mb-0">{category.categoryName}</Card.Title>
                                <button
                                    onClick={() => {
                                        setCategoryIdToDelete(category._id);
                                        setShowModalDelete(true);
                                    }}
                                    className="btn btn-danger"
                                >
                                    Xóa
                                </button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>Không có danh mục nào</p>
                )}
            </div>

            {/* Modal Thêm Danh Mục */}
            <AddCategoryModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAddCategory={handleAddCategory}
            />

            {/* Modal Xóa Danh Mục */}
            <DeleteModal
                show={showModalDelete}
                onHide={() => setShowModalDelete(false)}
                title="Xóa danh mục"
                onConfirm={() => {
                    deleteCategory();
                    setShowModalDelete(false);
                }}
            />
        </div>
    );
};

export default CategoryPage;
