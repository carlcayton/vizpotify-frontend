import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ProfileHeaderType } from "@types";
import LogoutButton from "components/LogoutButton";


const ProfileHeaderNumbers = ({ count, type} ) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-theme-green-1 text-lg">{count}</p>
      <p className="text-white font-light text-sm">{type}</p>
    </div>
  );
};

const ProfileHeader = ({
  innerRef,
  userDisplayName,
  profilePictureUrl,
  followedArtistCount,
  followerCount,
  playlistCount,
}) => {
  console.log(userDisplayName)
  return (
    <div ref={innerRef} className="flex flex-col space-y-4 items-center bg-gradient-to-b from-[#374151] to-[#111827] py-10  w-full">
      <Image
        src={`${profilePictureUrl?profilePictureUrl:"/Dashboard/user.svg"}`}
        alt={`${userDisplayName} image`}
        className="rounded-full"
        width="70%"
        height="70%"
      />
      <p className="text-white text-2xl font-bold">{userDisplayName}</p>
      <div className="flex flex-row space-x-4">
        <ProfileHeaderNumbers count={followedArtistCount} type="FOLLOWING" />
        <ProfileHeaderNumbers count={followerCount} type="FOLLOWERS" />
        <ProfileHeaderNumbers count={playlistCount} type="PLAYLISTS" />
      </div>
      <LogoutButton />
    </div>
  );
};

export default React.memo(ProfileHeader);
