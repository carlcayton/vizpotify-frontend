package com.arian.vizpotifybackend.analytics.artist;

import com.arian.vizpotifybackend.analytics.AnalyticsResponse;
import com.arian.vizpotifybackend.user.topitems.track.UserTopTrack;
import com.arian.vizpotifybackend.user.topitems.track.UserTopTrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserArtistTrackCountService {
    private final UserArtistTrackCountRepository userArtistTrackCountRepository;
    private final UserArtistTrackCountMapper userArtistTrackCountMapper;
    private final UserTopTrackRepository userTopTrackRepository;

    @Transactional
    public AnalyticsResponse<UserArtistTrackCountMapDto> fetchUserArtistTrackCount(String spotifyId) {
        List<UserArtistTrackCount> existingCounts = userArtistTrackCountRepository.findAllByUserSpotifyId(spotifyId);
        if (!existingCounts.isEmpty()) {
            UserArtistTrackCountMapDto dto = userArtistTrackCountMapper.toMapDto(spotifyId, existingCounts);
            return new AnalyticsResponse<>("complete", "Data processing complete", dto);
        }

        for (String timeRange : Arrays.asList("short_term", "medium_term", "long_term")) {
            List<String> trackIds = userTopTrackRepository.findTrackIdsByUserSpotifyIdAndTimeRange(spotifyId, timeRange);
            if (trackIds.isEmpty()) {
                return new AnalyticsResponse<>("processing", "Data is being processed. Please try again later.", null);
            }
        }

        try {
            aggregateAndUpsertUserArtistTrackCount(spotifyId);
            List<UserArtistTrackCount> newCounts = userArtistTrackCountRepository.findAllByUserSpotifyId(spotifyId);
            UserArtistTrackCountMapDto dto = userArtistTrackCountMapper.toMapDto(spotifyId, newCounts);
            return new AnalyticsResponse<>("complete", "Data processing complete", dto);
        } catch (Exception e) {
            return new AnalyticsResponse<>("error", "Error processing artist track count", null);
        }
    }

    @Transactional
    public void aggregateAndUpsertUserArtistTrackCount(String spotifyUserId) {
        Stream.of("short_term", "medium_term", "long_term")
                .forEach(timeRange -> {
                    Optional<UserArtistTrackCount> existingCount = userArtistTrackCountRepository
                            .findFirstByUserSpotifyIdAndTimeRangeOrderByUpdatedAtDesc(spotifyUserId, timeRange);

                    if (existingCount.isEmpty() || isCountOutdated(existingCount.get())) {
                        userArtistTrackCountRepository.deleteByUserSpotifyIdAndTimeRange(spotifyUserId, timeRange);
                        List<UserArtistTrackCount> newCounts = calculateArtistTrackCounts(spotifyUserId, timeRange);
                        userArtistTrackCountRepository.saveAll(newCounts);
                    }
                });
    }

    private boolean isCountOutdated(UserArtistTrackCount count) {
        return count.getUpdatedAt().plusDays(7).isBefore(LocalDateTime.now());
    }

    private List<UserArtistTrackCount> calculateArtistTrackCounts(String spotifyUserId, String timeRange) {
        List<UserTopTrack> userTopTracks = userTopTrackRepository.findByUserSpotifyIdAndTimeRangeWithTrackDetails(spotifyUserId, timeRange);

        Map<String, Long> artistTrackCounts = userTopTracks.stream()
                .flatMap(userTopTrack -> Arrays.stream(userTopTrack.getTrackDetail().getArtists().split(",")))
                .map(String::trim)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

         artistTrackCounts = artistTrackCounts.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .limit(10)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        long totalTracks = artistTrackCounts.size();
        return artistTrackCounts.entrySet().stream()
                .map(entry -> UserArtistTrackCount.builder()
                        .userSpotifyId(spotifyUserId)
                        .timeRange(timeRange)
                        .artistName(entry.getKey())
                        .trackCount(entry.getValue().intValue())
                        .percentage((entry.getValue() * 100.0) / totalTracks)
                        .build())
                .collect(Collectors.toList());
    }
}
