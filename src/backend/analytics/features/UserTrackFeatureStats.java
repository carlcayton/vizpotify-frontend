package com.arian.vizpotifybackend.analytics.features;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_track_feature_stats",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_spotify_id", "time_range"}))
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserTrackFeatureStats {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_track_feature_stats_id_seq")
    @SequenceGenerator(name = "user_track_feature_stats_id_seq", sequenceName = "user_track_feature_stats_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_spotify_id")
    private String userSpotifyId;

    @Column(name = "time_range")
    private String timeRange;

    private Double acousticness;
    private Double danceability;
    private Double energy;
    private Double instrumentalness;
    private Double liveness;
    private Double speechiness;
    private Double valence;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


}