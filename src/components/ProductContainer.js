import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "./Product";

export default function ProductContainer() {
    return (
        <Container>
            <Row>
                <Col><Product /></Col>
                <Col><Product /></Col>
            </Row>
            <Row>
                <Col><Product /></Col>
                <Col><Product /></Col>
            </Row>
        </Container>
    );
}