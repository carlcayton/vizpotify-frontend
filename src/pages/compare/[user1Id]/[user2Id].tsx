import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/components/layout/NavBar';
import ComparisonSection from '@/components/comparison/ComparisonSection';
import { comparisonService } from '@/services/comparisonService';
import { userService } from '@/services/userService';
import { ProfileData } from '@/types/comparison';
import { Skeleton } from '@/components/ui/skeleton';

const ComparisonSkeleton = () => (
  <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-32 bg-gray-800" />
      <Skeleton className="h-32 bg-gray-800" />
    </div>
    <Skeleton className="h-40 bg-gray-800" />
    <Skeleton className="h-96 bg-gray-800" />
  </div>
);

const ComparisonErrorState = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-center">
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p className="text-gray-400">{message}</p>
    </div>
  </div>
);

const ComparePage = () => {
  const router = useRouter();
  const { user1Id, user2Id } = router.query;

  // Fetch comparison data
  const {
    data: comparisonData,
    isLoading: isLoadingComparison,
    error: comparisonError,
    isSuccess: isComparisonSuccess
  } = useQuery({
    queryKey: ['comparison', user1Id, user2Id],
    queryFn: () => comparisonService.getComparison(user1Id as string, user2Id as string),
    enabled: Boolean(user1Id) && Boolean(user2Id),
    retry: 2,
    staleTime: 30000, // Optional: Keep the data fresh for 30 seconds
  });

  // Fetch user 1 profile
  const {
    data: user1Profile,
    isLoading: isLoadingUser1,
    isSuccess: isUser1Success
  } = useQuery({
    queryKey: ['profileHeader', user1Id],
    queryFn: () => userService.getProfileHeaderData(user1Id as string),
    enabled: Boolean(user1Id),
    retry: 2,
  });

  // Fetch user 2 profile
  const {
    data: user2Profile,
    isLoading: isLoadingUser2,
    isSuccess: isUser2Success
  } = useQuery({
    queryKey: ['profileHeader', user2Id],
    queryFn: () => userService.getProfileHeaderData(user2Id as string),
    enabled: Boolean(user2Id),
    retry: 2,
  });

  // Loading state
  if (isLoadingComparison || isLoadingUser1 || isLoadingUser2) {
    return (
      <div className="flex flex-col">
        <NavBar />
        <ComparisonSkeleton />
      </div>
    );
  }

  // Error states
  if (comparisonError) {
    return (
      <div className="flex flex-col">
        <NavBar />
        <ComparisonErrorState message="Error loading comparison data. Please try again later." />
      </div>
    );
  }

  // Success state - only render when we have all the data
  if (isComparisonSuccess && isUser1Success && isUser2Success &&
    comparisonData && user1Profile && user2Profile) {

    const user1Data: ProfileData = {
      spotifyId: user1Id as string,
      displayName: user1Profile.userDisplayName,
      imageUrl: user1Profile.profilePictureUrl,
      followers: user1Profile.followerCount,
      following: user1Profile.followedArtistCount
    };

    const user2Data: ProfileData = {
      spotifyId: user2Id as string,
      displayName: user2Profile.userDisplayName,
      imageUrl: user2Profile.profilePictureUrl,
      followers: user2Profile.followerCount,
      following: user2Profile.followedArtistCount
    };

    const safeCommonItems = {
      commonArtists: comparisonData.commonItems?.commonArtists || [],
      commonTracks: comparisonData.commonItems?.commonTracks || []
    };

    return (
      <div className="flex flex-col">
        <NavBar />
        <ComparisonSection
          user1={user1Data}
          user2={user2Data}
          similarityData={{
            artists: Math.round(comparisonData.jaccardSimilarity.artists * 100),
            tracks: Math.round(comparisonData.jaccardSimilarity.tracks * 100)
          }}
          commonItems={safeCommonItems}
          musicEraSummary={comparisonData.musicEraSummary}
          genreDistribution={comparisonData.genreDistribution}
          isLoading={isLoadingComparison}
          error={comparisonError}
        />
      </div>
    );
  }

  // Fallback loading state
  return (
    <div className="flex flex-col">
      <NavBar />
      <ComparisonSkeleton />
    </div>
  );
};

export default ComparePage;