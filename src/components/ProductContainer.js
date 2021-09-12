import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "./Product";

export default function ProductContainer() {
    return (
        <Container>
            <Row>
                <Col>
                    <Product 
                        identifier="Product 1"
                        description="Product 1 small description"
                        price="10"
                        detailURL="product-1"/>
                </Col>
                <Col>
                    <Product 
                        identifier="Product 2"
                        description="Product 2 small description"
                        price="20"
                        detailURL="product-2"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Product 
                        identifier="Product 3"
                        description="Product 3 small description"
                        price="30"
                        detailURL="product-3"/>
                </Col>
                <Col>
                    <Product 
                        identifier="Product 4"
                        description="Product 4 small description"
                        price="40"
                        detailURL="product-4"/>
                </Col>
            </Row>
        </Container>
    );
}