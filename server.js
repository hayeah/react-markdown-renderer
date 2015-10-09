const http = require('http');
const path = require("path");
const fs = require("fs");

const express = require("express");
const sockjs = require('sockjs');
const chokidar = require("chokidar");


let app = express();
app.use(express.static(path.join(__dirname, 'public')));

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
  let srcPath = "watch.md";
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

server.listen(9999, '0.0.0.0');