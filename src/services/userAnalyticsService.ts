import { apiRequest } from "./commonService"


export const userAnalyticsService = {

    getUserTrackFeatureStats: (spotifyId: string) => {
        return apiRequest(`analytics/users/${spotifyId}/trackFeatureStats`, 'get')
    },

    getUserGenreDistribution: (spotifyId: string) => {
        return apiRequest(`analytics/users/${spotifyId}/genreDistribution`, 'get')
    },

    getUserMusicEraSummary: (spotifyId: string) => {
        return apiRequest(`analytics/users/${spotifyId}/musicEraSummary`, 'get')
    },

    getUserArtistTrackCount: (spotifyId: string) => {
        return apiRequest(`analytics/users/${spotifyId}/artistTrackCount`, 'get')
    },

}