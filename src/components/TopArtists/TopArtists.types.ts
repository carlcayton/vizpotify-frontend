import { Dispatch, SetStateAction } from 'react';

export type TimeRange = "shortTerm" | "mediumTerm" | "longTerm";

export interface Track {
  id: string;
  name: string;
  artists: string[];
  duration: number;
  albumName: string;
  albumImageUrl: string;
  popularity: number;
  releaseDate: string;
}

export interface RelatedArtist {
  id: string;
  followersTotal: number;
  name: string;
  popularity: number;
  externalUrl: string;
  imageUrl: string;
  genres: string[];
  rank: number | null;
}

export interface ArtistExtraInfo {
  artistTopTracks: Track[];
  relatedArtists: RelatedArtist[];
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  imageUrl: string;
  followers: number;
}

export interface ShowMoreState {
  isExpanded: boolean;
  itemsToShow: number;
  totalItems: number;
}

export interface ArtistExtraInfo {
  topTracks: {
    name: string;
    albumName: string;
    duration: number;
    albumImageUrl: string;
    albumImageUrlExternal?: string;
    popularity: number;
    releaseDate: string;
    releaseDateExternal?: string;
    id: string;
  }[];
  similarArtists: Artist[];
}

export interface ArtistDetailsPanelProps {
  artist: Artist | null;
}

export interface ArtistCardProps {
  artist: Artist;
  rank: number;
  isSelected: boolean;
  onSelect: (artist: Artist | null) => void;
}

export interface ArtistsSelectionListProps {
  userTopArtists: Artist[];
  showMore: ShowMoreState;
  selectedArtist: Artist | null;
  setSelectedArtist: Dispatch<SetStateAction<Artist | null>>;
}

export interface TopArtistsProps {
  spotifyId: string;
}