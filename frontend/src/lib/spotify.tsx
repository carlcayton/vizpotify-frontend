import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-follow-read",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-read-recently-played",
].join("%20");

const params = {
  scope: scopes,
};

const queryParamString = `scope=${scopes}`;
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
export default spotifyApi;
export { LOGIN_URL };
