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
export const addReview = async (productId, reviewData) => {
    return await axios.post(`putreview/${productId}`, reviewData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}