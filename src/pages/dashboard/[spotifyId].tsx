
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
  const modalRef = useRef(null);
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
      try {
        if (spotifyId) {
          const data = await getProfileHeaderData(spotifyId);
          setProfileHeaderData(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile header data:", error);
        // Display modal on error
        if (modalRef.current) {
          modalRef.current.checked = true;
          setTimeout(() => {
            modalRef.current.checked = false;
            router.push('/');
          }, 3000);
        }
      }
    };
    fetchData();
  }, [spotifyId]);


  return (
    <div className="flex flex-col justify-center w-full">
      <NavBar />
      {profileHeaderData && <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData} />}
      <div className={`flex flex-col justify-center w-full px-10 bg-[#111827] ${isMobile ? 'sm:px-32' : 'md:px-64'}`}>
        <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} />
        <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} />
        <Analytics innerRef={analyticsRef} spotifyId={spotifyId} />
        {profileHeaderData && <CommentSection innerRef={commentsRef} spotifyId={spotifyId} />}
      </div>

      <label htmlFor="my_modal_7" className="btn hidden">open modal</label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" ref={modalRef} />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">User Not Found</h3>
          <p className="py-4">The user you are trying to access does not exist. You will be redirected to the home page shortly.</p>
          <div className="modal-action">
            <label htmlFor="my_modal_7" className="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  );
}
