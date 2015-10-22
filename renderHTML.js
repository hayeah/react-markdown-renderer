var babel = require("babel-core/browser");
var React = require("react");
module.exports = function renderHTML(html, widgets) {
    if (widgets === void 0) { widgets = {}; }
    var jsx = "let dom = " + html;
    // console.log("jsx",jsx);
    var code = babel.transform(jsx).code;
    // console.log("code",jsx);
    var widgetNames = Object.keys(widgets);
    var body = code + "; return dom;";
    var args = ["React"].concat(widgetNames);
    var widgetValues = widgetNames.map(function (name) { return widgets[name]; });
    // console.log("args",widgets);
    // console.log("args",args);
    // console.log("values",widgetValues);
    var render = new (Function.bind.apply(Function, [void 0].concat(args, [body])))();
    var dom = render.apply(void 0, [React].concat(widgetValues));
    return dom;
};
