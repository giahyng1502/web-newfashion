import "../App.scss";
import Container from "react-bootstrap/Container";
import Header from "../conponent/Header";
import CardItem from "../conponent/CardItem";

function Home() {
    return (
        <div className="app-container">
            <Header />
            <Container>
                <CardItem/>
            </Container>
        </div>
    );
}

export default Home;
