import React, { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import SearchBarButton from "../SearchBarButton/SearchBarButton"
import { PRODUCTS } from "../../constants/constants"
import "./SearchBar.css"

export default function SearchBar() {
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
        pathname: `/${PRODUCTS}`,
        search: `?q=${searchBarValue}`,
      })
    } else {
      setSearchBarValue("")
      history.push({
        pathname: "/",
      })
    }
    setIsSubmitted(true)
  }

  return (
    <Container
      style={{
        position: "relative",
        marginTop: "16px",
        maxWidth: "100%",
        marginBottom: "32px",
      }}
    >
      <Form style={{ display: "flex" }} onSubmit={applySearchOnProducts}>
        <Form.Group controlId="formSearchBar" style={{ width: "100%" }}>
          <div className="search-input-div light-dark-background">
            <input
              className={
                isSubmitted
                  ? "light-dark-background specific-form-control font-face-poppins-italic remove-focus-search-bar"
                  : "light-dark-background specific-form-control font-face-poppins-italic"
              }
              value={searchBarValue}
              onChange={(e) => setSearchBarValue(e.target.value)}
              type="text"
              placeholder="O que você está buscando?"
            />
            <SearchBarButton />
          </div>
        </Form.Group>
      </Form>
    </Container>
  )
}
