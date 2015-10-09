module.exports = render;

const React = require("react");

function pp(obj) {
  console.log(JSON.stringify(obj,{},2));
  return obj;
}


let Paragraph = ({text}) => {
  return <p>{text}</p>;
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


let components = {
  "paragraph": Paragraph,
  "code": Code,
}

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

let {kebabCase} = require("lodash");

function makeEnsureUnique() {
  let ids = {};
  return function ensureUnique(str) {
    let id = kebabCase(str);
    let i = 1;
    while(true) {
      let tryId = id;
      if(i != 1) {
        tryId = `${tryId}_${i}`
      }

      if(ids[tryId] == null) {
        id = tryId;
        ids[id] = id;
        break;
      }

      i++;
    }

    return id;
  };
}

let Section = React.createClass({
  headerLevels: ["h1","h2","h3","h4","h5","h6"],
  renderContent() {
    let {content} = this.props;
    let ensureUnique = makeEnsureUnique();

    return content.map((token) => {
      let {text} = token;
      let key = ensureUnique(hashCode(text));
      return (
        renderContent(token,key)
      );
    });
  },

  render() {
    let {heading,key} = this.props;

    let {depth: headerLevel, text: title} = heading;
    let header = React.createElement(this.headerLevels[headerLevel-1],{id: key},title);

    return (
      <section>
        {header}
        {this.renderContent()}
      </section>
    );
  },
});

let Document = React.createClass({
  renderSections() {
    let {sections} = this.props;
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

function render(sections) {
  // let sections = sectionize(tokenize(md));

  // pp(sections);

  return <Document sections={sections}/>

}

function renderToString(sections) {
  return React.renderToString(render(sections));
}

function test() {
  const tokenize = require("./tokenize");
  const sectionize = require("./sectionize");
  const fs = require("fs");

  let md = fs.readFileSync("watch.md","utf8");
  let sections = sectionize(tokenize(md));
  pp(sections);
  console.log(renderToString(sections));
}

// test();
// renderToString(md);