import React, { useRef, useEffect } from 'react';

import { TreeMapComponent } from '@syncfusion/ej2-react-treemap';


interface TreeMapProps {
    treeData: ArtistTrackData[];
}

const TreeMap: React.FC<TreeMapProps> = ({ treeData }) => {
    return <TreeMapComponent
        dataSource={treeData}
        weightValuePath="track_count"
        levels={[
            { groupPath: 'artist_name', headerTemplate: '${groupPath}' }
        ]}
    />;
};
export default TreeMap;
