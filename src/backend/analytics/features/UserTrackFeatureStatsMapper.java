package com.arian.vizpotifybackend.analytics.features;

import com.arian.vizpotifybackend.analytics.util.AnalyticsUtility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserTrackFeatureStatsMapper {
    UserTrackFeatureStatsDto toDto(UserTrackFeatureStats userTrackFeatureStats);
    List<UserTrackFeatureStatsDto> toDtoList(List<UserTrackFeatureStats> userTrackFeatureStatsList);

    @Mapping(target = "userSpotifyId", source = "userSpotifyId")
    @Mapping(target = "featureStatsByTimeRange", expression = "java(mapFeatureStatsByTimeRange(userTrackFeatureStatsList))")
    UserTrackFeatureStatsMapDto toMapDto(String userSpotifyId, List<UserTrackFeatureStats> userTrackFeatureStatsList);

    default Map<String, UserTrackFeatureStatsDto> mapFeatureStatsByTimeRange(List<UserTrackFeatureStats> userTrackFeatureStatsList) {
        return userTrackFeatureStatsList.stream()
                .collect(Collectors.toMap(
                        stats -> AnalyticsUtility.toCamelCase(stats.getTimeRange()),
                        this::toDto
                ));
    }
}
