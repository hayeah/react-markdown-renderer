let renderMarkdown = require("./render");
let compileMarkdown = require("./compile");
let React = require("react");
let ReactDOM = require("react-dom");



let App = React.createClass({
  getInitialState() {
    return {
      sections: [],
    };
  },

  componentDidMount() {
    let sockjs = new SockJS('/echo');

    sockjs.onopen = () => {
      console.log('[*] open', sockjs.protocol);
    };

    sockjs.onmessage = (e) => {
      let md = e.data;
      console.log('md', md);
      let sections = compileMarkdown(md);
      this.setState({sections});
    };

    sockjs.onclose   = function()  {
      console.log('[*] close');
    };
  },

  render() {
    let {sections} = this.state;
    let doc = renderMarkdown(sections)
    return doc;
  },
});

window.onload = () => {
  ReactDOM.render(<App/>, document.querySelector("#react-root"));
};