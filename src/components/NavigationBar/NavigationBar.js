import React from "react"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"

import { LARGE_SCREEN, NAVIGATION_LINKS } from "../../constants/constants"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import "./NavigationBar.css"

export default function NavigationBar() {
  const { width } = useWindowDimensions()
  return (
    <Navbar
      className="light-background box-shadow"
      expand="lg"
      collapseOnSelect
      style={{
        height: "55px",
      }}
    >
      <Container>
        {width >= LARGE_SCREEN ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav>
              {Object.keys(NAVIGATION_LINKS).map((page) => {
                return (
                  <Nav.Link
                    style={{
                      paddingLeft: "0px !important",
                    }}
                    key={page}
                    className="navigation-link"
                    href={NAVIGATION_LINKS[page].path}
                  >
                    <p
                      className="dark-color"
                      style={{ marginBottom: "8px", marginTop: "8px" }}
                    >
                      {page}
                    </p>
                  </Nav.Link>
                )
              })}
            </Nav>
          </>
        ) : (
          <>
            <Navbar.Toggle
              style={{ paddingLeft: "0px" }}
              aria-controls="responsive-navbar-nav"
            />

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
                        className="navigation-link-mobile"
                        href={NAVIGATION_LINKS[page].path}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ marginTop: "4px" }}>
                            {NAVIGATION_LINKS[page].icon}
                          </div>
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
          </>
        )}
      </Container>
    </Navbar>
  )
}
