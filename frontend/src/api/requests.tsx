import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "./useAuth";


export const getUserProfile= async(spotifyWebApi)=>{
   return spotifyWebApi.getMe()
}
