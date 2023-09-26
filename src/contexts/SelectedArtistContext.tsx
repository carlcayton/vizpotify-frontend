import React, { createContext, useState } from "react";

const SelectedArtistContext = createContext(null);
const SelectedArtistDispatchContext = createContext(undefined);

function SelectedArtistProvider({ children }) {
    const [selectedArtistId, setSelectedArtistId] = useState(null);

    return (
        <SelectedArtistContext.Provider value={selectedArtistId}>
            <SelectedArtistDispatchContext.Provider value={setSelectedArtistId}>
                {children}
            </SelectedArtistDispatchContext.Provider>
        </SelectedArtistContext.Provider>
    );
}

export { SelectedArtistProvider, SelectedArtistContext, SelectedArtistDispatchContext };

