import { createContext, useContext, useState } from 'react';

interface ArtistDetail {
  topTracks: any[];
  relatedArtists: any[];
}

interface ArtistDetailsState {
  [artistId: string]: ArtistDetail;
}

const ArtistDetailsContext = createContext<ArtistDetailsState | undefined>(undefined);
const ArtistDetailsDispatchContext = createContext<(artistId: string, data: ArtistDetail) => void | undefined>(undefined);

export const ArtistDetailsProvider: React.FC = ({ children }) => {
  const [artistDetails, setArtistDetails] = useState<ArtistDetailsState>({});

  const storeArtistDetails = (artistId: string, data: ArtistDetail) => {
    setArtistDetails(prevState => ({
      ...prevState,
      [artistId]: data,
    }));
  };

  return (
    <ArtistDetailsContext.Provider value={artistDetails}>
      <ArtistDetailsDispatchContext.Provider value={storeArtistDetails}>
        {children}
      </ArtistDetailsDispatchContext.Provider>
    </ArtistDetailsContext.Provider>
  );
};

export const useArtistDetails = () => {
  return useContext(ArtistDetailsContext);
};

export const useStoreArtistDetails = () => {
  return useContext(ArtistDetailsDispatchContext);
};
