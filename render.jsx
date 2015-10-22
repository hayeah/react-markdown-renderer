const React = require("react");

const {makeEnsureUnique,pp} = require("./utils");
const renderInline = require("./renderInline");
const renderHTML = require("./renderHTML");

import {hashCode} from "./utils";
import Code from "./components/Code";

module.exports = function render(sections,choselang="default") {
  return <Document chosenlang={choselang} sections={sections}/>
};


let Paragraph = ({text}) => {
  return <p>{renderInline(text)}</p>;
};

let Text = ({text}) => {
  return renderInline(text);
};

let RawHTML = ({text}) => {
  return renderHTML(text,widgets);
}

let Video = ({src}) => {
  return <video src={src} controls/>
};

let ListItem = ({body}) => {
  return <li>{renderNodes(body)}</li>;
};

let List = ({items,ordered}) => {
  let tag = ordered ? "ol" : "ul";
  let renderedItems = renderNodes(items);
  return React.createElement(tag,null,renderedItems);
};

const widgets = {
  Video,
};



let I18n = ({body,lang}) => {
  let renderedBody = renderNodes(body,"default");
  return (
    <div className="i18n">
      {renderedBody}
    </div>
  );
};

const headerLevels = ["h1","h2","h3","h4","h5","h6"];

let Heading = (props) => {
  let {depth,text,id} = props;
  let tag = headerLevels[depth-1];
  let headerProps = id ? {id} : {};

  let body = (
    <a href={"#"+id}>
      {text}
    </a>
  );
  return React.createElement(tag,headerProps,body);
}

function renderNodes(nodes,chosenLang="default") {
  let ensureUnique = makeEnsureUnique();
  return nodes.map((token) => {
    let {text} = token;
    let key = ensureUnique(hashCode(text));
    return renderNode(token,key,chosenLang);
  });
}

function renderNode(node,key,chosenlang) {
  let {type,lang} = node;

  let isI18n = type === "I18n";
  let useNode = chosenlang === "all" ||
    (!isI18n && chosenlang === "default") ||
    (isI18n && chosenlang === lang);

  if(!useNode) {
    return null;
  }

  let component = components[type];
  if(component == null) {
    return "";
    console.warn("type not supported: " + type);
  }

  return React.createElement(component,{
    key,
    ...node,
  });
}

let Section = React.createClass({
  renderContent() {
    let {content,chosenlang} = this.props;
    return renderNodes(content,chosenlang);
  },

  render() {
    let {heading,id,chosenlang} = this.props;

    let useDefaultLanguage = chosenlang === "all" || chosenlang === "default";
    let body = this.renderContent();

    let isExercise = id && id.indexOf("exercise") == 0;
    let className = isExercise && "exercise";

    return (
      <section className={className} id={id} key={id}>
        {useDefaultLanguage && <Heading id={id} {...heading}/>}
        {body}
      </section>
    );
  },
});

let Document = React.createClass({
  renderSections() {
    let {sections,chosenlang} = this.props;

    return sections.map(section =>
      <Section id={section.key} chosenlang={chosenlang} {...section}/>
    )
  },

  // componentDidMount() {
  //   let hash = window.location.hash;
  //   if(hash != null) {
  //     let $e = document.querySelector(hash);
  //     window.scrollTo(0,$e.offsetTop);
  //   }
  // },

  render() {
    return (
      <div className="marked">
        {this.renderSections()}
      </div>
    );
  }
});

let components = {
  "paragraph": Paragraph,
  "heading": Heading,
  "code": Code,
  "html": RawHTML,
  "text": Text,
  "list": List,
  "list-item": ListItem,
  I18n,
};