import React from "react"
import { Form } from "react-bootstrap"

export default function SearchBar({ searchBarValue, setSearchBarValue }) {
  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        height: "54px",
        position: "fixed",
        top: "0px",
        width: "100%",
        zIndex: "2",
      }}
    >
      <Form.Group controlId="formSearchBar">
        <Form.Control
          style={{
            margin: "10px auto",
            width: "50%",
            top: "0px",
            position: "fixed",
            marginLeft: "30px",
          }}
          value={searchBarValue}
          onChange={(e) => setSearchBarValue(e.target.value)}
          type="text"
          placeholder="Pesquisar..."
        />
      </Form.Group>
    </div>
  )
}
