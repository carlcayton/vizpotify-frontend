// import { useAuth } from "api/useAuth";
import ProfileBanner from "components/ProfileBanner";
import LogoutButton from "components/LogoutButton";
import { getSession } from "next-auth/react";
import spotifyApi from "lib/spotify";
import { GetServerSideProps } from "next";
import { ProfileBannerType } from "@types";
import TopArtists from "components/TopArtists";

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

const getUserTopArtists = async (spotifyApi: any) => {
  let topArtists = await spotifyApi.getMyTopArtists({
    time_range: "short_term",
  });
  topArtists = topArtists.body.items;
  return topArtists;
};
const getSimilarArtists = async (spotifyApi, artistsList: any[]) => {
  // console.log(`Top artists: ${JSON.stringify(artistsList)}`)
  const similarArtists = {};

  for (const artist in artistsList) {
    const artistId = artistsList[artist].id;
    const data = await spotifyApi.getArtistRelatedArtists(artistId);
    const similarArtistPerArtists = [];
    const temp = data.body.artists;
    for (let j in temp) {
      //Get only the first 6 similar artists
      if (j == 7) {
        break;
      }
      const out = {
        id: temp[j].id,
        name: temp[j].name,
        image: temp[j].images.at(-1).url,
      };
      similarArtistPerArtists.push(out);
    }
    similarArtists[`${artistId}`] = similarArtistPerArtists;
  }

  // console.log(
  //   `SIMILAR ARTIST:${JSON.stringify(similarArtists[artistsList[0].id])}`
  // );

  return similarArtists;
};

// const getUserTopArt;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // @ts-ignore
  const accessToken = session["user"]["accessToken"];
  // @ts-ignore
  const refreshToken = session["user"]["refreshToken"];

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  const userProfileData = await getProfileBannerData(spotifyApi);
  const userTopArtists = await getUserTopArtists(spotifyApi);
  const similarArtists = await getSimilarArtists(spotifyApi, userTopArtists);

  return {
    props: {
      userProfile: userProfileData,
      userTopArtists: userTopArtists,
      similarArtists: similarArtists,
    },
  };
};

export default function Dashboard(props: any) {
  const userProfile: ProfileBannerType = props.userProfile;
  const userTopArtists = props.userTopArtists;
  const similarArtists = props.similarArtists;
  return (
    <div className="flex flex-col  justify-center  ">
      <ProfileBanner
        imageSrc={userProfile.imageSrc}
        userName={userProfile.userName}
        followedArtistsCount={userProfile.followedArtistsCount}
        followerCount={userProfile.followerCount}
        playlistsCount={userProfile.playlistsCount}
      />
      <TopArtists
        userTopArtists={userTopArtists}
        similarArtists={similarArtists}
      />
    </div>
  );
}
