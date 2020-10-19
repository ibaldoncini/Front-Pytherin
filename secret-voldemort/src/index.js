import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import Register from "./registerPage";

const Root = (
      <Register />
)

const rootElement = document.getElementById("root");
ReactDOM.render(Root,rootElement);
