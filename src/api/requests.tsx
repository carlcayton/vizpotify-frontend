import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "./useAuth";


export const getUserProfile= async(spotifyWebApi:any)=>{
   return spotifyWebApi.getMe()
}
