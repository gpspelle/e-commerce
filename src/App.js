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
import MemoizedProductContainer from "./components/Product/ProductContainer"
import HomePage from "./Pages/HomePage"
import AdminPage from "./Pages/AdminPage"
import AboutUsPage from "./Pages/AboutUsPage"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import Footer from "./components/Footer/Footer"
import "./App.css"
import "./style/guidelines.css"
import SearchBar from "./components/Search/SearchBar"
import HeroHeader from "./components/HeroHeader/HeroHeader"
import ProductsPage from "./Pages/ProductsPage"

const ProductDescription = lazy(() => import("./Pages/ProductDescription"))
const ProductDescriptionMobile = lazy(() =>
  import("./Pages/ProductDescriptionMobile")
)

function App() {
  const { width, height } = useWindowDimensions()

  return (
    <div>
      <Router>
        <Suspense fallback={<div>Carregando...</div>}>
          <Switch>
            <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
              {width < 992 ? <ProductDescriptionMobile /> : <ProductDescription />}
            </Route>
            <Route path={`/:id/${ADMIN_DESCRIPTION}`}>
              <AdminPage />
            </Route>
            <Route path={`/${DEALS}`}>
              <ProductsPage isDeals={true} />
            </Route>
            <Route path={`/${PRODUCTS}`}>
              <ProductsPage isDeals={false} />
            </Route>
            <Route path={`/${ABOUT_US}`}>
              <AboutUsPage />
            </Route>
            <Route path="/">
              <HomePage screenWidth={width} screenHeight={height} />
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
