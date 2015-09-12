var ipc = require('ipc');
var $ = require('./jquery.js');
var connected_timeout; 
function connected(){
    $("#status-light").removeClass("status-not-connected").addClass("status-connected");
}
function disconnected(){
    $("#status-light").removeClass("status-connected").addClass("status-not-connected");
}
function batteryStatusUpdate(data) {
    connected();
    if(connected_timeout)
    {
        window.clearTimeout(connected_timeout);
    }
    window.setTimeout(disconnected, 15000);
    $("#battery-indicator-text").html(data + '%');
    var newClass = '';
    if (data > 80) {
        newClass = 'fa-battery-4';
    } else if (data > 60) {
        newClass = 'fa-battery-3';
    } else if (data > 40) {
        newClass = 'fa-battery-2';
    } else {
        newClass = 'fa-battery-1';
    }
    $("#battery-indicator-icon").
        removeClass('fa-battery-4 fa-battery-3 fa-battery-2 fa-battery-1').
        addClass(newClass);
}

window.onload = function() {
    $(document).ready(function() {
        ipc.on('battery-status-update', batteryStatusUpdate);
    });
};
