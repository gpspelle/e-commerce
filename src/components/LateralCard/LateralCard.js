import React from "react"
import { Col, Row } from "react-bootstrap"

import ProgressiveBlurryImageLoad from "../Image/ProgressiveBlurryImageLoad"

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
        <p className="font-face-poppins-bold" style={{ margin: "0px" }}>
          {title}
        </p>
        <p style={{ margin: "0px" }}>{text}</p>
      </Col>
    </Row>
  ) : (
    <Row style={{ marginBottom: "16px", width: "100%" }}>
      <Col style={{ minWidth: "60%", margin: "auto" }}>
        <p className="font-face-poppins-bold" style={{ margin: "0px" }}>
          {title}
        </p>
        <p style={{ margin: "0px" }}>{text}</p>
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
