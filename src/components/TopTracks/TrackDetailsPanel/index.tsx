
import React, { useContext, useState, useEffect } from 'react';
import { SelectedTrackContext } from 'contexts/SelectedTrackContext';
import { useIsMobile } from 'utils/detectScreenSize';

const TrackDetailsPanel = () => {
    const selectedTrack = useContext(SelectedTrackContext);

    const isMobile = useIsMobile();
    const classForSMScreen = isMobile ? 'border' : 'sticky';

    // Assuming getTrackExtraInfo is a function that fetches additional information about the track
    //   const [trackDetails, setTrackDetails] = useState(null);

    //   useEffect(() => {
    //     if (selectedTrack) {
    //       getTrackExtraInfo(selectedTrack.id)
    //         .then(data => {
    //           setTrackDetails(data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching track details:', error);
    //         });
    //     }
    //   }, [selectedTrack]);

    return (
        <div className="flex flex-col w-full">
            {selectedTrack ? (
                <div className={`${classForSMScreen} flex-col rounded-lg px-6 py-6 space-y-4 mr-4 top-0 w-full bg-[#1B2539]`}>
                    <h2 className="text-white text-lg font-bold">{selectedTrack.name}</h2>
                </div>
            ) : null}
        </div>
    );
};

export default TrackDetailsPanel;
