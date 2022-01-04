import React from "react"
import { Container, Form } from "react-bootstrap"
import SearchBarButton from "../SearchBarButton/SearchBarButton"
import { useHistory } from "react-router-dom"

export default function SearchBar({
  screenWidth,
  searchBarValue,
  setSearchBarValue,
}) {
  const history = useHistory()

  const applySearchOnProducts = (event) => {
    event.preventDefault()
    if (searchBarValue && searchBarValue.length > 0) {
      history.push({
        pathname: "/",
        search: `?q=${searchBarValue}`,
      })
    }
  }

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
      <Form style={{ display: "flex" }} onSubmit={applySearchOnProducts}>
        <Form.Group controlId="formSearchBar" style={{ width: "100%" }}>
          <Form.Control
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e.target.value)}
            type="text"
            placeholder="Pesquisar..."
          />
        </Form.Group>
        <SearchBarButton />
      </Form>
    </Container>
  )
}
