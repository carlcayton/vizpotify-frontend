package com.arian.vizpotifybackend.analytics.era;

public record UserMusicEraSummaryDto(
        String releaseDateRange,
        Integer trackCount,
        Double percentage
) {
}
