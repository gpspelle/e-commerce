import React, { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import SearchBarButton from "../SearchBarButton/SearchBarButton"
import { PRODUCTS } from "../../constants/constants"
import "./SearchBar.css"

export default function SearchBar({ screenWidth }) {
  const history = useHistory()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [searchBarValue, setSearchBarValue] = useState("")

  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }, [searchBarValue])

  const applySearchOnProducts = (event) => {
    event.preventDefault()
    if (searchBarValue && searchBarValue.length > 0) {
      history.push({
        pathname: screenWidth < 1024 ? `/${PRODUCTS}` : "/",
        search: `?q=${searchBarValue}`,
      })
    } else {
      setSearchBarValue("")
      history.push({
        pathname: screenWidth < 1024 ? `/${PRODUCTS}` : "/",
      })
    }
    setIsSubmitted(true)
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
            className={isSubmitted ? "remove-focus-search-bar" : ""}
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e.target.value)}
            type="text"
            placeholder="O que você está buscando?"
          />
        </Form.Group>
        <SearchBarButton />
      </Form>
    </Container>
  )
}
