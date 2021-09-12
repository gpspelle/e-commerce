import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export default function Product() {
    return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="artesanato.jpg" />
        <Card.Body>
            <Card.Title>Produto</Card.Title>
            <Card.Text>
                Uma breve descrição do produto
            </Card.Text>
            <Button variant="primary">Mais detalhes</Button>
            <Badge pill bg="success">
                Preço
            </Badge>
        </Card.Body>
    </Card>
    );
}
