import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from "./register"

const Root = (
      <Router>
        <Switch>
          <Route path='/register' exact render={() => <Register/>} />
          <Route path='/index' exact />
        </Switch>
      </Router>
)

const rootElement = document.getElementById("root")
ReactDOM.render(Root,rootElement)
