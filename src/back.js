import {User} from './User.js'

let axios = require('axios');
let querystring = require('querystring');
let Cookie = require('js-cookie');

let access_token = null;
let refresh_token = null
let user_id = null;
let user_country = null;

export function init_token() {
    access_token = Cookie.get('access_token');
    refresh_token = Cookie.get('refresh_token');
}

export function getUser() {
    return axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
    }).then(function(response) {
        user_id = response.data.id;
        user_country = response.data.country;
        let user = new User(response.data.id, response.data.display_name, response.data.images);
        return user
    });
}

export function login() {
    axios({
        method: 'get',
        url: 'http://localhost:8888/login',
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origins': 'http://localhost:8888',
            'Access-Control-Allow-Headers': 'Accept',
        },
    }).then(function(response){
        window.location.replace(response.data.urlbase +
            querystring.stringify({
                response_type: response.data.response_type,
                client_id: response.data.client_id,
                scope: response.data.scope,
                redirect_uri: response.data.redirect_uri,
                state: response.data.state,
            })
        )
    });
}

export function getTimerPlaylist(max_dur) {
    let date = new Date();
    date = date.toISOString();

    axios({
        method:'get',
        url:`https://api.spotify.com/v1/browse/featured-playlists`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        params: {
            country: user_country,
            locale: "en_US",
            timestamp: date,
        },
    }).then(function(response){
        let featuredPlaylistIds = response.data.playlists.items.map(function (playlist) {
          return playlist.id
        });
        return featuredPlaylistIds;
    }).then(function(featuredPlaylistIds) {
        let playlist_id = featuredPlaylistIds[0];
        axios({
            method:'get',
            url:`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                market: user_country,
                fields: "items(track(id, duration_ms))",
                timestamp: date,
            },
        }).then(function(response) {
            let tot_dur = 0;
            let tracksIds = response.data.items.map(function (object) {
                let track_dur = Math.round(object.track.duration_ms/1000);
                if((tot_dur + track_dur) <= max_dur) {
                    tot_dur = tot_dur + track_dur;
                    return [object.track.id, track_dur];
                }
            });

            console.log(tot_dur)
        });
    });
}