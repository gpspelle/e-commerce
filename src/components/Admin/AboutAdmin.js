import React from "react"
import { Col, Row } from "react-bootstrap"

import "./AboutAdmin.css"
import Image from "../Image/Image"
import AdminContact from "./AdminContact"
import AdminSeeMoreLink from "./AdminSeeMoreLink"

export default function AboutAdmin({
  productOwnerName,
  commercialName,
  phoneNumber,
  productOwnerId,
  cropProfilePhoto,
  aboutMe,
  screenWidth,
  aboutProducts,
  isComplete,
  facebookLink,
  instagramLink,
}) {
  const imageSize = Math.min(screenWidth * 0.25, 142)
  const isCompleteDiff = {
    rowMarginBottom: isComplete ? "16px" : "0px",
    content: isComplete ? (
      <Col className="line-clamp">
        <p style={{ marginBottom: "0px" }}>{aboutMe}</p>
      </Col>
    ) : (
      <Col>
        <p>{productOwnerName}</p>
      </Col>
    ),
    links: isComplete ? (
      <AdminSeeMoreLink
        productOwnerId={productOwnerId}
        productOwnerName={productOwnerName}
        phoneNumber={phoneNumber}
        commercialName={commercialName}
        cropProfilePhoto={cropProfilePhoto}
        aboutMe={aboutMe}
        aboutProducts={aboutProducts}
        facebookLink={facebookLink}
        instagramLink={instagramLink}
      />
    ) : (
      <AdminContact
        phoneNumber={phoneNumber}
        productOwnerId={productOwnerId}
        commercialName={commercialName}
        facebookLink={facebookLink}
        instagramLink={instagramLink}
      />
    ),
  }
  return (
    <Row style={{ marginBottom: isCompleteDiff.rowMarginBottom }}>
      <Col style={{ maxWidth: "30%" }}>
        <Image
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: "contain",
            backgroundColor: "#F4F4F4",
            borderRadius: 500,
          }}
          src={cropProfilePhoto}
          fallbackSrc="/user.png"
          key={cropProfilePhoto}
        />
      </Col>
      <Col style={{ maxWidth: "70%" }}>
        <Row>
          <Col>
            <h6 className="font-face-poppins-bold">{commercialName}</h6>
          </Col>
        </Row>
        <Row>{isCompleteDiff.content}</Row>
        <Row>
          <Col>{isCompleteDiff.links}</Col>
        </Row>
      </Col>
    </Row>
  )
}
