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
          paddingLeft: "32px",
        }}
      >
        <div style={{ paddingTop: "16px", paddingBottom: "8px" }}>
          <h2 style={{ color: "#fff", display: "inline-block" }}>{APP_NAME}</h2>
        </div>
        {Object.keys(NAVIGATION_LINKS).map((page) => {
          return (
            <Link
              key={page}
              to={NAVIGATION_LINKS[page]}
              style={{
                color: "#fff",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              <p>{page}</p>
            </Link>
          )
        })}
      </Container>
    </div>
  )
}
