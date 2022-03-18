import React, { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import SearchBarButton from "../SearchBarButton/SearchBarButton"
import { LARGE_SCREEN, PRODUCTS } from "../../constants/constants"
import "./SearchBar.css"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function SearchBar({ isHeroHeader }) {
  const history = useHistory()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [searchBarValue, setSearchBarValue] = useState("")
  const { width } = useWindowDimensions()

  const isSearchBarEmpty = searchBarValue === ""

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

  const backgroundColor = isHeroHeader ? "light-background" : "light-dark-background"
  const color = !isSearchBarEmpty ? "dark-color" : "grey-dark-color"

  const searchBarCoreContent = (
    <Form style={{ display: "flex" }} onSubmit={applySearchOnProducts}>
      <Form.Group controlId="formSearchBar" style={{ width: "100%" }}>
        <div
          className={`search-input-div ${backgroundColor}`}
          style={{ borderRadius: "8px" }}
        >
          <input
            className={
              !isSearchBarEmpty
                ? `${backgroundColor} specific-form-control font-face-poppins-italic remove-focus-search-bar`
                : `${backgroundColor} grey-dark-color specific-form-control font-face-poppins-italic`
            }
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e.target.value)}
            type="text"
            placeholder="O que você está buscando?"
            // this is required or safari on iOS will
            // zoom into the input field
            style={{ fontSize: "16px" }}
          />
          <SearchBarButton color={color} backgroundColor={backgroundColor} />
        </div>
      </Form.Group>
    </Form>
  )

  if (isHeroHeader) {
    return (
      <div
        style={{
          position: "relative",
          marginTop: "16px",
          maxWidth: width < LARGE_SCREEN ? "100%" : "60%",
          marginBottom: "32px",
        }}
      >
        {searchBarCoreContent}
      </div>
    )
  }
  return (
    <Container
      style={{
        position: "relative",
        marginTop: "16px",
        maxWidth: width < LARGE_SCREEN ? "100%" : "",
        marginBottom: "32px",
      }}
    >
      {searchBarCoreContent}
    </Container>
  )
}
