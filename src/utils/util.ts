function formatDuration(durationMs) {
    const totalSeconds = Math.floor(durationMs / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
const getDataByTimeRange = ({ data, timeRange }) => {
    switch (timeRange) {
        case "shortTerm":
            return data?.shortTerm || [];
        case "mediumTerm":
            return data?.mediumTerm || [];
        case "longTerm":
            return data?.longTerm || [];
        default:
            return [];
    }
}
const getDataByTimeRange2 = ({ data, timeRange }) => {
    switch (timeRange) {
        case "short_term":
            return data?.shortTerm || [];
        case "medium_term":
            return data?.mediumTerm || [];
        case "long_term":
            return data?.longTerm || [];
        default:
            return [];
    }
}

export {
    formatDuration,
    formatDate,
    getDataByTimeRange
}