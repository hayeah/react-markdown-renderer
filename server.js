const http = require('http');
const fs = require("fs");
const path = require("path");

const express = require("express");
const sockjs = require('sockjs');
const chokidar = require("chokidar");

let app = express();

let markdownFilepath = process.argv[2];
let markdownDir = path.dirname(markdownFilepath);

console.log("live preview:", markdownFilepath, markdownDir);

// process.exit(0);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(markdownDir));


var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
  let srcPath = markdownFilepath;
  let watcher = chokidar.watch(srcPath);

  function sendContent() {
    fs.readFile(srcPath,"utf8",(err,src) => {
      conn.write(src);
    });
  }

  sendContent();

  // let timer = setInterval(() => {
  //   conn.write(JSON.stringify({
  //     "server time": String(new Date())
  //   }));
  // },3000);

  watcher.on("change",(path) => {
    sendContent();
  });

  conn.on('close', function() {
    // clearInterval(timer);
    watcher.close();
  });
});

var server = http.createServer(app);

echo.installHandlers(server, {prefix:'/echo'});

let port = process.env.PORT || 3000;
console.log("listening on port",port);
server.listen(port, '0.0.0.0');