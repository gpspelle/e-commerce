import React from "react"
import { Card, Button, Col, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { LARGE_SCREEN } from "../../constants/constants"

export default function NoProductFoundMessage({
  screenWidth,
  hasMoreDataToFetch,
  searchBarValue,
  isDeals,
}) {
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    history.push({
      pathname: "/",
    })
  }

  return (
    <Col
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "32px",
      }}
    >
      {hasMoreDataToFetch ? (
        <div
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ margin: "auto", display: "flex" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Card
          style={{
            width: screenWidth < LARGE_SCREEN ? "100%" : "24rem",
            border: "none",
          }}
        >
          <Card.Img
            variant="top"
            src="/not-found-dog.png"
            style={{ height: "50vh", objectFit: "contain" }}
          />
          <Card.Body>
            <div style={{ textAlign: "center" }}>
              <Card.Text>
                {isDeals
                  ? "Não existem ofertas disponíveis"
                  : "Não encontramos nenhum produto"}{" "}
              </Card.Text>
              {!isDeals && (
                <div style={{ margin: "10px auto", fontWeight: "bold" }}>
                  {searchBarValue}
                </div>
              )}
              <Card.Text>
                Para voltar à página inicial, clique no botão abaixo
              </Card.Text>
            </div>
            <Button
              className="my-2 primary-background no-border"
              onClick={handleClick}
              style={{ width: "100%" }}
              variant="primary"
            >
              Voltar
            </Button>
          </Card.Body>
        </Card>
      )}
    </Col>
  )
}
