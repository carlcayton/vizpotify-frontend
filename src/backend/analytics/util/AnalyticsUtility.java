package com.arian.vizpotifybackend.analytics.util;

import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStats;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class AnalyticsUtility {

    public static <T, R> Map<String, R> groupByTimeRange(
            List<T> input,
            Function<T, String> timeRangeExtractor,
            Function<T, R> mapper
    ) {
        return input.stream()
                .collect(Collectors.toMap(
                        timeRangeExtractor,
                        mapper,
                        (existing, replacement) -> existing
                ));
    }


    public static String toCamelCase(String snakeStr) {
        String[] parts = snakeStr.split("_");
        StringBuilder camelCaseString = new StringBuilder(parts[0]);
        for (int i = 1; i < parts.length; i++) {
            camelCaseString.append(Character.toUpperCase(parts[i].charAt(0)))
                    .append(parts[i].substring(1));
        }
        return camelCaseString.toString();
    }

}
