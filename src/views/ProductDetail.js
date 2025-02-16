import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image, ListGroup } from "react-bootstrap";
import { getProductById, addReview } from "../service/productService"; // Import API
import Header from "../conponent/Header";
import Button from "react-bootstrap/Button";
import axios from "../service/axios";
import {toast} from "react-toastify";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState({
        content: "",
        rating: 0,
        images: []
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        const response = await getProductById(id);
        setProduct(response.data);
    };

    // Xử lý chọn file ảnh/video
    const handleFileChange = (e) => {
        setReview({...review, images: Array.from(e.target.files)});
    };

    const deleteReview = async (reviewId) => {
        try {
            const res = await axios.put(`/deleteReview/${id}`,{
                reviewId : reviewId
            })
            if (res.data) {
                toast('Xóa đánh giá thành công')
            }else{
                toast('Xóa đánh giá thất bại')
            }
        }catch(err) {
            console.log(err);
        }
    }
    // Gửi đánh giá lên server
    const handleSubmitReview = async () => {
        if (!review.content || review.rating === 0) {
            alert("Vui lòng nhập nội dung và đánh giá!");
            return;
        }

        const formData = new FormData();
        formData.append("content", review.content);
        formData.append("rating", review.rating);
        review.images.forEach((file) => {
            formData.append("files", file);
        });

        try {

            const res = await axios.put(`https://backend-newfashion.onrender.com/putReview/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (res.data) {
                toast.success('Đăng nhận xét thành công');
            }else {
                toast.error('Đăng nhận xét thất bại')
            }
        } catch (error) {
            console.error("Lỗi khi gửi form:", error);
            alert(error.response?.data?.error || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <Container className={'mb-5'}>
            <Header />
            <Row className="mt-4">
                <Col md={6}>
                    <Image src={product.image[0] || "https://via.placeholder.com/400"} fluid />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <h4 className="text-danger">${product.price}</h4>
                    <p>{product.description}</p>
                    <ListGroup>
                        <ListGroup.Item><strong>Số lượng:</strong> {product.quantity}</ListGroup.Item>
                        <ListGroup.Item><strong>Màu sắc:</strong> {product.color.join(", ")}</ListGroup.Item>
                        <ListGroup.Item><strong>Kích thước:</strong> {product.size.join(", ")}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Col md={12} className={'mt-5'}>
                <Button className={"btn-danger w-100"}>Mua ngay</Button>
            </Col>

            {/* Danh sách đánh giá */}
            <Row className="mt-4">
                <Col>
                    <h3>Đánh giá sản phẩm</h3>
                    {product.reviews.length === 0 ? (
                        <p>Chưa có đánh giá nào</p>
                    ) : (
                        product.reviews.map((review) => (
                            <Card key={review._id} className="mb-3 p-3">
                                <Row>
                                    <Col md={2}>
                                        <Image src={review.userId.avatar} roundedCircle width={50} height={50}/>
                                    </Col>
                                    <Col md={10}>
                                        <h5>{review.userId.name}</h5>
                                        <p>⭐ {review.rate} / 5</p>
                                        <p>{review.content}</p>
                                        {
                                            review.images.length > 0 && review.images.map((image, index) => (
                                                <Image src={image} width={200}/>
                                            ))
                                        }

                                    </Col>
                                </Row>
                                <button className={"btn-danger w-100 mt-4 btn"} onClick={()=>deleteReview(review._id)}>
                                    Xóa
                                </button>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>

            {/* Form nhập đánh giá */}
            <Row className="mt-4">
            <Col md={12}>
                    <h4>Viết đánh giá của bạn</h4>
                    <input type="file" multiple onChange={handleFileChange} accept="image/*,video/*" />
                    <input type="number" value={review.rating} onChange={(e) => setReview({...review, rating: e.target.value})} placeholder="Rate" min={0} max={5} />
                    <div style={{
                        display: "flex"
                        ,alignItems : 'center'
                        ,alignSelf : "center"
                        , alignContent: "center"
                        ,marginTop : 20
                        ,justifyContent: "center" }}>
                        <input type="text" className="input w-100 me-2" value={review.content}
                               onChange={(e) => setReview({...review, content: e.target.value})}
                               placeholder="Nội dung đánh giá"/>
                        <button className="btn btn-danger " style={{
                            width: 100,
                            height : 50
                        }} onClick={handleSubmitReview}>Gửi
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
