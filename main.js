var app = require('app');
var BrowserWindow = require('browser-window');
var muselib = require('./muse.js');

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        title: 'Museic',
        'auto-hide-menu-bar': true
    });

    muselib.runServer();
    mainWindow.loadUrl('file://' + __dirname + '/webapp/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
