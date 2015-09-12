var ipc = require('ipc');
function batteryStatusUpdate(data) {
    $("#battery-indicator-text").html(data);
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


$(document).ready(function() {
    ipc.on('battery-status-update', batteryStatusUpdate);
});
