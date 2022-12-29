// import { useAuth } from "api/useAuth";
import ProfileBanner from "components/ProfileBanner";
import LogoutButton from "components/LogoutButton";
import { getSession } from "next-auth/react";
import spotifyApi from "lib/spotify";
import { GetServerSideProps } from "next";
import { ProfileBannerType } from "@types";

const getProfileBannerData = async (spotifyApi: any) => {
  let userProfile = await spotifyApi.getMe();
  userProfile = userProfile.body;

  const followedArtists = await spotifyApi.getFollowedArtists();
  const followedArtistsCount = followedArtists.body.artists.total;
  let userPlaylists = await spotifyApi.getUserPlaylists(userProfile.id);
  userPlaylists = userPlaylists.body;
  const imageSrc =
    userProfile.images.length > 0
      ? userProfile.images.at(-1)
      : "/Dashboard/user.svg";

  return {
    userID: userProfile.id,
    userName: userProfile.display_name,
    followerCount: userProfile.followers.total,
    followedArtistsCount: followedArtistsCount,
    playlistsCount: userPlaylists["total"],
    imageSrc: imageSrc,
  };
};

const getTopArtists = async (spotifyApi) => {
  let topArtists = await spotifyApi.getMyTopArtists();
  topArtists = topArtists.body;
  console.log(topArtists);
  return {};
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // @ts-ignore
  const accessToken = session["user"]["accessToken"];
  // @ts-ignore
  const refreshToken = session["user"]["refreshToken"];

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  const userProfileData = await getProfileBannerData(spotifyApi);
  getTopArtists(spotifyApi);

  return {
    props: {
      userProfile: userProfileData,
    },
  };
};

export default function Dashboard(props: any) {
  const userProfile: ProfileBannerType = props.userProfile;
  return (
    <div>
      <ProfileBanner
        imageSrc={userProfile.imageSrc}
        userName={userProfile.userName}
        followedArtistsCount={userProfile.followedArtistsCount}
        followerCount={userProfile.followerCount}
        playlistsCount={userProfile.playlistsCount}
      />
    </div>
  );
}
