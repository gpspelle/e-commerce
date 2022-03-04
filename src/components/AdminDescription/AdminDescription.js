import React, { useState, useEffect } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"

import { getAccountsFromDatabase } from "../../actions/database"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import scrollToTop from "../../utils/scrollToTop"
import Footer from "../Footer/Footer"
import NavigationBar from "../NavigationBar/NavigationBar"
import MemoizedProductContainer from "../ProductContainer/ProductContainer"
import AboutAdmin from "./AboutAdmin"
import SearchBar from "../SearchBar/SearchBar"

export default function AdminDescription() {
  const location = useLocation()
  const { id } = useParams()
  const { width } = useWindowDimensions()
  const [accountsData, setAccountsData] = useState({
    accountsPagination: { key: undefined, fetch: true },
    accounts: [],
  })

  const { accounts, accountsPagination } = accountsData

  useEffect(() => {
    scrollToTop()

    if (location.state) {
      setAccountsData({
        accounts: [
          {
            name: location.state.name,
            phone_number: location.state.phone_number,
            commercial_name: location.state.commercial_name,
            crop_profile_photo: location.state.crop_profile_photo,
            about_me: location.state.about_me,
            about_products: location.state.about_products,
          },
        ],
        accountsPagination: { key: undefined, fetch: false },
      })
    } else {
      getAccountsFromDatabase({ setAccountsData, productOwnerIds: [id] })
    }
  }, [])

  var name,
    phone_number,
    commercial_name,
    crop_profile_photo,
    about_me,
    about_products

  if (accounts.length > 0) {
    // eslint-disable-next-line prettier/prettier
    ;({
      name,
      phone_number,
      commercial_name,
      crop_profile_photo,
      about_me,
      about_products,
    } = accounts[0])
  }

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Container>
        <AboutAdmin
          isComplete={false}
          phoneNumber={phone_number}
          productOwnerName={name}
          commercialName={commercial_name}
          productOwnerId={id}
          cropProfilePhoto={crop_profile_photo}
          screenWidth={width}
        />
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
