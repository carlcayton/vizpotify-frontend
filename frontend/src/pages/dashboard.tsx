import React from "react";
import { useAuth } from "api/useAuth";
// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import { ICode } from "@types";

const spotifyApi = new SpotifyWebApi({
  clientId: "19677842c1504c3c831f448b3e0691c8",
});

const Dashboard = ({ code }: ICode) => {
  console.log("Loading Dashboard");
  const accessToken = useAuth(code);
  spotifyApi.setAccessToken(accessToken);

  spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then((data: any) => {
    console.log(data.body.items);
  });

  return <div>{}</div>;
};

export default Dashboard;
