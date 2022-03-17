import React from "react"
import { Container } from "react-bootstrap"
import { HERO_HEADER_TEXT } from "../../constants/constants"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import SearchBar from "../SearchBar/SearchBar"

export default function HeroHeader() {
  const { width, height } = useWindowDimensions()

  if (width < 811) {
    return (
      <Container
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
        <div style={{ maxWidth: "100%" }}>
          <h6
            style={{ fontSize: width > 500 ? "32px" : "" }}
            className="font-face-poppins-bold light-color"
          >
            {HERO_HEADER_TEXT}
          </h6>
        </div>
        <SearchBar isHeroHeader />
      </Container>
    )
  }

  return <SearchBar />
}
