import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDescription() {
    const { name } = useParams();
    return (
        <div>
          <h3>{name}</h3>
        </div>
    );
}