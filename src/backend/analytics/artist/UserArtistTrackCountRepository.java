package com.arian.vizpotifybackend.analytics.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserArtistTrackCountRepository extends JpaRepository<UserArtistTrackCount, Long> {
    List<UserArtistTrackCount> findAllByUserSpotifyId(String userSpotifyId);
    Optional<UserArtistTrackCount> findFirstByUserSpotifyIdAndTimeRangeOrderByUpdatedAtDesc(String userSpotifyId, String timeRange);
    void deleteByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);
    boolean existsByUserSpotifyId(String userSpotifyId);
    List<UserArtistTrackCount> findByUserSpotifyIdAndTimeRange(String userSpotifyId, String timeRange);
}
