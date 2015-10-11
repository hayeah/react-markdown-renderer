let renderMarkdown = require("./render");
let compileMarkdown = require("./compile");
let React = require("react");
let ReactDOM = require("react-dom");

let App = React.createClass({
  getInitialState() {
    return {
      lang: "default",
      src: "",
    };
  },

  componentDidMount() {
    let sockjs = new SockJS('/echo');

    sockjs.onopen = () => {
      console.log('[*] open', sockjs.protocol);
    };

    sockjs.onmessage = (e) => {
      let src = e.data;
      // console.log('md', src);

      this.setState({src});
    };

    sockjs.onclose   = function()  {
      console.log('[*] close');
    };
  },

  chooseLanguage(lang) {
    this.setState({lang});
  },

  render() {
    let {src,lang} = this.state;
    let sections = compileMarkdown(src,lang);
    let doc = renderMarkdown(sections,lang)
    return (
      <div>
        <div className="language-control">
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"zh-cn")}>Chinese</a>
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"default")}>Default</a>
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"all")}>Both</a>
        </div>
        {doc}
      </div>
    );
  },
});

window.onload = () => {
  ReactDOM.render(<App/>, document.querySelector("#react-root"));
};