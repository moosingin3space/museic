var $ = require('jquery');

window.spotify_access_token = 'please-change-me';

var HOST = 'http://museic.azurewebsites.net';

function fetch_next_songs(callback) {
    if (window.spotify_access_token != 'please-change-me') {
        $.ajax({
            url: HOST + '/song',
            headers: {
                'X-Access-Token': window.spotify_access_token
            },
            success: function(data) {
                if (data.status == 'success') {
                    callback(data.body);
                } else {
                    console.error("XHR failed: " + data.body);
                }
            }
        });
    } else {
        console.error("You need to set the variable `window.spotify_auth_token` to use this app");
    }
}

module.exports = {
    fetch_next_songs: fetch_next_songs
};
