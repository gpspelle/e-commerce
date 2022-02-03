import React, { lazy, Suspense } from "react"
import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import {
  ABOUT_US,
  ADMIN_DESCRIPTION,
  DEALS,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PRODUCTS,
  PRODUCT_DESCRIPTION,
} from "./constants/constants"
import useWindowDimensions from "./hooks/useWindowDimensions"
import MemoizedProductContainer from "./components/ProductContainer/ProductContainer"
import HomeMobile from "./components/HomeMobile/HomeMobile"
import AdminDescriptionMobile from "./components/AdminDescriptionMobile/AdminDescriptionMobile"
import Footer from "./components/Footer/Footer"
import AboutUs from "./components/AboutUs/AboutUs"

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
        <NavigationBar />
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
              {width < 1024 ? <ProductDescriptionMobile /> : <ProductDescription />}
            </Route>
            <Route path={`/:id/${ADMIN_DESCRIPTION}`}>
              <AdminDescriptionMobile />
            </Route>
            <Route path={`/${DEALS}`}>
              <MemoizedProductContainer isDeals={true} paddingTop={"62px"} />
            </Route>
            <Route path={`/${PRODUCTS}`}>
              <MemoizedProductContainer isDeals={false} paddingTop={"62px"} />
            </Route>
            <Route path={`/${ABOUT_US}`}>
              <AboutUs />
            </Route>
            <Route path="/">
              <HomeMobile screenWidth={width} screenHeight={height} />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
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
