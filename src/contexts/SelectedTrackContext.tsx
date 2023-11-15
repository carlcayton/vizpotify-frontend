import React, { createContext, useState } from "react";

const SelectedTrackContext = createContext(null);
const SelectedTrackDispatchContext = createContext(undefined);

function SelectedTrackProvider({ children }) {
    const [selectedTrackId, setSelectedTrackId] = useState(null);

    return (
        <SelectedTrackContext.Provider value={selectedTrackId}>
            <SelectedTrackDispatchContext.Provider value={setSelectedTrackId}>
                {children}
            </SelectedTrackDispatchContext.Provider>
        </SelectedTrackContext.Provider>
    );
}

export { SelectedTrackProvider, SelectedTrackContext, SelectedTrackDispatchContext };
