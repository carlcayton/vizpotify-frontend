package com.arian.vizpotifybackend.analytics.era;

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
public class UserMusicEraSummaryMapDto {
    private String userSpotifyId;
    private Map<String, List<UserMusicEraSummaryDto>> eraSummariesByTimeRange;
}
