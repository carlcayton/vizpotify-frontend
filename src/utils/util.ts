
function formatDuration(durationMs) {
    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(durationMs / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad the minutes and seconds with leading zeros if needed
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    // Concatenate minutes and seconds with a colon
    return `${paddedMinutes}:${paddedSeconds}`;
}
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

export {
    formatDuration,
    formatDate
}