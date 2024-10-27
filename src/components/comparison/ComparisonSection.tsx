import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserProfileCard from './common/UserProfileCard';
import SimilarityMeter from './common/SimilarityMeter';
import CommonItemsGrid from './common/CommonItemsGrid';
import MusicEraComparison from './MusicEraComparison';
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
    isLoading,
    error
}) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 space-y-6">
            {/* User Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserProfileCard profile={user1} />
                <UserProfileCard profile={user2} />
            </div>

            {/* Similarity Metrics */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle>Music Taste Similarity</CardTitle>
                    <CardDescription>How much your music preferences align</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SimilarityMeter
                        value={similarityData.artists}
                        label="Artist Similarity"
                    />
                    <SimilarityMeter
                        value={similarityData.tracks}
                        label="Track Similarity"
                    />
                </CardContent>
            </Card>

            {/* Common Items */}
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