let renderMarkdown = require("./render");
let React = require("react");
let ReactDOM = require("react-dom");

// console.log(snakeCase);

// setInterval(() => {
//   console.log(new Date());
// },1000)

// function connect() {
//   let sockjs = new SockJS('/echo');


//   sockjs.onopen = () => {
//     console.log('[*] open', sockjs.protocol);
//   };

//   sockjs.onmessage = function(e) {
//     console.log('[.] message', e.data);
//   };

//   sockjs.onclose   = function()  {
//     console.log('[*] close');
//   };
// }

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

      let sections = JSON.parse(e.data);
      console.log('sections:', sections);
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