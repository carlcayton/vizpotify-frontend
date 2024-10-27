package com.arian.vizpotifybackend.analytics.genre;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_genre_distribution",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_spotify_id", "time_range", "genre"}))
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserGenreDistribution {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_genre_distribution_id_seq")
    @SequenceGenerator(name = "user_genre_distribution_id_seq", sequenceName = "user_genre_distribution_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_spotify_id", nullable = false)
    private String userSpotifyId;

    @Column(name = "time_range", nullable = false, length = 50)
    private String timeRange;

    @Column(name = "genre", nullable = false, length = 100)
    private String genre;

    @Column(name = "genre_count", nullable = false)
    private Integer genreCount;

    @Column(name = "percentage", nullable = false, precision = 5)
    private Double percentage;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
