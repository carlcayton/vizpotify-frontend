import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserProfileCard from './common/UserProfileCard';
import SimilarityMeter from './common/SimilarityMeter';
import CommonItemsGrid from './common/CommonItemsGrid';
import MusicEraComparison from './MusicEraComparison';
import TrackFeaturesComparison from './TrackFeaturesComparison';
import type {
    TrackFeaturesComparisonProps,
    UserTrackFeatureStatsMap
} from '@/types/trackFeatures';
import GenreDistributionComparison from './GenreDistributionComparison';
import { ProfileData } from '@/types/comparison';
import { ArtistDto, TrackDto } from '@/services/comparisonService';

interface ComparisonSectionProps {
    user1: ProfileData;
    user2: ProfileData;
    similarityData: {
        artists: number;
        tracks: number;
    };
    commonItems: {
        commonArtists: ArtistDto[];
        commonTracks: TrackDto[];
    };
    musicEraSummary: {
        [key: string]: {
            userSpotifyId: string;
            eraSummariesByTimeRange: {
                [key: string]: Array<{
                    releaseDateRange: string;
                    trackCount: number;
                    percentage: number;
                }>;
            };
        };
    };
    trackFeatureStats: {  // Updated this to use proper type
        [key: string]: UserTrackFeatureStatsMap;
    };

    genreDistribution: {
        [key: string]: {
            userSpotifyId: string;
            genreDistributionsByTimeRange: {
                [key: string]: Array<{
                    genre: string;
                    genreCount: number;
                    percentage: number;
                }>;
            };
        };
    };
    isLoading?: boolean;
    error?: Error | null;
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({
    user1,
    user2,
    similarityData,
    commonItems,
    musicEraSummary,
    genreDistribution,
    trackFeatureStats,
    isLoading,
    error
}) => {
    const [visibleSections, setVisibleSections] = useState<string[]>([]);
    const observer = useRef<IntersectionObserver>();

    // Add this function
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisibleSections(prev => [...new Set([...prev, entry.target.id])]);
            }
        });
    };

    // Add ref callback function
    const sectionRef = useCallback((node: HTMLElement | null) => {
        if (node) {
            observer.current?.observe(node);
        }
    }, []);


    return (

        <div className="min-h-screen bg-gray-900 text-white p-4 space-y-4">
            <div className="sticky top-0 z-50 w-full h-1 bg-gray-800">
                <div
                    className="h-full bg-theme-green-1 transition-all duration-500"
                    style={{ width: `${(visibleSections.length / 4) * 100}%` }}
                />
            </div>
            {/* User Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UserProfileCard profile={user1} />
                <UserProfileCard profile={user2} />
            </div>

            <Card className="bg-gray-800/95 border-gray-700 transition-all duration-300">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-medium">Music Taste Similarity</CardTitle>
                    <CardDescription className="text-sm text-gray-400">How much your music preferences align</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800/50 rounded-lg">
                    <SimilarityMeter
                        value={similarityData.artists}
                        label="Artist Similarity"
                        className="transform transition-all duration-300 hover:scale-102"
                    />
                    <SimilarityMeter
                        value={similarityData.tracks}
                        label="Track Similarity"
                        className="transform transition-all duration-300 hover:scale-102"
                    />
                </CardContent>
            </Card>

            {/* Common Items */}
            <Card className="bg-gray-800/95 border-gray-700 p-6 mt-8">
                <CardHeader className="px-0 pb-4">
                    <CardTitle className="text-xl font-medium">Common Music Taste</CardTitle>
                    <CardDescription className="text-sm text-gray-400">Music you both enjoy listening to</CardDescription>
                </CardHeader>
                <Tabs defaultValue="artists" className="w-full">
                    <TabsList className="w-full bg-gray-800">
                        <TabsTrigger value="artists" className="flex-1">
                            Common Artists ({commonItems.commonArtists.length})
                        </TabsTrigger>
                        <TabsTrigger value="tracks" className="flex-1">
                            Common Tracks ({commonItems.commonTracks.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="artists" className="mt-6">
                        <CommonItemsGrid
                            items={commonItems.commonArtists}
                            type="artist"
                            emptyMessage="No common artists found"
                        />
                    </TabsContent>

                    <TabsContent value="tracks" className="mt-6">
                        <CommonItemsGrid
                            items={commonItems.commonTracks}
                            type="track"
                            emptyMessage="No common tracks found"
                        />
                    </TabsContent>
                </Tabs>
            </Card>

            <div className="mt-6">
                <TrackFeaturesComparison
                    user1Profile={user1}
                    user2Profile={user2}
                    trackFeatureStats={trackFeatureStats}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
            {/* Music Era Comparison */}
            <div className="mt-6">
                <MusicEraComparison
                    user1Profile={user1}
                    user2Profile={user2}
                    musicEraSummary={musicEraSummary}
                    isLoading={isLoading}
                    error={error}
                />
            </div>

            {/* Genre Distribution Comparison */}
            <div className="mt-6">
                <GenreDistributionComparison
                    user1Profile={user1}
                    user2Profile={user2}
                    genreDistribution={genreDistribution}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default ComparisonSection;