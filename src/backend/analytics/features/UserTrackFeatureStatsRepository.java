package com.arian.vizpotifybackend.analytics.features;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserTrackFeatureStatsRepository extends JpaRepository<UserTrackFeatureStats, Long> {

    Optional<UserTrackFeatureStats> findByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);

    List<UserTrackFeatureStats> findAllByUserSpotifyId(String userSpotifyId);

    boolean existsByUserSpotifyId(String userSpotifyId);
}
