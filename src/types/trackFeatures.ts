// types/trackFeatures.ts

export interface TrackFeatureStats {
    acousticness: string;
    danceability: string;
    energy: string;
    instrumentalness: string;
    liveness: string;
    speechiness: string;
    valence: string;
}

export interface TrackFeatureTimeRangeData {
    [timeRange: string]: TrackFeatureStats;
}

export interface UserTrackFeatureStatsMap {
    userSpotifyId: string;
    featureStatsByTimeRange: TrackFeatureTimeRangeData;
}

export interface TrackFeaturesComparisonProps {
    user1Profile: {
        spotifyId: string;
        displayName: string;
    };
    user2Profile: {
        spotifyId: string;
        displayName: string;
    };
    trackFeatureStats: {
        [key: string]: UserTrackFeatureStatsMap;
    };
    isLoading?: boolean;
    error?: Error | null;
}