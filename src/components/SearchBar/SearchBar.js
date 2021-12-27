import React from "react"
import { Form } from "react-bootstrap"

export default function SearchBar({ searchBarValue, setSearchBarValue }) {
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        height: "54px",
        width: "100%",
        position: "fixed",
        top: "0px",
      }}
    >
      <Form onSubmit={() => {}}>
        <Form.Group controlId="formSearchBar">
          <Form.Control
            style={{ marginTop: "10px" }}
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e.target.value)}
            type="text"
            placeholder="Pesquisar..."
          />
        </Form.Group>
      </Form>
    </div>
  )
}
