import React, { useState } from "react"
import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import ProductContainer from "./components/ProductContainer/ProductContainer"
import ProductDescription from "./components/ProductDescription/ProductDescription"
import ProductDescriptionMobile from "./components/ProductDescriptionMobile/ProductDescriptionMobile"
import {
  DEALS,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PRODUCT_DESCRIPTION,
} from "./constants/constants"
import useWindowDimensions from "./hooks/useWindowDimensions"

const meta = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  meta: {
    charset: "utf-8",
  },
}

function App() {
  const [searchBarValue, setSearchBarValue] = useState("")
  const { width } = useWindowDimensions()
  return (
    <div style={{ paddingTop: "30px" }}>
      <Router>
        <NavigationBar
          searchBarValue={searchBarValue}
          setSearchBarValue={setSearchBarValue}
        />
        <Switch>
          <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
            {width < 1024 ? <ProductDescriptionMobile /> : <ProductDescription />}
          </Route>
          <Route path={`/${DEALS}`}>
            <ProductContainer isDeals={true} setSearchBarValue={setSearchBarValue} />
          </Route>
          <Route path="/">
            <ProductContainer
              isDeals={false}
              setSearchBarValue={setSearchBarValue}
            />
          </Route>
        </Switch>
      </Router>
      <DocumentMeta {...meta} />
    </div>
  )
}

export default App
