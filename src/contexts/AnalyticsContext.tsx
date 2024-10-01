import React, { createContext, useContext, useState } from 'react';

interface AudioFeature {
    userSpotifyId: string;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    speechiness: number;
    valence: number;
    tempo: number;
}

interface GenreDistribution {
    genre: string;
    genreCount: number;
    percentage: number;
}

interface MusicEraSummary {
    releaseDateRange: string;
    trackCount: number;
    percentage: number;
}

interface AnalyticsData {
    audioFeatures: {
        [key: string]: AudioFeature[];
    };
    genreDistribution: {
        [key: string]: GenreDistribution[];
    };
    musicEraSummary: {
        [key: string]: MusicEraSummary[];
    };
}


const AnalyticsDataContext = createContext<AnalyticsData | undefined>(undefined);
const AnalyticsDataDispatchContext = createContext<(data: AnalyticsData) => void | undefined>(undefined);

type AnalyticsDataProviderProps = {
    children: React.ReactNode;
};



export const AnalyticsDataProvider = ({ children }: AnalyticsDataProviderProps) => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
        audioFeatures: {},
        genreDistribution: {},
        musicEraSummary: {}
    });

    const storeAnalyticsData = (data: AnalyticsData) => {
        setAnalyticsData(data);
    };

    return (
        <AnalyticsDataContext.Provider value={analyticsData}>
            <AnalyticsDataDispatchContext.Provider value={storeAnalyticsData}>
                {children}
            </AnalyticsDataDispatchContext.Provider>
        </AnalyticsDataContext.Provider>
    );
};

export const useAnalyticsData = () => {
    return useContext(AnalyticsDataContext);
};

export const useStoreAnalyticsData = () => {
    return useContext(AnalyticsDataDispatchContext);
};
