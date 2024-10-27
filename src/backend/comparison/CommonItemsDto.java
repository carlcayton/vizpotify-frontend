package com.arian.vizpotifybackend.comparison;


import com.arian.vizpotifybackend.artist.ArtistDto;
import com.arian.vizpotifybackend.track.TrackDto;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;
import java.util.Set;

public record CommonItemsDto(
        Set<ArtistDto> commonArtists,
        Set<TrackDto> commonTracks
) {}
