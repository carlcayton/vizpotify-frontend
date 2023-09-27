// import { useAuth } from "api/useAuth";
import React, { useState, useEffect, useRef} from "react";
import ProfileHeader from "components/ProfileHeader";
import TopArtists from "components/TopArtists";
import { getProfileHeaderData, getUserTopArtist } from "../api/dashboard/dashboardApi";
import useLazyLoadData from "../../utils/lazyLoadData";

export default function Dashboard() {
    const profileHeaderRef= useRef(null);
    const userTopArtistsRef = useRef(null);
    const tracksRef = useRef(null);
    const analyticsRef = useRef(null);

     const profileHeaderData = useLazyLoadData(getProfileHeaderData, profileHeaderRef);
     const userTopArtists = useLazyLoadData(getUserTopArtist,userTopArtistsRef)
  return (
    <div className="flex flex-col  justify-center  ">
      <ProfileHeader innerRef={profileHeaderRef} {...profileHeaderData}/>
      <TopArtists innerRef={userTopArtistsRef} userTopArtistsAllTimeRange={userTopArtists}/> 
    </div>
  );
}
