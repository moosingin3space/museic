var osc = require('node-osc');

function runServer() {
  var oscServer = new osc.Server(5000, '127.0.0.1');
  console.log('Listening.');
  oscServer.on("message", function (msg, rinfo) {
    console.log(msg);
  });
}

module.exports = {
  'runServer': runServer
};
