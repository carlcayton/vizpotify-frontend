export interface ProfileData {
  spotifyId: string;
  displayName: string;
  imageUrl?: string;
  followers?: number;
  following?: number;
}

export interface CommonItem {
  id: string;
  name: string;
}

export interface SimilarityData {
  artists: number;
  tracks: number;
}

export interface CommonItems {
  artists: Record<string, string>;
  tracks: Record<string, string>;
}