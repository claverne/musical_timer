let express = require('express'); // Express web server framework
let axios = require('axios');

let cors = require('cors');
let querystring = require('querystring');
let cookieParser = require('cookie-parser');

let client_id = '60cc2569c240454c98bc16c17254f673'; // Your client id
let client_secret = 'ce5cdd7434214bf18b654607f63a6bff'; // Your secret
let redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const formUrlEncoded = x =>
      Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

let app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  let state = generateRandomString(16);

  // your application requests authorization
  let scope = 'user-read-private user-read-email playlist-read-private';
  res.json({
    urlbase: 'https://accounts.spotify.com/authorize?',
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formUrlEncoded({
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    }),
  })
  .then(function(response) {
    var access_token = response.data.access_token,
        refresh_token = response.data.refresh_token;

    // we can also pass the token to the browser to make requests from there
    res.redirect('http://localhost:3000/loggedin?' +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      }));
  })
  .catch(function(error) {
    res.json(error);
  })
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    data: formUrlEncoded({
        refresh_token,
        grant_type: 'refresh_token',
      }),
  })
  .then(function(response){
    if(response.status === 200) {
      let access_token = response.data.access_token;
      console.log('token')
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);