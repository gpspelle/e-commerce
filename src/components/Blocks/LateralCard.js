import React from "react"
import { Col, Row } from "react-bootstrap"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"

export const LateralCard = ({
  smallSrc,
  src,
  title,
  text,
  imagePosition,
  imageSize,
}) => {
  return imagePosition === "left" ? (
    <Row style={{ marginBottom: "16px", width: "100%" }}>
      <Col style={{ minWidth: src === undefined ? "100%" : "30%" }}>
        {src !== undefined && (
          <ProgressiveBlurryImageLoad
            small={smallSrc}
            large={src}
            height={imageSize}
            width={imageSize}
          />
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
          <ProgressiveBlurryImageLoad
            small={smallSrc}
            large={src}
            height={imageSize}
            width={imageSize}
          />
        )}
      </Col>
    </Row>
  )
}
