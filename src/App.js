import React, { lazy, Suspense } from "react"
import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import {
  DEALS,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PRODUCT_DESCRIPTION,
} from "./constants/constants"
import useWindowDimensions from "./hooks/useWindowDimensions"
import MemoizedProductContainer from "./components/ProductContainer/ProductContainer"
import "./react-bootstrap.min.css"

const ProductDescription = lazy(() =>
  import("./components/ProductDescription/ProductDescription")
)
const ProductDescriptionMobile = lazy(() =>
  import("./components/ProductDescriptionMobile/ProductDescriptionMobile")
)

function App() {
  const { width } = useWindowDimensions()

  /*if (process.env.NODE_ENV !== "production") {
    const { whyDidYouUpdate } = require("why-did-you-update")
    whyDidYouUpdate(React)
  }*/

  return (
    <div style={{ paddingTop: "30px" }}>
      <Router>
        <NavigationBar />
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
              {width < 1024 ? <ProductDescriptionMobile /> : <ProductDescription />}
            </Route>
            <Route path={`/${DEALS}`}>
              <MemoizedProductContainer isDeals={true} />
            </Route>
            <Route path="/">
              <MemoizedProductContainer isDeals={false} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
      <DocumentMeta
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        meta={{
          charset: "utf-8",
        }}
      />
    </div>
  )
}

export default App
