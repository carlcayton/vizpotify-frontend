import axios from 'axios'
import React, { useRef } from "react";
import { useRouter } from 'next/router';
import ProfileHeader from "components/ProfileHeader";
import TopArtists from "components/TopArtists";
import TopTracks from "components/TopTracks";
import Analytics from "components/Analytics";
import {
  getProfileHeaderData,
  getUserTopArtist,
  getUserTopTrack,
  getUserAnalyticsData
} from "../api/dashboard/dashboardApi";
import useLazyLoadData from "../../utils/lazyLoadData";
import { useIsMobile } from "utils/detectScreenSize";
import NavBar from 'components/composite/NavBar';




export default function Dashboard() {
  const isMobile = useIsMobile();
  const router = useRouter()
  const { spotifyId } = router.query;
  const profileHeaderRef = useRef(null);
  const userTopArtistsRef = useRef(null);
  const userTopTracksRef = useRef(null);
  const analyticsRef = useRef(null);

  const profileHeaderData = useLazyLoadData(() => getProfileHeaderData(spotifyId), profileHeaderRef);
  const userTopArtists = useLazyLoadData(() => getUserTopArtist(spotifyId), userTopArtistsRef);
  const userTopTracks = useLazyLoadData(() => getUserTopTrack(spotifyId), userTopTracksRef);
  const analyticsData = useLazyLoadData(() => getUserAnalyticsData(spotifyId), analyticsRef);

  // Removed redundant client-side token check

  return (
    <div className="flex flex-col justify-center w-full">
      <NavBar />
      <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData} />
      <div className={`flex flex-col justify-center w-full px-10 bg-[#111827] ${isMobile ? 'sm:px-32' : 'md:px-64'}`}>
        <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} />
        <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} />
        <Analytics innerRef={analyticsRef} userAnalyticsData={analyticsData} />
      </div>
    </div>
  );
}
