package com.arian.vizpotifybackend.analytics.genre;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserGenreDistributionMapDto {
    private String userSpotifyId;
    private Map<String, List<GenreDistributionDto>> genreDistributionsByTimeRange;
}
