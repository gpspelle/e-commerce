import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useParams } from "react-router-dom";

export default function ProductDescription() {
    const { name } = useParams();
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
          <h3>{name}</h3>
        </div>
    );
}