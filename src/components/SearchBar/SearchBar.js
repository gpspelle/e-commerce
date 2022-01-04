import React from "react"
import { Container, Form } from "react-bootstrap"

export default function SearchBar({
  screenWidth,
  searchBarValue,
  setSearchBarValue,
}) {
  return (
    <Container
      style={{
        position: "fixed",
        width: screenWidth < 1024 ? "100%" : "40%",
        left: screenWidth < 1024 ? 0 : (screenWidth - 200) / 3,
        top: screenWidth < 1024 ? 56 : 0,
        paddingLeft: screenWidth < 1024 ? "2%" : 0,
        paddingRight: screenWidth < 1024 ? "2%" : 0,
        marginTop: screenWidth < 1024 ? 0 : 8,
        maxWidth: "100%",
      }}
    >
      <Form.Group controlId="formSearchBar">
        <Form.Control
          value={searchBarValue}
          onChange={(e) => setSearchBarValue(e.target.value)}
          type="text"
          placeholder="Pesquisar..."
        />
      </Form.Group>
    </Container>
  )
}
