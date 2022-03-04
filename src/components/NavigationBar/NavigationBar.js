import React from "react"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"

import { NAVIGATION_LINKS } from "../../constants/constants"
import "./NavigationBar.css"

export default function NavigationBar() {
  return (
    <Navbar
      className="light-background box-shadow"
      expand={false}
      collapseOnSelect
      style={{
        height: "55px",
      }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="font-face-poppins-bold"
              style={{
                paddingLeft: "27px",
                paddingTop: "32px",
              }}
              id="offcanvasNavbarLabel"
            >
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              {Object.keys(NAVIGATION_LINKS).map((page) => {
                return (
                  <Nav.Link
                    key={page}
                    className="navigation-link"
                    href={NAVIGATION_LINKS[page].path}
                  >
                    <div style={{ display: "flex" }}>
                      <img src={NAVIGATION_LINKS[page].icon} />
                      <p
                        className="dark-color"
                        style={{ marginBottom: "8px", marginTop: "8px" }}
                      >
                        &nbsp;&nbsp;&nbsp;{page}
                      </p>
                    </div>
                  </Nav.Link>
                )
              })}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
