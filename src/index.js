import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./react-bootstrap.min.css"
import "./style/fonts/Poppins/Poppins-Regular.ttf"
import "./style/fonts/Poppins/Poppins-Bold.ttf"
import "./style/fonts/Poppins/Poppins-Italic.ttf"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
