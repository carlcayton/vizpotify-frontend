package com.arian.vizpotifybackend.analytics.features;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserTrackFeatureStatsMapDto {
    private String userSpotifyId;
    private Map<String, UserTrackFeatureStatsDto> featureStatsByTimeRange;
}
