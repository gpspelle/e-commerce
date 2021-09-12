import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PRODUCT_DESCRIPTION } from "./components/Product";
import ProductContainer from './components/ProductContainer';
import ProductDescription from "./components/ProductDescription";

function App() {
  return (
    <Router>
        <Switch>
          <Route path={`/${PRODUCT_DESCRIPTION}/:name`}>
            <ProductDescription />
          </Route>
          <Route path="/">
            <ProductContainer />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
