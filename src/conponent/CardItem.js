import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {featchProduct} from "../redux/service/productSlice";
import {useNavigate} from "react-router-dom"; // Import Bootstrap Grid

function CartItem() {
    const {products,status,error} = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getProductList();
    }, [dispatch]);

    const getProductList = async () => {
        try {
            dispatch(featchProduct())
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    const handlerCick=(id)=> {
        navigate(`product/${id}`);
    }
    return (
        <Container className="mt-4">
            <Row className="g-3">
                {products.map((product, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card style={{ width: "100%" }} onClick={()=> handlerCick(product._id)}>
                                <Card.Img variant="top" src={product.image[0]} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className={"text-desc"}>{product.description}</Card.Text>
                                    <Card.Text>{product.price} VND</Card.Text>
                                    <Button variant="primary">Add To Cart</Button>
                                </Card.Body>
                            </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CartItem;
