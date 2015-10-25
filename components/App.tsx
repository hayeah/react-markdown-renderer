import * as React from "react";
// let renderMarkdown = require("../render");
import {renderNodes} from "../render"
import compileMarkdown from "../markdown"
import {i18nTransform} from "../i18n";


declare var SockJS: any;

function onMarkdownUpdate(callback: (src: string) => void) {
	let sockjs = new SockJS('/echo');

	sockjs.onopen = () => {
      console.log('[*] open', sockjs.protocol);
    };

	sockjs.onmessage = (e) => {
		let src: string = e.data;
		console.log("markdown updated");
		callback(src);
		// console.log('md', src);
	};

	sockjs.onclose   = function()  {
		console.log('[*] close');
		setTimeout(() => {
			console.log("reconnecting sockjs..");
			onMarkdownUpdate(callback);
		},2000);
	};

}

let App = React.createClass({
  getInitialState() {
    return {
      lang: "default",
      src: "",
    };
  },

  componentDidMount() {
		onMarkdownUpdate(src => {
			this.setState({src});
		});
  },

  chooseLanguage(lang) {
    this.setState({lang});
  },

  render() {
    let {src,lang} = this.state;
    // let sections = compileMarkdown(src,lang);
    // let doc = renderMarkdown(sections,lang)

    let sections = compileMarkdown(src);
    let i18nSections = i18nTransform(sections);
    let renderedDocument = renderNodes(i18nSections);
    // i18n


    return (
      <div>
        <div className="language-control">
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"zh-cn")}>Chinese</a>
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"default")}>Default</a>
          <a href="javascript:void(0)" onClick={this.chooseLanguage.bind(this,"all")}>Both</a>
        </div>

        <div className="marked">
          {renderedDocument}
        </div>
      </div>
    );
  },
});

export default App;