let React = require("react");
let ReactDOM = require("react-dom");

import App from "./components/App";

window.onload = () => {
  ReactDOM.render(<App/>, document.querySelector("#react-root"));
};