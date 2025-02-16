import React, { useState } from "react";
import "../App.scss";
import { login } from "../service/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(user);
            console.log(token)
            if (token) {
                toast.success("Đăng nhập thành công!");
                await localStorage.setItem("token", token);
                navigate("/home");
            } else {
                toast.error('Thông tin tài khoản hoặc mật khẩu không đúng');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Lỗi khi gọi API!";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container2">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="loginbox">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input w-100"
                        name="email"
                        placeholder="Vui lòng nhập tài khoản"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input mt-3 w-100"
                        placeholder="Vui lòng nhập mật khẩu"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-dark w-25 mt-3">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
