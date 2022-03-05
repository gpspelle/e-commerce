import React from "react"
import { Button } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"

export default function SearchBarButton({ color, backgroundColor }) {
  return (
    <Button
      type="submit"
      className={`${color} ${backgroundColor}`}
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
