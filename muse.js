var osc = require('node-osc');
var EventEmitter = require('events');
var EventCombiner = require('./event-combiner.js');
var Neutral = {
  Min: 1,
  Max: 2
};

function calcavg(msg)
{
  var sum = 0;
  var avg = 0;
  var amount = 0;
  for (var i = 1; i < msg.length; i++)
  {
    if (msg[i] != 0)
    {
      sum += msg[i];
      amount++;
    }
  }
  avg = sum / amount;
  return avg;
}

function runServer(webContents) {
  var App = new EventEmitter();
  var array = [0,0,0,0,0,0,0,0,0,0];

  function record(alpha, beta)
  {
    beta = Math.pow(10, beta);
    alpha = Math.pow(10, alpha);
    var ratio = beta/ alpha;
    array.shift();
    array.push(ratio);
    var arraysum = 0;
    for(var i= 0; i < array.length; i++)
    {
      arraysum += array[i];
    }
    console.log(arraysum/array.length);
    var avg = arraysum/array.length;
    if(avg > Neutral.Max)
    {
      webContents.send('mood-update', 'excited');
    }
    else if(avg < Neutral.Min)
    {
      webContents.send('mood-update', 'relaxed');
    }
    else {
      webContents.send('mood-update', 'neutral');
    }
  }

  EventCombiner.combineEvents(App, 'alpha_wave', 'beta_wave', record);

  var oscServer = new osc.Server(5000, '127.0.0.1');
  console.log('Listening.');
  oscServer.on("message", function (msg, rinfo) {
    if (msg[0]== '/muse/batt')
    {
      console.log(msg);
      webContents.send('battery-status-update', msg[1]/100);
    }
    if (msg[0] == '/muse/elements/beta_absolute')
    {
      var avg = calcavg(msg);
      App.emit('beta_wave', avg);
    }
    else if (msg[0] == '/muse/elements/alpha_absolute')
    {
      var avg = calcavg(msg);
      App.emit('alpha_wave', avg);
    }
  });
}

module.exports = {
  'runServer': runServer
};
