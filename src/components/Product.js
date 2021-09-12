import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export const PRODUCT_DESCRIPTION = "product-description";

export default function Product({ identifier, description, price }) {
     const history = useHistory();

    const openDetailPage = (event) => {
        console.log(event);
        history.push(`${PRODUCT_DESCRIPTION}/${identifier}`);
    }

    return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="artesanato.jpg" />
        <Card.Body>
            <Card.Title>{identifier}</Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <Button variant="primary" onClick={(event) => openDetailPage(event)}>Mais detalhes</Button>
            <Badge pill bg="success">
                {price} R$
            </Badge>
        </Card.Body>
    </Card>
    );
}
