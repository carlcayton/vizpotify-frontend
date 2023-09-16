// import { useAuth } from "api/useAuth";
import React, { useState, useEffect, useRef} from "react";
import ProfileHeader from "components/ProfileHeader";
import TopArtists from "components/TopArtists";
import { getProfileHeaderData } from "../api/dashboard/dashboardApi";
import useLazyLoadData from "../../utils/lazyLoadData";


export default function Dashboard() {
    const profileHeaderRef= useRef(null);
    const artistsRef = useRef(null);
    const tracksRef = useRef(null);
    const analyticsRef = useRef(null);
    
     const profileHeaderData = useLazyLoadData(getProfileHeaderData(''), profileHeaderRef);
    // const artistsData = useLazyLoadData(() => getTopArtists(''), artistsRef);
    // const tracksData = useLazyLoadData(() => getTopTracks(''), tracksRef);
    // const analyticsData = useLazyLoadData(() => getAnalytics1(''), analyticsRef);
  return (
    <div className="flex flex-col  justify-center  ">
      <ProfileHeader {...profileHeaderData}/>
      {/* <TopArtists
        userTopArtists={userTopArtists}
        similarArtists={similarArtists}
      /> */}
    </div>
  );
}
