import React from "react"
import "./NavigationBar.css"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { DEALS } from "../../constants/constants"
import { AiFillThunderbolt } from "react-icons/ai"
import SearchBar from "../SearchBar/SearchBar"
import useWindowDimensions from "../../hooks/useWindowDimensions"

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
              <Nav.Link className="navigation-link" href="/">
                &nbsp;Todos os produtos
              </Nav.Link>
              <Nav.Link className="navigation-link" href={`/${DEALS}`}>
                &nbsp;Ofertas <AiFillThunderbolt />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <SearchBar screenWidth={width} />
        <Navbar.Brand href="/">Loja das Artes</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
