import React, { useState, useEffect } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"

import { getAccountsFromDatabase } from "../actions/database"
import useWindowDimensions from "../hooks/useWindowDimensions"
import scrollToTop from "../utils/scrollToTop"
import Footer from "../components/Footer/Footer"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import MemoizedProductContainer from "../components/Product/ProductContainer"
import AboutAdmin from "../components/Admin/AboutAdmin"
import SearchBar from "../components/Search/SearchBar"

export default function AdminPage() {
  const location = useLocation()
  const { id } = useParams()
  const { width } = useWindowDimensions()
  const [accountsData, setAccountsData] = useState({
    accountsPagination: { key: undefined, fetch: true },
    accounts: [],
  })

  const { accounts } = accountsData

  useEffect(() => {
    scrollToTop()

    if (location.state) {
      setAccountsData({
        accounts: [
          {
            ...location.state,
          },
        ],
        accountsPagination: { key: undefined, fetch: false },
      })
    } else {
      getAccountsFromDatabase({ setAccountsData, productOwnerIds: [id] })
    }
  }, [])

  var about_me, about_products

  if (accounts.length > 0) {
    // eslint-disable-next-line prettier/prettier
    ;({ about_me, about_products } = accounts[0])
  } else {
    return <></>
  }

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Container>
        <AboutAdmin isComplete={false} account={accounts[0]} screenWidth={width} />
        <h6
          className="font-face-poppins-bold"
          style={{ marginTop: "32px", marginBottom: "8px" }}
        >
          Meus produtos
        </h6>
        <MemoizedProductContainer
          isDeals={false}
          paddingTop={"0px"}
          filterByAdmin={id}
        />
        {(about_me || about_products) && (
          <>
            <h6 style={{ marginTop: "32px" }} className="font-face-poppins-bold">
              Um pouco da minha história
            </h6>
            <p style={{ marginBottom: "8px" }}>{about_me}</p>
            <p>{about_products}</p>
          </>
        )}
      </Container>
      <Footer />
    </>
  )
}
