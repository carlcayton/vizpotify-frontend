// import { useAuth } from "api/useAuth";
import React, { useState, useEffect, useRef } from "react";
import ProfileHeader from "components/ProfileHeader";
import TopArtists from "components/TopArtists";
import { getProfileHeaderData, getUserTopArtist, getUserTopTrack } from "../api/dashboard/dashboardApi";
import useLazyLoadData from "../../utils/lazyLoadData";
import TopTracks from "components/TopTracks";

export default function Dashboard() {
  const profileHeaderRef = useRef(null);
  const userTopArtistsRef = useRef(null);
  const userTopTracksRef = useRef(null);
  const analyticsRef = useRef(null);

  const profileHeaderData = useLazyLoadData(getProfileHeaderData, profileHeaderRef);
  const userTopArtists = useLazyLoadData(getUserTopArtist, userTopArtistsRef)
  const userTopTracks = useLazyLoadData(getUserTopTrack, userTopTracksRef)
  return (
    <div className="flex flex-col  justify-center w-full">
      <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData} />
      <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} />
      <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} />
    </div>
  );
}
