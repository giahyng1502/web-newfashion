import axios from "axios";

const instance = axios.create({
  baseURL: "http://160.30.21.59:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Thêm interceptor để xử lý response
instance.interceptors.response.use(
    (response) => {
      return response.data; // 🟢 Trả về `data` thay vì cả response
    },
    (error) => {
      console.error("Lỗi API:", error.response?.data || error.message); // 🔴 Log lỗi rõ ràng
      return Promise.reject(error.response?.data || "Lỗi server!"); // ❌ Trả về lỗi cụ thể hơn
    }
);

export default instance;
