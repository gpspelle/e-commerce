import React from "react"
import { Col, Form } from "react-bootstrap"

export default function SearchBar({ searchBarValue, setSearchBarValue }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault()
    }
  }

  return (
    <div
      className="justify-content-md-center"
      style={{
        backgroundColor: "#F0F0F0",
        height: "54px",
        position: "fixed",
        top: "0px",
        width: "100%",
      }}
    >
      <Col md="auto">
        <Form
          onKeyDown={(e) => {
            handleKeyDown(e)
          }}
        >
          <Form.Group controlId="formSearchBar">
            <Form.Control
              style={{ margin: "10px auto", width: "70%" }}
              value={searchBarValue}
              onChange={(e) => setSearchBarValue(e.target.value)}
              type="text"
              placeholder="Pesquisar..."
            />
          </Form.Group>
        </Form>
      </Col>
    </div>
  )
}
