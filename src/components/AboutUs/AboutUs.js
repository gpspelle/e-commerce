import React, { useState, useEffect, useRef } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useLocation } from "react-router"
import { getAccountsFromDatabase } from "../../actions/database"
import { APP_NAME } from "../../constants/constants"
import scrollToTop from "../../utils/scrollToTop"
import AdminHomeMobile from "../AdminHomeMobile/AdminHomeMobile"
import { LateralCard } from "../Blocks/LateralCard"

export default function AboutUs() {
  const location = useLocation()
  const adminsRef = useRef()
  const [accounts, setAccounts] = useState(undefined)

  useEffect(() => {
    if (location.state) {
      setAccounts(location.state.accounts)
      window.scrollTo(0, adminsRef.current.offsetTop)
    } else {
      scrollToTop()
      getAccountsFromDatabase({ setAccounts })
    }
  }, [])

  return (
    <Container style={{ paddingTop: "82px" }}>
      <Row>
        <Col>
          <h4>Sobre o projeto</h4>
        </Col>
      </Row>
      <LateralCard
        imageSize={120}
        imagePosition="left"
        src="/about-us.png"
        text={`A ${APP_NAME} surgiu como uma ideia para reunir arteãos de Araras e ajudá-los a oferecer seus produtos e serviços por meio de uma plataforma unificada.`}
      />
      <LateralCard
        imageSize={120}
        imagePosition="right"
        text="Todos os produtos são feitos carinhosamente e são vendidos à pronta entrega ou sob encomenda."
      />
      <Row ref={adminsRef} style={{ paddingTop: "16px" }}>
        <Col>
          <h4 style={{ marginBottom: "0px" }}>Nossos artesãos</h4>
        </Col>
      </Row>
      {/* TODO: this implies that there are at least two rows of admins
       with 144 px each */}
      <Row style={{ minHeight: 144 * 2 }}>
        {accounts &&
          accounts.map((account) => {
            return (
              <Col
                key={account.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "12px",
                }}
              >
                <AdminHomeMobile account={account} />
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}