import React, { createContext, useContext, useState } from 'react';

// Define your TrackDetail interface
interface TrackDetail {
    audioFeatures: any[]; // Define the structure more specifically based on your data
}

// Define the state structure for TrackDetails
interface TrackDetailsState {
    [trackId: string]: TrackDetail;
}

const TrackDetailsContext = createContext<TrackDetailsState | undefined>(undefined);
const TrackDetailsDispatchContext = createContext<(trackId: string, data: TrackDetail) => void | undefined>(undefined);

export const TrackDetailsProvider: React.FC = ({ children }) => {
    const [trackDetails, setTrackDetails] = useState<TrackDetailsState>({});

    const storeTrackDetails = (trackId: string, data: TrackDetail) => {
        setTrackDetails(prevState => ({
            ...prevState,
            [trackId]: data,
        }));
    };

    return (
        <TrackDetailsContext.Provider value={trackDetails}>
            <TrackDetailsDispatchContext.Provider value={storeTrackDetails}>
                {children}
            </TrackDetailsDispatchContext.Provider>
        </TrackDetailsContext.Provider>
    );
};

export const useTrackDetails = () => {
    return useContext(TrackDetailsContext);
};

export const useStoreTrackDetails = () => {
    return useContext(TrackDetailsDispatchContext);
};