import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import ProductContainer from "./components/ProductContainer/ProductContainer"
import ProductDescription from "./components/ProductDescription/ProductDescription"
import {
  DEALS,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PRODUCT_DESCRIPTION,
} from "./constants/constants"

const meta = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  meta: {
    charset: "utf-8",
  },
}

function App() {
  return (
    <div style={{ paddingTop: "30px" }}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
            <ProductDescription />
          </Route>
          <Route path="/">
            <ProductContainer />
          </Route>
          <Route path={`/${DEALS}`}>
            <ProductContainer />
          </Route>
        </Switch>
      </Router>
      <DocumentMeta {...meta} />
    </div>
  )
}

export default App
