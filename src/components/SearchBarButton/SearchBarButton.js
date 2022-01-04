import React from "react"
import { Button } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"

export default function SearchBarButton() {
  return (
    <Button
      type="submit"
      style={{
        backgroundColor: "white",
        color: "#212529",
        borderColor: "none",
        border: "none",
        marginLeft: "2px",
      }}
    >
      <AiOutlineSearch />
    </Button>
  )
}
