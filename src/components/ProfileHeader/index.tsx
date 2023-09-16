import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ProfileHeaderType } from "@types";
import LogoutButton from "components/LogoutButton";

type ProfileHeaderNumbersType = {
  count: number;
  type: string;
};

const ProfileHeaderNumbers = ({ count, type }: ProfileHeaderNumbersType) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-theme-green-1 text-lg">{count}</p>
      <p className="text-white font-light text-sm">{type}</p>
    </div>
  );
};

const ProfileHeader = ({
  profilePictureUrl,
  userName,
  followedArtistsCount,
  followerCount,
  playlistsCount,
}: ProfileHeaderType) => {

  
  return (
    <div className="flex flex-col space-y-4 items-center bg-gradient-to-b from-[#374151] to-[#111827] py-10  w-full">
      <Image
        src={profilePictureUrl}
        alt={`${userName} image`}
        className="rounded-full"
        width="70%"
        height="70%"
      />
      <p className="text-white text-2xl font-bold">{userName}</p>
      <div className="flex flex-row space-x-4">
        <ProfileHeaderNumbers count={followedArtistsCount} type="FOLLOWING" />
        <ProfileHeaderNumbers count={followerCount} type="FOLLOWERS" />
        <ProfileHeaderNumbers count={playlistsCount} type="PLAYLISTS" />
      </div>
      <LogoutButton />
    </div>
  );
};

export default ProfileHeader;
