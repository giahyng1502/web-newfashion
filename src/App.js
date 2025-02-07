import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import AddProduct from "./views/AddProduct";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/add/" element={<AddProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
