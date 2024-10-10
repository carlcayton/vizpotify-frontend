
export type TimeRange = "shortTerm" | "mediumTerm" | "longTerm";

export interface Track {
  id: string;
  name: string;
  artists: string[];
  duration: number;
  albumName: string;
  albumImageUrl: string;
  albumImageUrlExternal?: string;
  popularity: number;
  releaseDate: string;
  releaseDateExternal?: string;
  audioFeatures?: AudioFeatures;
}

export interface AudioFeatures {
  id: string;
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  valence: number;
  tempo: number;
}

export interface ShowMoreState {
  isExpanded: boolean;
  itemsToShow: number;
  totalItems: number;
}

export interface TrackDetailsPanelProps {
  track: Track;
}

export interface TrackCardProps {
  track: Track;
  rank: number;
  isSelected: boolean;
  onSelect: (track: Track | null) => void;
}

export interface TracksSelectionListProps {
  userTopTracks: Track[] | undefined;
  showMore: ShowMoreState;
}

export interface TopTracksProps {
  spotifyId: string;
}