export type TimeRange = 'shortTerm' | 'mediumTerm' | 'longTerm';

export interface UserTrackFeatureStatsData {
  acousticness: string;
  danceability: string;
  energy: string;
  instrumentalness: string;
  liveness: string;
  speechiness: string;
  valence: string;
}

export interface UserTrackFeatureStats {
  userSpotifyId: string;
  featureStatsByTimeRange: {
    [key in TimeRange]: UserTrackFeatureStatsData;
  };
}

export interface UserGenreDistributionData {
  genre: string;
  genreCount: number;
  percentage: number;
}

export interface UserGenreDistribution {
  userSpotifyId: string;
  genreDistributionsByTimeRange: {
    [key in TimeRange]: UserGenreDistributionData[];
  };
}

export interface MusicEraItem {
  releaseDateRange: string;
  trackCount: number;
  percentage: number;
}

export interface UserMusicEraSummary {
  userSpotifyId: string;
  eraSummariesByTimeRange: {
    [key in TimeRange]: MusicEraItem[];
  };
}

export interface ArtistTrackCountItem {
  artistName: string;
  trackCount: number;
  percentage: number;
}

export interface UserArtistTrackCount {
  userSpotifyId: string;
  artistTrackCountsByTimeRange: {
    [key in TimeRange]: ArtistTrackCountItem[];
  };
}
