package com.arian.vizpotifybackend.analytics.artist;

public record UserArtistTrackCountDto(
        String artistName,
        Integer trackCount,
        Double percentage
) {
}
