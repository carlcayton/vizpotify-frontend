package com.arian.vizpotifybackend.analytics;

import com.arian.vizpotifybackend.analytics.artist.UserArtistTrackCountMapDto;
import com.arian.vizpotifybackend.analytics.artist.UserArtistTrackCountService;
import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryMapDto;
import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryService;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsMapDto;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsService;
import com.arian.vizpotifybackend.analytics.genre.UserGenreDistributionMapDto;
import com.arian.vizpotifybackend.analytics.genre.UserGenreDistributionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);

    private final UserMusicEraSummaryService userMusicEraSummaryService;
    private final UserTrackFeatureStatsService userTrackFeatureStatsService;
    private final UserGenreDistributionService userGenreDistributionService;
    private final UserArtistTrackCountService userArtistTrackCountService;

    @GetMapping("/users/{userId}/musicEraSummary")
    public ResponseEntity<?> getUserMusicEraSummary(@PathVariable String userId) {
        logger.info("Fetching music era summary for user: {}", userId);
        try {
            AnalyticsResponse<UserMusicEraSummaryMapDto> response = userMusicEraSummaryService.fetchUserMusicEraSummary(userId);
            if ("processing".equals(response.getStatus())) {
                logger.info("Music era summary for user {} is still processing", userId);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }
            logger.info("Successfully retrieved music era summary for user: {}", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching music era summary for user {}: {}", userId, e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/users/{userId}/trackFeatureStats")
    public ResponseEntity<?> getUserTrackFeatureStats(@PathVariable String userId) {
        logger.info("Fetching track feature stats for user: {}", userId);
        try {
            AnalyticsResponse<UserTrackFeatureStatsMapDto> response = userTrackFeatureStatsService.fetchUserTrackFeatureStats(userId);
            if ("processing".equals(response.getStatus())) {
                logger.info("Track feature stats for user {} is still processing", userId);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }
            logger.info("Successfully retrieved track feature stats for user: {}", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching track feature stats for user {}: {}", userId, e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/users/{userId}/genreDistribution")
    public ResponseEntity<?> getUserGenreDistribution(@PathVariable String userId) {
        logger.info("Fetching genre distribution for user: {}", userId);
        try {
            AnalyticsResponse<UserGenreDistributionMapDto> response = userGenreDistributionService.fetchUserGenreDistribution(userId);
            if ("processing".equals(response.getStatus())) {
                logger.info("Genre distribution for user {} is still processing", userId);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }
            logger.info("Successfully retrieved genre distribution for user: {}", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching genre distribution for user {}: {}", userId, e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/users/{userId}/artistTrackCount")
    public ResponseEntity<?> getUserArtistTrackCount(@PathVariable String userId) {
        logger.info("Fetching artist track count for user: {}", userId);
        try {
            AnalyticsResponse<UserArtistTrackCountMapDto> response = userArtistTrackCountService.fetchUserArtistTrackCount(userId);
            if ("processing".equals(response.getStatus())) {
                logger.info("Artist track count for user {} is still processing", userId);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }
            logger.info("Successfully retrieved artist track count for user: {}", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching artist track count for user {}: {}", userId, e.getMessage(), e);
            throw e;
        }
    }
}