var $ = require('jquery');

window.spotify_auth_token = 'please-change-me';

var HOST = 'http://museic.azurewebsites.net';

function fetch_next_songs(callback) {
    if (window.spotify_auth_token != 'please-change-me') {
        $.getJSON(HOST + '/song', callback);
    } else {
        console.error("You need to set the variable `window.spotify_auth_token` to use this app");
    }
}

module.exports = {
    fetch_next_songs: fetch_next_songs
};
