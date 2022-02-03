import React from "react"
import { Col, Row } from "react-bootstrap"

export const LateralCard = ({ src, title, text, imagePosition, imageSize }) => {
  return imagePosition === "left" ? (
    <Row style={{ marginBottom: "16px", width: "100%" }}>
      <Col style={{ minWidth: src === undefined ? "100%" : "30%" }}>
        {src !== undefined && (
          <img
            src={src}
            style={{ width: imageSize, height: imageSize, objectFit: "contain" }}
          ></img>
        )}
      </Col>
      <Col style={{ minWidth: "60%", margin: "auto" }}>
        <h5 style={{ margin: "0px" }}>{title}</h5>
        <p style={{ margin: "0px", fontSize: "14px" }}>{text}</p>
      </Col>
    </Row>
  ) : (
    <Row style={{ marginBottom: "16px", width: "100%" }}>
      <Col style={{ minWidth: "60%", margin: "auto" }}>
        <h5 style={{ margin: "0px" }}>{title}</h5>
        <p style={{ margin: "0px", fontSize: "14px" }}>{text}</p>
      </Col>
      <Col style={{ minWidth: src === undefined ? "100%" : "30%" }}>
        {src !== undefined && (
          <img
            src={src}
            style={{ width: imageSize, height: imageSize, objectFit: "contain" }}
          ></img>
        )}
      </Col>
    </Row>
  )
}
