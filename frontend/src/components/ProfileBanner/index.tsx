import Image from "next/image";

import { ProfileBannerType } from "@types";
import LogoutButton from "components/LogoutButton";

type ProfileBannerNumbersType = {
  count: number;
  type: string;
};

const ProfileBannerNumbers = ({ count, type }: ProfileBannerNumbersType) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-theme-green-1 text-lg">{count}</p>
      <p className="text-white font-light text-sm">{type}</p>
    </div>
  );
};

const ProfileBanner = ({
  imageSrc,
  userName,
  followedArtistsCount,
  followerCount,
  playlistsCount,
}: ProfileBannerType) => {
  return (
    <div className="flex flex-col space-y-4 items-center bg-gradient-to-b from-[#374151] to-[#111827] py-10  w-full">
      <Image
        src={imageSrc}
        alt={`${userName} image`}
        className="rounded-full"
        width="70%"
        height="70%"
      />
      <p className="text-white text-2xl font-bold">{userName}</p>
      <div className="flex flex-row space-x-4">
        <ProfileBannerNumbers count={followedArtistsCount} type="FOLLOWING" />
        <ProfileBannerNumbers count={followerCount} type="FOLLOWERS" />
        <ProfileBannerNumbers count={playlistsCount} type="PLAYLISTS" />
      </div>
      <LogoutButton />
    </div>
  );
};

export default ProfileBanner;
