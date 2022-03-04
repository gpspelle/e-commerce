import React from "react"
import { Button } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"

export default function SearchBarButton() {
  return (
    <Button
      type="submit"
      className="light-dark-background dark-color"
      style={{
        borderColor: "none",
        border: "none",
        marginLeft: "8px",
      }}
    >
      <AiOutlineSearch />
    </Button>
  )
}
