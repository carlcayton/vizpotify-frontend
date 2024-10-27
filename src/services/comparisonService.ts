import { apiRequest } from './commonService';

export interface ArtistDto {
    id: string;
    name: string;
    genres: string[];
    popularity: number;
    imageUrl: string;
    followers: number;
}

export interface TrackDto {
    id: string;
    name: string;
    artists: string[];
    duration: number;
    albumName: string;
    albumImageUrl: string;
    popularity: number;
    releaseDate: string;
}

export interface ComparisonDto {
    commonItems: {
        commonArtists: ArtistDto[];  // Changed from Set to Array
        commonTracks: TrackDto[];    // Changed from Set to Array
    };
    jaccardSimilarity: {
        artists: number;
        tracks: number;
    };
    tracks: {
        [key: string]: TrackDto[];
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
    trackFeatureStats: {
        [key: string]: {
            userSpotifyId: string;
            featureStatsByTimeRange: {
                [key: string]: {
                    acousticness: string;
                    danceability: string;
                    energy: string;
                    instrumentalness: string;
                    liveness: string;
                    speechiness: string;
                    valence: string;
                };
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
    artistTrackCount: {
        [key: string]: {
            userSpotifyId: string;
            artistTrackCountsByTimeRange: {
                [key: string]: Array<{
                    artistName: string;
                    trackCount: number;
                    percentage: number;
                }>;
            };
        };
    };
}

export const comparisonService = {
    getComparison: async (user1Id: string, user2Id: string): Promise<ComparisonDto> => {
        try {
            const response = await apiRequest(`comparison/${user1Id}/${user2Id}`, 'get');
            // Ensure we're working with arrays
            return {
                ...response,
                commonItems: {
                    commonArtists: Array.isArray(response.commonItems.commonArtists)
                        ? response.commonItems.commonArtists
                        : [],
                    commonTracks: Array.isArray(response.commonItems.commonTracks)
                        ? response.commonItems.commonTracks
                        : []
                }
            };
        } catch (error) {
            console.error('Error fetching comparison data:', error);
            throw error;
        }
    }
};