import React from 'react';
import { Modal } from "react-bootstrap";

function DeleteModal({ show, onHide, title, onConfirm }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có xác nhận xóa nội dung này không?</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>
                    Hủy
                </button>
                <button className="btn btn-danger" onClick={onConfirm}>
                    Xác Nhận
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
