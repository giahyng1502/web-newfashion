import axios from "./axios";

export const getProduct = () => {
    return axios.get("/");
}


export const getProductById = (id) => {
    return axios.get(`/getone/${id}`);
}
export const addProduct = (product) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(product),
    }
    return axios(options);
}
