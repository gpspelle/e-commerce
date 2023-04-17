import React from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

import { ADMIN_DESCRIPTION } from "../../constants/constants"
import { sendHelloWhatsAppMessage } from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import "./AboutAdmin.css"
import Image from "../Image/Image"

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
  if (isComplete) {
    return (
      <Row style={{ marginBottom: "16px" }}>
        <Col style={{ maxWidth: "30%" }}>
          <Image
            style={{
              width: imageSize,
              height: imageSize,
              objectFit: "contain",
              backgroundColor: "#F4F4F4",
              borderRadius: 500,
            }}
            src={cropProfilePhoto || "/user.png"}
            fallbackSrc="/user.png"
          />
        </Col>
        <Col style={{ maxWidth: "70%" }}>
          <Row>
            <Col>
              <p className="font-face-poppins-bold">{commercialName}</p>
            </Col>
          </Row>
          <Row>
            <Col className="line-clamp">
              <p style={{ marginBottom: "0px" }}>{aboutMe}</p>
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col style={{ maxWidth: "30%" }}>
        <Image
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: "contain",
            backgroundColor: "#F4F4F4",
            borderRadius: 500,
          }}
          src={cropProfilePhoto || "/user.png"}
          fallbackSrc="/user.png"
        />
      </Col>
      <Col style={{ maxWidth: "70%" }}>
        <Row>
          <Col>
            <h6 className="font-face-poppins-bold">{commercialName}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{productOwnerName}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {phoneNumber && (
              <img
                height="16px"
                width="16px"
                src="/whatsapp.svg"
                style={{ cursor: "pointer", marginRight: "16px" }}
                onClick={() =>
                  sendHelloWhatsAppMessage({
                    accountId: productOwnerId,
                    phoneNumber,
                    commercialName,
                  })
                }
                alt="whatsapp icon"
              />
            )}
            {facebookLink && (
              <img
                height="16px"
                width="16px"
                src="/facebook.svg"
                style={{ cursor: "pointer", marginRight: "16px" }}
                onClick={() => window.open(facebookLink, "_blank")}
                alt="facebook icon"
              />
            )}
            {instagramLink && (
              <img
                height="16px"
                width="16px"
                src="/instagram.svg"
                style={{ cursor: "pointer", marginRight: "16px" }}
                onClick={() => window.open(instagramLink, "_blank")}
                alt="instagram icon"
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
