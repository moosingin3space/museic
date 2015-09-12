var osc = require('node-osc');

function runServer(webContents) {
  var oscServer = new osc.Server(5000, '127.0.0.1');
  console.log('Listening.');
  oscServer.on("message", function (msg, rinfo) {
    console.log(msg);
    if (msg[0]== '/muse/batt')
    {
      webContents.send('battery-status-update', msg[2]);
    }
  });
}

module.exports = {
  'runServer': runServer
};
