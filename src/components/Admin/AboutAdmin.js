import React from "react"
import { Col, Row } from "react-bootstrap"

import "./AboutAdmin.css"
import AdminContact from "./AdminContact"
import AdminSeeMoreLink from "./AdminSeeMoreLink"
import AdminAvatar from "./AdminAvatar"

export default function AboutAdmin({ account, screenWidth, isComplete }) {
  const imageSize = Math.min(screenWidth * 0.25, 142)
  const isCompleteDiff = {
    rowMarginBottom: isComplete ? "16px" : "0px",
    content: isComplete ? (
      <Col className="line-clamp">
        <p style={{ marginBottom: "0px" }}>{account.about_me}</p>
      </Col>
    ) : (
      <Col>
        <p>{account.name}</p>
      </Col>
    ),
    links: isComplete ? (
      <AdminSeeMoreLink account={account} />
    ) : (
      <AdminContact account={account} />
    ),
  }

  return (
    <Row style={{ marginBottom: isCompleteDiff.rowMarginBottom }}>
      <Col style={{ maxWidth: "30%" }}>
        <AdminAvatar
          src={account.crop_profile_photo}
          imageSize={imageSize}
          account={account}
        />
      </Col>
      <Col style={{ maxWidth: "70%" }}>
        <Row>
          <Col>
            <h6 className="font-face-poppins-bold">{account.commercial_name}</h6>
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
