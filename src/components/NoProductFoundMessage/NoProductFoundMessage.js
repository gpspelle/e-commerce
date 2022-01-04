import React from "react"
import { Card, Button, Col, Spinner } from "react-bootstrap"
import { useHistory } from "react-router"

export default function NoProductFoundMessage({
  screenWidth,
  hasMoreDataToFetch,
  searchBarValue,
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
      }}
    >
      {hasMoreDataToFetch ? (
        <Spinner
          animation="border"
          role="status"
          style={{ position: "absolute", top: "50%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card
          style={{ width: screenWidth < 1024 ? "100%" : "24rem", border: "none" }}
        >
          <Card.Img
            variant="top"
            src="not-found-dog.png"
            style={{ height: "35vh" }}
          />
          <Card.Body>
            <Card.Text style={{ textAlign: "center" }}>
              {`Não encontramos nenhum produto relacionado à sua busca`}{" "}
              <div style={{ margin: "10px auto", fontWeight: "bold" }}>
                {searchBarValue}
              </div>
              {`Tente buscar com outras palavras
            ou clique em voltar.`}
            </Card.Text>
            <Button
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
