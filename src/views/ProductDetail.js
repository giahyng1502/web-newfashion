import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image, ListGroup } from "react-bootstrap";
import { getProductById } from "../service/productService";
import Header from "../conponent/Header";
import Button from "react-bootstrap/Button";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductById(id);
            setProduct(response.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }
    return (
        <Container>
            <Header />
            <Row className="mt-4">
                {/* Hình ảnh sản phẩm */}
                <Col md={6}>
                    <Image style={{height : '100%'}} src={product.image[0] || "https://via.placeholder.com/400"} fluid />
                </Col>

                {/* Thông tin sản phẩm */}
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
            <Col md={12} className={'mt-5'} >
                <Button className={"btn-danger w-100"}>Mua ngay</Button>
            </Col>
            {/* Danh sách đánh giá */}
            <Row className="mt-4">
                <Col>
                    <h3>Reviews</h3>
                    {product.reviews.length === 0 ? (
                        <p>Chưa có đánh giá nào</p>
                    ) : (
                        product.reviews.map((review) => (
                            <Card key={review._id} className="mb-3 p-3">
                                <Row>
                                    <Col md={2}>
                                        <Image src={review.userId.avatar} roundedCircle width={50} height={50} />
                                    </Col>
                                    <Col md={10}>
                                        <h5>{review.userId.name}</h5>
                                        <p>⭐ {review.rate} / 5</p>
                                        <p>{review.content}</p>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
