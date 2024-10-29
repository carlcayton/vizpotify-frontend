// utils/trackFeatures.ts

import type { TrackFeatureStats } from '@/types/trackFeatures';

export const FEATURE_DESCRIPTIONS = {
    acousticness: "How acoustic the music is (0-100%)",
    danceability: "How suitable the music is for dancing (0-100%)",
    energy: "The intensity and activity level (0-100%)",
    instrumentalness: "The amount of vocals vs. instruments (0-100%)",
    liveness: "The presence of live performance elements (0-100%)",
    speechiness: "The presence of spoken words (0-100%)",
    valence: "The musical positiveness conveyed (0-100%)"
};

export const normalizeTrackFeatures = (features: TrackFeatureStats): TrackFeatureStats => {
    return Object.entries(features).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: (parseFloat(value) * 100).toFixed(1)
    }), {} as TrackFeatureStats);
};

export const getFeatureDifference = (
    feature1: string,
    feature2: string
): number => {
    return Math.abs(parseFloat(feature1) - parseFloat(feature2));
};

export const getMostSimilarFeatures = (
    user1Features: TrackFeatureStats,
    user2Features: TrackFeatureStats
): string[] => {
    return Object.keys(user1Features)
        .sort((a, b) => {
            const diffA = getFeatureDifference(user1Features[a], user2Features[a]);
            const diffB = getFeatureDifference(user1Features[b], user2Features[b]);
            return diffA - diffB;
        })
        .slice(0, 3);
};

export const getMostDifferentFeatures = (
    user1Features: TrackFeatureStats,
    user2Features: TrackFeatureStats
): string[] => {
    return Object.keys(user1Features)
        .sort((a, b) => {
            const diffA = getFeatureDifference(user1Features[a], user2Features[a]);
            const diffB = getFeatureDifference(user1Features[b], user2Features[b]);
            return diffB - diffA;
        })
        .slice(0, 3);
};