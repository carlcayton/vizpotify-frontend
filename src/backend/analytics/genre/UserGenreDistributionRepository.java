package com.arian.vizpotifybackend.analytics.genre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGenreDistributionRepository extends JpaRepository<UserGenreDistribution, Long> {
    List<UserGenreDistribution> findByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);
    boolean existsByUserSpotifyId(String userSpotifyId);
    List<UserGenreDistribution> findByUserSpotifyIdOrderByPercentageDesc(String userSpotifyId);
    Optional<UserGenreDistribution> findFirstByUserSpotifyIdAndTimeRangeOrderByUpdatedAtDesc(String userSpotifyId, String timeRange);
    void deleteByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);
}
