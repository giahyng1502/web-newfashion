import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // 🟢 Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // 🟢 Import CSS của react-toastify

import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import AddProduct from "./views/AddProduct";
import Login from "./views/Login";
import Category from "./views/Category";

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} /> {/* 🟢 Hiển thị thông báo */}

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/home/product/:id" element={<ProductDetail />} />
                <Route path="/add/" element={<AddProduct />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
