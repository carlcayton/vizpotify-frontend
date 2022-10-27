// import { useAuth } from "api/useAuth";
// @ts-ignore
import SpotifyWebApi from "spotify-web-api-node";
import { ICode } from "@types";
import ProfileBanner from "components/ProfileBanner";
import axios from "axios";
import { useRouter } from "next/router";
import body from "assets/json_samples/userProfile1.json";

export async function getServerSideProps(context) {
  const spotifyApi = new SpotifyWebApi({
    clientId: "19677842c1504c3c831f448b3e0691c8",
  });
  const res = await auth(context.query.code);
  console.log(`ACCESS TOKEN: ${res.accessToken}`);

  spotifyApi.setAccessToken(res.accessToken);
  spotifyApi.setRefreshToken(res.refreshToken);

  const userProfile = await getProfileBannerData(spotifyApi);
  console.log(userProfile);

  const userProfileData = body;

  return {
    props: {
      userProfile: JSON.stringify(userProfileData),
    },
  };
}

const auth = async (code: string) => {
  const res = await axios.post("http://localhost:5000/api/user/login", {
    code,
  });

  return res.data;
};
const getProfileBannerData = async (spotifyApi) => {
  let userProfile = await spotifyApi.getMe();
  userProfile = userProfile.body;
  console.log(`NICE ${userProfile}`);
  const followedArtists = await spotifyApi.getFollowedArtists(userProfile.id);
  console.log(followedArtists);
  const userPlaylists = await spotifyApi.getUserPlaylists(userProfile.id);
  const icon =
    userProfile.images.length > 0
      ? userProfile.images.at(-1)
      : "assets/vector_image/user.svg";

  return {
    userID: userProfile.id,
    displayName: userProfile.display_name,
    following: userProfile.followers.total,
    followers: followedArtists.length,
    playlists: userPlaylists.length,
    image: icon,
  };
};

export default function Dashboard({ userProfile }) {
  // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then((data: any) => {
  //   console.log(data.body.items);
  // });
  return <div>hotdo{userProfile}</div>;
}
