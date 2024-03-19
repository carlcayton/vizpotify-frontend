
import axios from 'axios'
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ProfileHeader from "components/ProfileHeader";
import TopTracks from "components/TopTracks";
import Analytics from "components/Analytics";
import {
  getProfileHeaderData,
  getUserTopArtist,
  getUserTopTrack,
  getUserAnalyticsData,
  getCommentsForUser
} from "../../services/userService";
import { getMusicData } from "../../services/musicService";
import useLazyLoadData from "../../utils/lazyLoadData";
import { useIsMobile } from "utils/detectScreenSize";
import NavBar from 'components/composite/NavBar';
import CommentSection from 'components/CommentSection';
import TopArtists from 'components/TopArtists';

export default function Dashboard() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [spotifyId, setSpotifyId] = useState(null);
  const [profileHeaderData, setProfileHeaderData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  const profileHeaderRef = useRef(null);
  const userTopArtistsRef = useRef(null);
  const userTopTracksRef = useRef(null);
  const analyticsRef = useRef(null);
  const commentsRef = useRef(null)

  const userTopArtists = useLazyLoadData(() => spotifyId && getUserTopArtist(spotifyId), userTopArtistsRef);
  const userTopTracks = useLazyLoadData(() => spotifyId && getUserTopTrack(spotifyId), userTopTracksRef);
  const commentsData = useLazyLoadData(() => spotifyId && getCommentsForUser(spotifyId), commentsRef);

  useEffect(() => {
    if (router.isReady) {
      const querySpotifyId = router.query.spotifyId;
      if (querySpotifyId) {
        setSpotifyId(querySpotifyId);
      }
    }
  }, [router.isReady, router.query.spotifyId]);

  useEffect(() => {
    const fetchData = async () => {
      if (spotifyId) {
        const data = await getProfileHeaderData(spotifyId);
        setProfileHeaderData(data);
      }
    };
    fetchData();
  }, [spotifyId]);


  return (
    <div className="flex flex-col justify-center w-full">
      <NavBar />
      {profileHeaderData && <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData} />}
      <div className={`flex flex-col justify-center w-full px-10 bg-[#111827] ${isMobile ? 'sm:px-32' : 'md:px-64'}`}>
        {/* <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} /> */}
        {/* <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} /> */}
        <Analytics innerRef={analyticsRef} spotifyId={spotifyId} />
        {profileHeaderData && <CommentSection innerRef={commentsRef} spotifyId={spotifyId} />}
      </div>
    </div>
  );


}
