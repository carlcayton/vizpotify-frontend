
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ProfileHeader from "components/ProfileHeader";
import TopTracks from "components/TopTracks";
import Analytics from "components/Analytics";
import {
  getProfileHeaderData,
  getUserTopArtist,
  getUserTopTrack,
} from "../../services/userService";
import useLazyLoadData from "../../utils/lazyLoadData";
import { useIsMobile } from "utils/detectScreenSize";
import NavBar from 'components/composite/NavBar';
import CommentSection from 'components/CommentSection';
import TopArtists from 'components/TopArtists';

import Modal from "components/base/Modal";

export default function Dashboard() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [spotifyId, setSpotifyId] = useState(null);
  const [profileHeaderData, setProfileHeaderData] = useState(null);
  const profileHeaderRef = useRef(null);
  const userTopArtistsRef = useRef(null);
  const userTopTracksRef = useRef(null);
  const analyticsRef = useRef(null);
  const commentsRef = useRef(null);
  const userTopArtists = useLazyLoadData(() => spotifyId && getUserTopArtist(spotifyId), userTopArtistsRef);
  const userTopTracks = useLazyLoadData(() => spotifyId && getUserTopTrack(spotifyId), userTopTracksRef);
  const modalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (router.isReady) {
      const querySpotifyId = router.query.spotifyId;
      if (querySpotifyId) {
        setSpotifyId(querySpotifyId as string);
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
        if (modalRef.current) {
          (modalRef.current as HTMLInputElement).checked = true;
          setTimeout(() => {
            (modalRef.current as HTMLInputElement).checked = false;
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
      {profileHeaderData && (
        <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData}
        />
      )}
      <div className={`flex flex-col justify-center w-full px-10 bg-[#111827] ${isMobile ? 'sm:px-32' : 'md:px-64'}`}>
        <TopTracks innerRef={userTopTracksRef} userTopTracksAllTimeRange={userTopTracks} />
        <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists} />
        <Analytics innerRef={analyticsRef} spotifyId={spotifyId} />
        {profileHeaderData && <CommentSection innerRef={commentsRef} spotifyId={spotifyId} />}
      </div>
      <Modal
        title="User Not Found"
        message="The user you are trying to access does not exist. You will be redirected to the home page shortly."
        ref={modalRef}
      />
    </div>
  );
}