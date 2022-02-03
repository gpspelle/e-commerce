import React from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ADMIN_DESCRIPTION } from "../../constants/constants"
import "./AboutAdmin.css"

export default function AboutAdmin({
  productOwnerName,
  commercialName,
  productOwnerId,
  cropProfilePhoto,
  aboutMe,
  screenWidth,
  aboutProducts,
  isComplete,
}) {
  const imageSize = Math.min(screenWidth * 0.25, 142)
  if (isComplete) {
    return (
      <Row style={{ marginBottom: "16px" }}>
        <Col style={{ maxWidth: "30%" }}>
          <img
            style={{
              width: imageSize,
              height: imageSize,
              objectFit: "contain",
              backgroundColor: "#F4F4F4",
              borderRadius: 500,
            }}
            src={cropProfilePhoto || "/user.jpeg"}
          />
        </Col>
        <Col style={{ maxWidth: "70%" }}>
          <Row>
            <Col>
              <h6>{commercialName}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="line-clamp">{aboutMe}</Col>
          </Row>
          <Row>
            <Col>
              <Link
                to={{
                  pathname: `/${productOwnerId}/${ADMIN_DESCRIPTION}`,
                  state: {
                    name: productOwnerName,
                    commercial_name: commercialName,
                    crop_profile_photo: cropProfilePhoto,
                    about_me: aboutMe,
                    about_products: aboutProducts,
                  },
                }}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  float: "right",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                Ver mais
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col style={{ maxWidth: "30%" }}>
        <img
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: "contain",
            backgroundColor: "#F4F4F4",
            borderRadius: 500,
          }}
          src={cropProfilePhoto || "/user.jpeg"}
        />
      </Col>
      <Col style={{ maxWidth: "70%" }}>
        <Row>
          <Col>
            <h4>{commercialName}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>{productOwnerName}</h6>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
