const React = require("react");

const {makeEnsureUnique,pp} = require("./utils");
const renderInline = require("./renderInline");
const renderHTML = require("./renderHTML");

module.exports = function render(sections,lang) {
  return <Document sections={sections}/>
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

let I18n = ({body}) => {
  return (
    <div className="i18n">
      {renderNodes(body)}
    </div>
  );
};

function renderContent(node,key) {
  let {type} = node;

  let component = components[type];
  if(component == null) {
    throw "type not supported: " + type;
  }

  return React.createElement(component,{
    key,
    ...node,
  });
}

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

function renderNodes(nodes) {
  let ensureUnique = makeEnsureUnique();
  return nodes.map((token) => {
    let {text} = token;
    let key = ensureUnique(hashCode(text));
    return (
      renderContent(token,key)
    );
  });
}

let Section = React.createClass({
  renderContent() {
    let {content} = this.props;
    let ensureUnique = makeEnsureUnique();

    return renderNodes(content);

    // content.map((token) => {
    //   let {text} = token;
    //   let key = ensureUnique(hashCode(text));
    //   return (
    //     renderContent(token,key)
    //   );
    // });
  },

  render() {
    let {heading,key} = this.props;

    let header = <Heading {...heading}/>

    return (
      <section id={key} key={key}>
        {header}
        {this.renderContent()}
      </section>
    );
  },
});

let Document = React.createClass({
  renderSections() {
    let {sections,lang} = this.props;
    return sections.map(section => <Section {...section}/>)
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