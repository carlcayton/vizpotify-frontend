import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoutButton from "components/common/LogoutButton";
import CompareButton from "components/common/CompareButton";
import useAuthStatus from "hooks/useAuthStatus";


const ProfileHeaderNumbers = ({ count, type }) => {
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
}) => {
  const { isAuthenticated, isViewingOwnProfile } = useAuthStatus();
  return (
    <div ref={innerRef} className="flex flex-col space-y-4 items-center bg-gradient-to-b from-[#374151] to-[#111827] py-10 w-full">
      <Image
        src={profilePictureUrl || "/Dashboard/user.svg"}
        alt={`${userDisplayName} image`}
        className="rounded-full"
        width="70%"
        height="70%"
      />
      <p className="text-white text-2xl font-bold">{userDisplayName}</p>
      <div className="flex flex-row space-x-4">
        <ProfileHeaderNumbers count={followedArtistCount} type="FOLLOWING" />
        <ProfileHeaderNumbers count={followerCount} type="FOLLOWERS" />
      </div>
      {isViewingOwnProfile ? (
        <LogoutButton />
      ) : isAuthenticated ? (
        <CompareButton />
      ) : null}
    </div>
  );
};

export default React.memo(ProfileHeader);