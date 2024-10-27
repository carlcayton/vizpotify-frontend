package com.arian.vizpotifybackend.analytics.genre;

public record GenreDistributionDto(
        String genre,
        Integer genreCount,
        Double percentage
) {
}
