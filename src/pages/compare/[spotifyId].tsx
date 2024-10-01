import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from 'components/layout/NavBar';
import ProfileHeader from 'components/ProfileHeader';
import { getComparisonData, } from 'services/commonService';
import { getProfileHeaderData } from 'services/userService';
import Modal from "components/common/Modal";
import SimilarityMeter from 'components/comparison/Similarity';

export default function ComparisonPage() {
  const router = useRouter();
  const [spotifyId, setSpotifyId] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [profileHeaderData, setProfileHeaderData] = useState(null);
  const profileHeaderRef = useRef(null);
  const modalRef = useRef(null);

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
          const data = await getComparisonData(spotifyId);
          setComparisonData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Failed to fetch comparison data:", error);
      }
    };
    fetchData();
  }, [spotifyId]);

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
        <ProfileHeader
          innerRef={profileHeaderRef}
          {...profileHeaderData}
        />
      )}

      <div className="flex flex-col justify-center w-full px-10 bg-[#111827]">
        {comparisonData && (
          <>
            <SimilarityMeter
              similarity={Math.round(comparisonData.jaccard_similarity.artist * 100)}
              itemType="artist"
            />
            <SimilarityMeter
              similarity={Math.round(comparisonData.jaccard_similarity.track * 100)}
              itemType="track"
            />
          </>
        )}
      </div>
      <Modal
        title="User Not Found"
        message="The user you are trying to access does not exist. You will be redirected to the home page shortly."
        ref={modalRef}
      />
    </div>
  );
}