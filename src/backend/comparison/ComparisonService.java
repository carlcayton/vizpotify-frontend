package com.arian.vizpotifybackend.comparison;

import com.arian.vizpotifybackend.analytics.artist.UserArtistTrackCountMapDto;
import com.arian.vizpotifybackend.analytics.artist.UserArtistTrackCountService;
import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryMapDto;
import com.arian.vizpotifybackend.analytics.era.UserMusicEraSummaryService;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsMapDto;
import com.arian.vizpotifybackend.analytics.features.UserTrackFeatureStatsService;
import com.arian.vizpotifybackend.analytics.genre.UserGenreDistributionMapDto;
import com.arian.vizpotifybackend.analytics.genre.UserGenreDistributionService;
import com.arian.vizpotifybackend.artist.ArtistDto;
import com.arian.vizpotifybackend.track.TrackDto;
import com.arian.vizpotifybackend.user.topitems.artist.UserTopArtistService;
import com.arian.vizpotifybackend.user.topitems.track.UserTopTrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComparisonService {

    private final UserTopArtistService userTopArtistService;
    private final UserTopTrackService userTopTrackService;
    private final UserMusicEraSummaryService userMusicEraSummaryService;
    private final UserTrackFeatureStatsService userTrackFeatureStatsService;
    private final UserGenreDistributionService userGenreDistributionService;
    private final UserArtistTrackCountService userArtistTrackCountService;

    public ComparisonDto compareUsers(String userId1, String userId2) {
        Map<String, List<ArtistDto>> topArtists1 = userTopArtistService.getUserTopArtists(userId1);
        Map<String, List<ArtistDto>> topArtists2 = userTopArtistService.getUserTopArtists(userId2);
        Map<String, List<TrackDto>> topTracks1 = userTopTrackService.getUserTopItems(userId1);
        Map<String, List<TrackDto>> topTracks2 = userTopTrackService.getUserTopItems(userId2);

        Map<String, Double> jaccardSimilarity = calculateJaccardSimilarity(topArtists1, topArtists2, topTracks1, topTracks2);
        CommonItemsDto commonItems = findCommonItems(topArtists1, topArtists2, topTracks1, topTracks2);

        UserMusicEraSummaryMapDto eraSummary1 = userMusicEraSummaryService.fetchUserMusicEraSummary(userId1).getData();
        UserMusicEraSummaryMapDto eraSummary2 = userMusicEraSummaryService.fetchUserMusicEraSummary(userId2).getData();

        UserTrackFeatureStatsMapDto featureStats1 = userTrackFeatureStatsService.fetchUserTrackFeatureStats(userId1).getData();
        UserTrackFeatureStatsMapDto featureStats2 = userTrackFeatureStatsService.fetchUserTrackFeatureStats(userId2).getData();

        UserGenreDistributionMapDto genreDistribution1 = userGenreDistributionService.fetchUserGenreDistribution(userId1).getData();
        UserGenreDistributionMapDto genreDistribution2 = userGenreDistributionService.fetchUserGenreDistribution(userId2).getData();

        UserArtistTrackCountMapDto artistTrackCount1 = userArtistTrackCountService.fetchUserArtistTrackCount(userId1).getData();
        UserArtistTrackCountMapDto artistTrackCount2 = userArtistTrackCountService.fetchUserArtistTrackCount(userId2).getData();

        return new ComparisonDto(
                commonItems,
                jaccardSimilarity,
                Map.of(userId1, consolidateTracks(topTracks1).stream().toList(), userId2, consolidateTracks(topTracks2).stream().toList()),
                Map.of(userId1, eraSummary1, userId2, eraSummary2),
                Map.of(userId1, featureStats1, userId2, featureStats2),
                Map.of(userId1, genreDistribution1, userId2, genreDistribution2),
                Map.of(userId1, artistTrackCount1, userId2, artistTrackCount2)
        );
    }



    private CommonItemsDto findCommonItems(
            Map<String, List<ArtistDto>> topArtists1,
            Map<String, List<ArtistDto>> topArtists2,
            Map<String, List<TrackDto>> topTracks1,
            Map<String, List<TrackDto>> topTracks2) {

        Set<ArtistDto> commonArtists = findCommonArtists(topArtists1, topArtists2);
        Set<TrackDto> commonTracks = findCommonTracks(topTracks1, topTracks2);

        return new CommonItemsDto(commonArtists, commonTracks);
    }

    private Set<ArtistDto> findCommonArtists(
            Map<String, List<ArtistDto>> topArtists1,
            Map<String, List<ArtistDto>> topArtists2) {

        Set<ArtistDto> allArtists1 = consolidateArtists(topArtists1);
        Set<ArtistDto> allArtists2 = consolidateArtists(topArtists2);

        return allArtists1.stream()
                .filter(artist1 -> allArtists2.stream()
                        .anyMatch(artist2 -> artist2.getId().equals(artist1.getId())))
                .collect(Collectors.toSet());
    }



    private <T> Set<String> findCommonIds(Set<T> set1, Set<T> set2, Function<T, String> idExtractor) {
        Set<String> ids1 = set1.stream().map(idExtractor).collect(Collectors.toSet());
        Set<String> ids2 = set2.stream().map(idExtractor).collect(Collectors.toSet());
        Set<String> commonIds = new HashSet<>(ids1);
        commonIds.retainAll(ids2);
        return commonIds;
    }

    private Map<String, String> createCommonArtistsMap(Set<ArtistDto> artists, Set<String> commonArtistIds) {
        return commonArtistIds.stream()
                .collect(Collectors.toMap(
                        artistId -> artistId,
                        artistId -> artists.stream()
                                .filter(a -> a.getId().equals(artistId))
                                .findFirst()
                                .orElseThrow()
                                .getName()
                ));
    }

    private Set<TrackDto> findCommonTracks(
            Map<String, List<TrackDto>> topTracks1,
            Map<String, List<TrackDto>> topTracks2) {

        Set<TrackDto> allTracks1 = consolidateTracks(topTracks1);
        Set<TrackDto> allTracks2 = consolidateTracks(topTracks2);

        return allTracks1.stream()
                .filter(track1 -> allTracks2.stream()
                        .anyMatch(track2 -> track2.getId().equals(track1.getId())))
                .collect(Collectors.toSet());
    }

    private double calculateJaccard(Set<?> set1, Set<?> set2) {
        Set<String> ids1 = set1.stream()
                .map(item -> getItemId(item))
                .collect(Collectors.toSet());
        Set<String> ids2 = set2.stream()
                .map(item -> getItemId(item))
                .collect(Collectors.toSet());

        Set<String> union = new HashSet<>(ids1);
        union.addAll(ids2);
        Set<String> intersection = new HashSet<>(ids1);
        intersection.retainAll(ids2);
        return union.isEmpty() ? 0 : (double) intersection.size() / union.size();
    }

    private String getItemId(Object item) {
        if (item instanceof ArtistDto) {
            return ((ArtistDto) item).getId();
        } else if (item instanceof TrackDto) {
            return ((TrackDto) item).getId();
        }
        throw new IllegalArgumentException("Unsupported item type");
    }

    private Map<String, Double> calculateJaccardSimilarity(
            Map<String, List<ArtistDto>> topArtists1,
            Map<String, List<ArtistDto>> topArtists2,
            Map<String, List<TrackDto>> topTracks1,
            Map<String, List<TrackDto>> topTracks2) {

        Set<ArtistDto> artists1 = consolidateArtists(topArtists1);
        Set<ArtistDto> artists2 = consolidateArtists(topArtists2);
        double artistSimilarity = calculateJaccard(artists1, artists2);

        Set<TrackDto> tracks1 = consolidateTracks(topTracks1);
        Set<TrackDto> tracks2 = consolidateTracks(topTracks2);
        double trackSimilarity = calculateJaccard(tracks1, tracks2);

        return Map.of(
                "artists", artistSimilarity,
                "tracks", trackSimilarity
        );
    }

    private Set<ArtistDto> consolidateArtists(Map<String, List<ArtistDto>> topArtists) {
        return topArtists.values().stream()
                .flatMap(List::stream)
                .collect(Collectors.toSet());
    }

    private Set<TrackDto> consolidateTracks(Map<String, List<TrackDto>> topTracks) {
        return topTracks.values().stream()
                .flatMap(List::stream)
                .collect(Collectors.toSet());
    }


    private Map<String, String> createCommonTracksMap(Set<TrackDto> tracks, Set<String> commonTrackIds) {
        return commonTrackIds.stream()
                .collect(Collectors.toMap(
                        trackId -> trackId,
                        trackId -> tracks.stream()
                                .filter(t -> t.getId().equals(trackId))
                                .findFirst()
                                .orElseThrow()
                                .getName()
                ));
    }

}

