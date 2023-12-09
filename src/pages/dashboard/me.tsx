// import { useAuth } from "api/useAuth";
import React, { useState, useEffect, useRef } from "react";
import ProfileHeader from "components/ProfileHeader";
import TopArtists from "components/TopArtists";
import Analytics from "components/Analytics";
import { getProfileHeaderData, getUserTopArtist, getUserTopTrack, getUserAnalyticsData } from "../api/dashboard/dashboardApi";
import useLazyLoadData from "../../utils/lazyLoadData";
import TopTracks from "components/TopTracks";
import { useIsMobile } from "utils/detectScreenSize";

export default function Dashboard() {
  const isMobile = useIsMobile()

  const profileHeaderRef = useRef(null);
  const userTopArtistsRef = useRef(null);
  const userTopTracksRef = useRef(null);
  const analyticsRef = useRef(null);

  const profileHeaderData = useLazyLoadData(getProfileHeaderData, profileHeaderRef);
  const userTopArtists = useLazyLoadData(getUserTopArtist, userTopArtistsRef)
  const userTopTracks = useLazyLoadData(getUserTopTrack, userTopTracksRef)
  const analyticsData = useLazyLoadData(getUserAnalyticsData, analyticsRef);
  return (
    <div className="flex flex-col  justify-center w-full">
      <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData} />
      <div className={`flex flex-col  justify-center w-full px-10 bg-[#111827] sm:px-32 md:px-64 `}>
        <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} />
        <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} />
        {/* <Analytics innerRef={analyticsRef} userAnalyticsData={analyticsData} /> */}
      </div>
    </div>
  );
}
