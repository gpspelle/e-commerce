import React from "react"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"

import useWindowDimensions from "../../hooks/useWindowDimensions"
import { APP_NAME, NAVIGATION_LINKS } from "../../constants/constants"
import SearchBar from "../SearchBar/SearchBar"
import "./NavigationBar.css"

export default function NavigationBar() {
  const { width } = useWindowDimensions()

  return (
    <Navbar
      expand={false}
      collapseOnSelect
      fixed="top"
      bg="dark"
      variant="dark"
      style={{ height: width < 1024 ? "100px" : "55px" }}
    >
      <Container fluid style={{ position: "absolute", top: "10px" }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              {Object.keys(NAVIGATION_LINKS).map((page) => {
                return (
                  <Nav.Link
                    key={page}
                    className="navigation-link"
                    href={NAVIGATION_LINKS[page]}
                  >
                    <h7>{page}</h7>
                  </Nav.Link>
                )
              })}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <SearchBar screenWidth={width} />
        <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
