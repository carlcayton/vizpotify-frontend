import "dotenv/config";
import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import chalk from "chalk";

const loginUser = async (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: `${process.env.REDIRECT_URI}`,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  console.log(`LOGIN CALLED`);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};

const refreshUser = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  console.log("REFRESH CALLED");
  console.log(chalk.yellow(refreshToken));
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};

export { loginUser, refreshUser };
