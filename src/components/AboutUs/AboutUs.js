import React, { useState, useEffect, useRef } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"

import { getAccountsFromDatabase } from "../../actions/database"
import { APP_CITY, APP_NAME } from "../../constants/constants"
import scrollToTop from "../../utils/scrollToTop"
import AdminHome from "../AdminHome/AdminHome"
import Footer from "../Footer/Footer"
import NavigationBar from "../NavigationBar/NavigationBar"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"
import SearchBar from "../SearchBar/SearchBar"

export default function AboutUs() {
  const location = useLocation()
  const adminsRef = useRef()
  const [accountsData, setAccountsData] = useState({
    accountsPagination: { key: undefined, fetch: false },
    accounts: [],
  })

  const { accounts, accountsPagination } = accountsData

  useEffect(() => {
    if (location.state) {
      setAccountsData({
        ...accountsData,
        accounts: location.state.accounts,
        accountsPagination: { key: undefined, fetch: false },
      })
      window.scrollTo(0, adminsRef.current.offsetTop)
    } else {
      scrollToTop()
      setAccountsData({
        ...accountsData,
        accountsPagination: { key: undefined, fetch: true },
      })
    }
  }, [])

  useEffect(() => {
    if (accountsPagination.fetch) {
      getAccountsFromDatabase({ setAccountsData })
    }
  }, [accountsPagination])

  return (
    <>
      <NavigationBar />
      <SearchBar />
      <Container>
        <Row>
          <Col>
            <h6 className="font-face-poppins-bold" style={{ marginBottom: "16px" }}>
              Sobre o projeto
            </h6>
          </Col>
        </Row>
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}
        >
          <ProgressiveBlurryImageLoad
            small="/small-about-us.png"
            large="/about-us.png"
            height={240}
            width={240}
          />
        </div>
        <p>
          A {APP_NAME} surgiu como uma ideia para reunir artesãos de {APP_CITY} e
          ajudá-los a oferecer seus produtos e serviços por meio de uma plataforma
          unificada
        </p>
        <p>
          Todos os produtos são feitos carinhosamente e são vendidos à pronta entrega
          ou sob encomenda
        </p>
      </Container>
      <Container style={{ marginBottom: "32px" }} className="light-dark-background">
        <div>
          <Row ref={adminsRef} style={{ paddingTop: "16px" }}>
            <Col>
              <h6
                className="font-face-poppins-bold"
                style={{ marginBottom: "16px" }}
              >
                Nossos artesãos
              </h6>
            </Col>
          </Row>
          <Row style={{ minHeight: 288 }}>
            {accounts &&
              accounts.map((account) => {
                return (
                  <Col
                    key={account.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "16px",
                    }}
                  >
                    <div>
                      <AdminHome account={account} />
                      <p
                        style={{
                          fontSize: "12px",
                          lineHeight: "18px",
                          maxWidth: "120px",
                          marginTop: "4px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {account.commercial_name}
                      </p>
                    </div>
                  </Col>
                )
              })}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  )
}
