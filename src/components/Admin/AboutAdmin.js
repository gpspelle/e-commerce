import React from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

import { ADMIN_DESCRIPTION } from "../../constants/constants"
import "./AboutAdmin.css"
import Image from "../Image/Image"
import AdminContact from "./AdminContact"

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
      <Link
        to={{
          pathname: `/${productOwnerId}/${ADMIN_DESCRIPTION}`,
          state: {
            name: productOwnerName,
            phone_number: phoneNumber,
            commercial_name: commercialName,
            crop_profile_photo: cropProfilePhoto,
            about_me: aboutMe,
            about_products: aboutProducts,
            facebook_link: facebookLink,
            instagram_link: instagramLink,
          },
        }}
        className="secondary-color more-button"
        style={{
          display: "inline-block",
          textDecoration: "none",
          float: "right",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        Ver mais
      </Link>
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
