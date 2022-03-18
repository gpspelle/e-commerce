import React from "react"
import { Container } from "react-bootstrap"
import { HERO_HEADER_TEXT, LARGE_SCREEN } from "../../constants/constants"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import SearchBar from "../SearchBar/SearchBar"

export default function HeroHeader() {
  const { width } = useWindowDimensions()

  var fontSize
  if (width > LARGE_SCREEN) {
    fontSize = "48px"
  } else if (width > 500) {
    fontSize = "32px"
  } else {
    fontSize = ""
  }

  return (
    <div
      style={{
        paddingTop: "32px",
        backgroundImage: `url("/hero-header.png")`,
        backgroundRepeat: "round",
        marginBottom: "32px",
        marginLeft: "0px",
        marginRight: "0px",
        maxWidth: "100%",
        backgroundSize: `${width}px`,
        paddingBottom: "0.1px", // this is required otherwise there's no space below the search bar
        height: "100%",
      }}
    >
      <Container>
        <div style={{ maxWidth: width < LARGE_SCREEN ? "100%" : "60%" }}>
          <h6 style={{ fontSize }} className="font-face-poppins-bold light-color">
            {HERO_HEADER_TEXT}
          </h6>
        </div>
        <SearchBar isHeroHeader />
      </Container>
    </div>
  )
}
