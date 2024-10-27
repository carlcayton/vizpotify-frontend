package com.arian.vizpotifybackend.analytics.features;

public record UserTrackFeatureStatsDto(
        String acousticness,
        String danceability,
        String energy,
        String instrumentalness,
        String liveness,
        String speechiness,
        String valence
) {
}
