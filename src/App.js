import React, { lazy, Suspense } from "react"
import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import useWindowDimensions from "./hooks/useWindowDimensions"
import {
  ABOUT_US,
  ADMIN_DESCRIPTION,
  DEALS,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PRODUCTS,
  PRODUCT_DESCRIPTION,
} from "./constants/constants"
import MemoizedProductContainer from "./components/ProductContainer/ProductContainer"
import Home from "./components/Home/Home"
import AdminDescription from "./components/AdminDescription/AdminDescription"
import AboutUs from "./components/AboutUs/AboutUs"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import Footer from "./components/Footer/Footer"

const ProductDescription = lazy(() =>
  import("./components/ProductDescription/ProductDescription")
)
const ProductDescriptionMobile = lazy(() =>
  import("./components/ProductDescriptionMobile/ProductDescriptionMobile")
)

function App() {
  const { width, height } = useWindowDimensions()

  /*if (process.env.NODE_ENV !== "production") {
    const { whyDidYouUpdate } = require("why-did-you-update")
    whyDidYouUpdate(React)
  }*/

  return (
    <div style={{ paddingTop: "30px" }}>
      <Router>
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
              {width < 1024 ? <ProductDescriptionMobile /> : <ProductDescription />}
            </Route>
            <Route path={`/:id/${ADMIN_DESCRIPTION}`}>
              <AdminDescription />
            </Route>
            <Route path={`/${DEALS}`}>
              <NavigationBar />
              <MemoizedProductContainer isDeals={true} paddingTop={"62px"} />
              <Footer />
            </Route>
            <Route path={`/${PRODUCTS}`}>
              <NavigationBar />
              <MemoizedProductContainer isDeals={false} paddingTop={"62px"} />
              <Footer />
            </Route>
            <Route path={`/${ABOUT_US}`}>
              <AboutUs />
            </Route>
            <Route path="/">
              <Home screenWidth={width} screenHeight={height} />
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
