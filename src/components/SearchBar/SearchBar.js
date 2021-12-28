import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { pageStates } from "../ProductContainer/ProductContainer"
import {
  HomeButtonContent,
  LightingDealsButtonContent,
} from "../ButtonContent/ButtonContent"

export default function SearchBar({
  switchPage,
  setSwitchPage,
  searchBarValue,
  setSearchBarValue,
}) {
  const handleOpenLightingDeals = () => {
    setSwitchPage(pageStates.LIGHTING_DEALS)
    history.push({
      pathname: pageStates.LIGHTING_DEALS.pathname,
    })
  }

  const handleOpenAllProducts = () => {
    setSwitchPage(pageStates.HOME)
    history.push({
      pathname: pageStates.HOME.pathname,
    })
  }

  const history = useHistory()

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
      <Button
        onClick={
          switchPage.name === "LIGHTING_DEALS"
            ? handleOpenAllProducts
            : handleOpenLightingDeals
        }
        variant="success"
        style={{ float: "right", margin: "9px 30px" }}
      >
        {switchPage.name === "LIGHTING_DEALS" ? (
          <HomeButtonContent />
        ) : (
          <LightingDealsButtonContent />
        )}
      </Button>
    </div>
  )
}
