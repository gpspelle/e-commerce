import DocumentMeta from "react-document-meta"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { PRODUCT_DESCRIPTION } from "./components/Product/Product"
import ProductContainer from "./components/ProductContainer/ProductContainer"
import ProductDescription from "./components/ProductDescription/ProductDescription"
import { PAGE_DESCRIPTION, PAGE_TITLE } from "./constants/constants"

const meta = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  meta: {
    charset: "utf-8",
  },
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={`/:id/${PRODUCT_DESCRIPTION}`}>
            <ProductDescription />
          </Route>
          <Route path="/">
            <ProductContainer />
          </Route>
        </Switch>
      </Router>
      <DocumentMeta {...meta} />
    </div>
  )
}

export default App
