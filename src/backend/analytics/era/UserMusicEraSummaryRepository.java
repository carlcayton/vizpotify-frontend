package com.arian.vizpotifybackend.analytics.era;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMusicEraSummaryRepository extends JpaRepository<UserMusicEraSummary, Long> {
    List<UserMusicEraSummary> findAllByUserSpotifyId(String userSpotifyId);
    Optional<UserMusicEraSummary> findFirstByUserSpotifyIdAndTimeRangeOrderByUpdatedAtDesc(String userSpotifyId, String timeRange);
    void deleteByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);
    boolean existsByUserSpotifyId(String userSpotifyId);
}
