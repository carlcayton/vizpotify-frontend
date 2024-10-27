package com.arian.vizpotifybackend.analytics.era;

import com.arian.vizpotifybackend.analytics.util.AnalyticsUtility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMusicEraSummaryMapper {
    UserMusicEraSummaryDto toDto(UserMusicEraSummary userMusicEraSummary);

    @Mapping(target = "userSpotifyId", source = "userSpotifyId")
    @Mapping(target = "eraSummariesByTimeRange", expression = "java(mapEraSummariesByTimeRange(userMusicEraSummaries))")
    UserMusicEraSummaryMapDto toMapDto(String userSpotifyId, List<UserMusicEraSummary> userMusicEraSummaries);

    default Map<String, List<UserMusicEraSummaryDto>> mapEraSummariesByTimeRange(List<UserMusicEraSummary> userMusicEraSummaries) {
        return userMusicEraSummaries.stream()
                .collect(Collectors.groupingBy(
                        summary -> AnalyticsUtility.toCamelCase(summary.getTimeRange()),
                        Collectors.mapping(this::toDto, Collectors.toList())
                ));
    }
}
