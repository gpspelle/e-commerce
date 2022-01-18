import React from "react"
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
import ProductDescription from "./components/ProductDescription/ProductDescription"
import ProductDescriptionMobile from "./components/ProductDescriptionMobile/ProductDescriptionMobile"
import Loadable from "react-loadable"
import "./react-bootstrap.min.css"

const meta = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  meta: {
    charset: "utf-8",
  },
}

function App() {
  const { width } = useWindowDimensions()

  /*if (process.env.NODE_ENV !== "production") {
    const { whyDidYouUpdate } = require("why-did-you-update")
    whyDidYouUpdate(React)
  }*/

  const LoadableProductDescriptionMobile = Loadable({
    loader: () =>
      import("./components/ProductDescriptionMobile/ProductDescriptionMobile"),
    render(loaded) {
      let Component = loaded.default
      return <Component />
    },
    loading: ProductDescriptionMobile,
  })

  const LoadableProductDescription = Loadable({
    loader: () => import("./components/ProductDescription/ProductDescription"),
    render(loaded) {
      let Component = loaded.default
      return <Component />
    },
    loading: ProductDescription,
  })

  const LoadableProductContainerDeals = Loadable({
    loader: () => import("./components/ProductContainer/ProductContainer"),
    render(loaded) {
      let Component = loaded.default
      return <Component isDeals={true} />
    },
    loading: MemoizedProductContainer,
  })

  const LoadableProductContainer = Loadable({
    loader: () => import("./components/ProductContainer/ProductContainer"),
    render(loaded) {
      let Component = loaded.default
      return <Component isDeals={false} />
    },
    loading: MemoizedProductContainer,
  })

  return (
    <div style={{ paddingTop: "30px" }}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
            {width < 1024 ? (
              <LoadableProductDescriptionMobile />
            ) : (
              <LoadableProductDescription />
            )}
          </Route>
          <Route path={`/${DEALS}`}>
            <LoadableProductContainerDeals />
          </Route>
          <Route path="/">
            <LoadableProductContainer />
          </Route>
        </Switch>
      </Router>
      <DocumentMeta {...meta} />
    </div>
  )
}

export default App
