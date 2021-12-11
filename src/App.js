import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { PRODUCT_DESCRIPTION } from "./components/Product/Product"
import ProductContainer from "./components/ProductContainer/ProductContainer"
import ProductDescription from "./components/ProductDescription/ProductDescription"

function App() {
  return (
    <Router>
      <Switch>
        <Route path={`/${PRODUCT_DESCRIPTION}/:id`}>
          <ProductDescription />
        </Route>
        <Route path="/">
          <ProductContainer />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
