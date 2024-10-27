
package com.arian.vizpotifybackend.analytics.core;

import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryService;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsAggregator {

    private final UserTrackFeatureStatsService userTrackFeatureStatsService;
    private final UserMusicEraSummaryService userMusicEraSummaryService;


    private List<Map<String, Object>> ensureAllErasPresent(List<Map<String, Object>> results) {
        List<String> allEras = Arrays.asList("1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s", "< 1950");
        Map<String, Map<String, Object>> resultsByEra = results.stream()
                .collect(Collectors.toMap(
                        result -> (String) result.get("releaseDateRange"),
                        result -> result
                ));

        return allEras.stream()
                .map(era -> resultsByEra.computeIfAbsent(era, k -> createDefaultEraResult(k)))
                .collect(Collectors.toList());
    }

    private Map<String, Object> createDefaultEraResult(String era) {
        Map<String, Object> defaultResult = new HashMap<>();
        defaultResult.put("releaseDateRange", era);
        defaultResult.put("trackCount", 0);
        defaultResult.put("percentage", BigDecimal.ZERO);
        return defaultResult;
    }

}