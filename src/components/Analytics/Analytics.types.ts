export type TimeRange = 'shortTerm' | 'mediumTerm' | 'longTerm';

export type TimeRangedData<T> = Record<TimeRange, T[]>;

export interface UserTrackFeatureStats {
    danceability: number;
    energy: number;
    loudness: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number; 

}

export interface GenreDistribution {
    genre: string;
    percentage: number;
}

export interface MusicEraSummary {
    era: string;
    percentage: number;
}

export interface ArtistTrackCount {
    artistName: string;
    trackCount: number;
}

export interface AnalyticsData {
    userTrackFeatureStats: TimeRangedData<UserTrackFeatureStats>;
    userGenreDistribution: TimeRangedData<GenreDistribution>;
    userMusicEraSummary: TimeRangedData<MusicEraSummary>;
    userArtistTrackCount: TimeRangedData<ArtistTrackCount>;
}