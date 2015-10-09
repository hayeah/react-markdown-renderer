const React = require("react");

const {makeEnsureUnique,pp} = require("./utils");
const renderInline = require("./renderInline");
const renderHTML = require("./renderHTML");

module.exports = function render(sections,choselang="default") {
  return <Document chosenlang={choselang} sections={sections}/>
};

let Paragraph = ({text}) => {
  return <p>{renderInline(text)}</p>;
};

let RawHTML = ({text}) => {
  return renderHTML(text,widgets);
}

let Video = ({src}) => {
  return <video src={src} controls/>
};

const widgets = {
  Video,
};

let Code = React.createClass({
  componentDidMount() {
    this.highlight();
  },

  // componentDidUpdate() {
  //   this.highlight();
  // },

  highlight() {
    let {text} = this.props;
    // console.log("hilight",text);
    let {
      $code,
    } = this.refs;

    hljs.highlightBlock($code);
  },

  render() {
    let {text,lang} = this.props;
    return (
      <pre>
        <code ref="$code" className={lang}>
          {text}
        </code>
      </pre>
    );
  }
});

let I18n = ({body,lang}) => {
  let renderedBody = renderNodes(body,"default");
  return (
    <div className="i18n">
      {renderedBody}
    </div>
  );
};



function hashCode(str) {
  if(str == null || str.charCodeAt == null) {
    return "";
  }
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const headerLevels = ["h1","h2","h3","h4","h5","h6"];
let Heading = (props) => {
  let {depth,text,id} = props;
  let tag = headerLevels[depth-1];
  let headerProps = id ? {id} : {};
  return React.createElement(tag,headerProps,text);
}

function renderNodes(nodes,choseLang) {
  let ensureUnique = makeEnsureUnique();
  return nodes.map((token) => {
    let {text} = token;
    let key = ensureUnique(hashCode(text));
    return renderNode(token,key,choseLang);
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
    throw "type not supported: " + type;
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
    let {heading,key,chosenlang} = this.props;

    let useDefaultLanguage = chosenlang === "all" || chosenlang === "default";
    let body = this.renderContent();

    return (
      <section id={key} key={key}>
        {useDefaultLanguage && <Heading {...heading}/>}
        {body}
      </section>
    );
  },
});

let Document = React.createClass({
  renderSections() {
    let {sections,chosenlang} = this.props;

    return sections.map(section => <Section chosenlang={chosenlang} {...section}/>)
  },

  render() {
    return (
      <div>
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
  I18n,
};