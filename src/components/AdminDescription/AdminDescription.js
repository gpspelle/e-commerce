import React, { useState, useEffect, useRef } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom"
import { getAccountsFromDatabase } from "../../actions/database"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import scrollToTop from "../../utils/scrollToTop"
import Footer from "../Footer/Footer"
import NavigationBar from "../NavigationBar/NavigationBar"
import MemoizedProductContainer from "../ProductContainer/ProductContainer"
import SendMessageWhatsAppButton, {
  sendHelloWhatsAppMessage,
} from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import AboutAdmin from "./AboutAdmin"

export default function AdminDescription() {
  const location = useLocation()
  const { id } = useParams()
  const { width } = useWindowDimensions()
  const [accounts, setAccounts] = useState([
    {
      name: undefined,
      commercial_name: undefined,
      crop_profile_photo: undefined,
      about_me: undefined,
      about_products: undefined,
    },
  ])

  useEffect(() => {
    scrollToTop()

    if (location.state) {
      setAccounts([
        {
          name: location.state.name,
          commercial_name: location.state.commercial_name,
          crop_profile_photo: location.state.crop_profile_photo,
          about_me: location.state.about_me,
          about_products: location.state.about_products,
        },
      ])
    } else {
      getAccountsFromDatabase({ setAccounts, productOwnerIds: [id] })
    }
  }, [])

  const { name, commercial_name, crop_profile_photo, about_me, about_products } =
    accounts[0]

  return (
    <>
      <NavigationBar />
      <Container style={{ paddingTop: "82px" }}>
        <AboutAdmin
          isComplete={false}
          productOwnerName={name}
          commercialName={commercial_name}
          productOwnerId={id}
          cropProfilePhoto={crop_profile_photo}
          screenWidth={width}
        />
        {/*<Col>
        <SendMessageWhatsAppButton
          style={{
            paddingTop: "12px",
            marginBottom: "12px",
          }}
          messageFunction={() =>
            sendHelloWhatsAppMessage({ phoneNumber, commercialName })
          }
          phoneNumber={phoneNumber}
          commercialName={commercialName}
          text={"WhatsApp"}
        />
      </Col>*/}
        <h4 style={{ marginBottom: "0px", marginTop: "24px" }}>Meus produtos</h4>
        <MemoizedProductContainer
          isDeals={false}
          paddingTop={"0px"}
          filterByAdmin={id}
        />
        {about_me && (
          <Row style={{ marginTop: "12px" }}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Sobre mim</Card.Title>
                  <Card.Text>{about_me}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {about_products && (
          <Row style={{ marginTop: "12px", marginBottom: "12px" }}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Sobre os meus produtos</Card.Title>
                  <Card.Text>{about_products}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  )
}
