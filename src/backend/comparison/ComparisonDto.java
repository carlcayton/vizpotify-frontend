package com.arian.vizpotifybackend.comparison;

import com.arian.vizpotifybackend.analytics.artist.UserArtistTrackCountMapDto;
import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryMapDto;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsMapDto;
import com.arian.vizpotifybackend.analytics.genre.UserGenreDistributionMapDto;
import com.arian.vizpotifybackend.track.TrackDto;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public record ComparisonDto(
        CommonItemsDto commonItems,
        Map<String, Double> jaccardSimilarity,
        Map<String, List<TrackDto>> tracks,
        Map<String, UserMusicEraSummaryMapDto> musicEraSummary,
        Map<String, UserTrackFeatureStatsMapDto> trackFeatureStats,
        Map<String, UserGenreDistributionMapDto> genreDistribution,
        Map<String, UserArtistTrackCountMapDto> artistTrackCount
) {}
