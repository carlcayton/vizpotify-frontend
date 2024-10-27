package com.arian.vizpotifybackend.analytics;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class AnalyticsResponse<T> {
    private String status;
    private String message;
    private T data;
}
