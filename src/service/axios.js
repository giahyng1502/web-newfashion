import axios from "axios";

const API_URL = "https://backend-newfashion.onrender.com/"; // Thay bằng URL backend của bạn

// Lấy token từ localStorage (hoặc Redux store)
const getToken = () => localStorage.getItem("token");

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🟢 Interceptor cho request: Thêm token vào headers
instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔴 Interceptor cho response: Xử lý dữ liệu & lỗi
instance.interceptors.response.use(
    (response) => response.data, // Trả về `data` thay vì cả response
    (error) => {
        console.error("Lỗi API:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || "Lỗi server!");
    }
);

export default instance;
