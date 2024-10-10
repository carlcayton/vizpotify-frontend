import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query'
import ProfileHeader from "@/components/ProfileHeader";
import TopTracks from "@/components/TopTracks";
import Analytics from "@/components/Analytics";
import NavBar from '@/components/layout/NavBar';
import CommentSection from '@/components/CommentSection';
import Modal from "@/components/common/Modal";

import { useIsMobile } from "utils/detectScreenSize";


export default function Dashboard() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { spotifyId } = router.query;
  const modalRef = useRef<HTMLInputElement>(null);



  return (
    <div className="flex flex-col justify-center w-full">
      <NavBar />
      <ProfileHeader spotifyId={spotifyId as string} />
      <div className={`flex flex-col justify-center w-full px-10 bg-[#111827] ${isMobile ? 'sm:px-32' : 'md:px-64'}`}>
        {/* <TopTracks spotifyId={spotifyId as string} /> */}
        {/* <TopArtists spotifyId={spotifyId as string} /> */}
        {/* <Analytics spotifyId={spotifyId as string} /> */}
        <CommentSection spotifyId={spotifyId as string} />
      </div>
      <Modal
        title="User Not Found"
        message="The user you are trying to access does not exist. You will be redirected to the home page shortly."
        ref={modalRef}
      />
    </div>
  );
}
