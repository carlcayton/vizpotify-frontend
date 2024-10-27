package com.arian.vizpotifybackend.analytics.era;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_music_era_summary")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserMusicEraSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_music_era_summary_id_seq")
    @SequenceGenerator(name = "user_music_era_summary_id_seq", sequenceName = "user_music_era_summary_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    @JsonIgnore
    private Long id;

    @Column(name = "user_spotify_id", nullable = false, length = 255)
    private String userSpotifyId;

    @Column(name = "time_range", nullable = false, length = 50)
    private String timeRange;

    @Column(name = "release_date_range", nullable = false, length = 50)
    private String releaseDateRange;

    @Column(name = "track_count", nullable = false)
    private Integer trackCount;

    @Column(name = "percentage", nullable = false, precision = 5)
    private Double percentage;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


}
