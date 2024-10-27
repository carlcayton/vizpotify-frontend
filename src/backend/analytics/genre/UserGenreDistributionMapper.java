package com.arian.vizpotifybackend.analytics.genre;

import com.arian.vizpotifybackend.analytics.util.AnalyticsUtility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserGenreDistributionMapper {
    GenreDistributionDto toDto(UserGenreDistribution userGenreDistribution);

    @Mapping(target = "userSpotifyId", source = "userSpotifyId")
    @Mapping(target = "genreDistributionsByTimeRange", expression = "java(mapGenreDistributionsByTimeRange(userGenreDistributions))")
    UserGenreDistributionMapDto toMapDto(String userSpotifyId, List<UserGenreDistribution> userGenreDistributions);



    default Map<String, List<GenreDistributionDto>> mapGenreDistributionsByTimeRange(List<UserGenreDistribution> userGenreDistributions) {
        return userGenreDistributions.stream()
                .collect(Collectors.groupingBy(
                        distribution -> AnalyticsUtility.toCamelCase(distribution.getTimeRange()),
                        Collectors.mapping(this::toDto, Collectors.toList())
                ));
    }
}
