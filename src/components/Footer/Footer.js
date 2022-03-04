import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

import { APP_NAME, NAVIGATION_LINKS } from "../../constants/constants"

export default function Footer() {
  return (
    <div className="primary-background" style={{ width: "100%" }}>
      <Container
        style={{
          justifyContent: "left",
          display: "inline-grid",
        }}
      >
        <div style={{ paddingTop: "32px", paddingBottom: "16px" }}>
          <h6
            className="light-color font-face-poppins-bold"
            style={{ display: "inline-block" }}
          >
            {APP_NAME}
          </h6>
        </div>
        {Object.keys(NAVIGATION_LINKS).map((page) => {
          return (
            <Link
              key={page}
              to={NAVIGATION_LINKS[page]}
              className="light-color"
              style={{
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              <p style={{ marginBottom: "8px" }}>{page}</p>
            </Link>
          )
        })}
      </Container>
    </div>
  )
}
