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

function createPlaylist(duration) {
    return axios({
        method:'post',
        url:`https://api.spotify.com/v1/users/${user_id}/playlists`,
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        data: {
            name: "My " + duration.toString() + "s timer",
        },
    }).then(function(response){
        return response.data.id;
    });
}

function fillPlaylist(playlist_id, tracksURIsDuration) {
    let listURIs = tracksURIsDuration.reduce((acc, cur) => cur + acc.toString() + ',', '');

    //console.log(listURIs);

    /*axios({
        method:'post',
        url:`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        data: {
            uris: ,
        },
    }).then(function(response){
        return response;
    });*/
}

function getFeaturedPlaylistsIds() {
    let date = new Date();
    date = date.toISOString();

    return axios({
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
    });
}

function getTracksInfo(playlist_id) {
    let date = new Date();
    date = date.toISOString();

    return axios({
        method:'get',
        url:`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        params: {
            market: user_country,
            fields: "items(track(uri, duration_ms))",
            timestamp: date,
        },
    }).then(function(response) {
        const tracks = response.data.items;
         return tracks.map(function(trackObj) {
             return {uri: trackObj.track.uri, duration_s: Math.round(trackObj.track.duration_ms/1000)};
         });
    });
}

function filterTracks(allTracksInfo, max_dur) {
    let tot_dur = 0;
    let playlist_tracks = [];
    allTracksInfo.forEach((trackInfo) => {
        if(trackInfo.duration_s <= max_dur - tot_dur - 150) {
            tot_dur = tot_dur + trackInfo.duration_s;
            playlist_tracks = playlist_tracks.concat(trackInfo);
        }
    });

    allTracksInfo = allTracksInfo.filter(item => !playlist_tracks.includes(item));

    allTracksInfo.forEach((trackInfo) => {
        if(trackInfo.duration_s === max_dur - tot_dur) {
            tot_dur = tot_dur + trackInfo.duration_s;
            playlist_tracks = playlist_tracks.concat(trackInfo);
        }
    });

    console.log(playlist_tracks);
    return playlist_tracks;
}

export async function getTimerPlaylist(max_dur) {
    //const myPlaylist_id = await createPlaylist(max_dur);
    //console.log(myPlaylist_id);
    const featuredPlaylists_ids = await getFeaturedPlaylistsIds();
    //console.log(featuredPlaylists_ids);

    const PR_allTracksInfo = featuredPlaylists_ids.map((idPlaylist) => getTracksInfo(idPlaylist));
    let allTracksInfo = await Promise.all(PR_allTracksInfo);
    allTracksInfo = allTracksInfo.flat();
    //console.log(allTracksInfo);

    const playlist_tracks = filterTracks(allTracksInfo, max_dur);

    //fillPlaylist(myPlaylist_id, tracksURIsDuration);
}