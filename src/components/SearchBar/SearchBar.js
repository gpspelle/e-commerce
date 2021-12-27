import React from "react"
import { Col, Form } from "react-bootstrap"

export default function SearchBar({ searchBarValue, setSearchBarValue }) {
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
        <Form onSubmit={() => {}}>
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
