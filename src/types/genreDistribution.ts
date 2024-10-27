// types/genreDistribution.ts

// Single genre item data
export interface GenreItem {
    genre: string;
    genreCount: number;
    percentage: number;
}

// Data structure for a specific time range
export interface TimeRangeGenreData {
    [timeRange: string]: GenreItem[];
}

// Full genre distribution for a user
export interface UserGenreDistribution {
    userSpotifyId: string;
    genreDistributionsByTimeRange: TimeRangeGenreData;
}

// Combined genre data for both users
export interface CombinedGenreData {
    genre: string;
    user1Percentage: number;
    user2Percentage: number;
    user1Count: number;
    user2Count: number;
}

// Chart data structure
export interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }>;
}

// Props for the genre distribution component
export interface GenreDistributionComparisonProps {
    user1Profile: {
        spotifyId: string;
        displayName: string;
    };
    user2Profile: {
        spotifyId: string;
        displayName: string;
    };
    genreDistribution: {
        [key: string]: UserGenreDistribution;
    };
    isLoading?: boolean;
    error?: Error | null;
}

// Props for the visualization subcomponent
export interface GenreVisualizationProps {
    data: CombinedGenreData[];
    user1Name: string;
    user2Name: string;
    viewType: 'doughnut' | 'bar';
    onViewTypeChange: (type: 'doughnut' | 'bar') => void;
}

// Types for color schemes and styling
export interface ColorScheme {
    primary: string[];
    secondary: string[];
    background: string[];
    border: string[];
}

// Time range type
export type TimeRange = 'shortTerm' | 'mediumTerm' | 'longTerm';

// View type for different visualizations
export type ViewType = 'doughnut' | 'bar';

// Configuration options
export interface GenreChartConfig {
    maxGenresToShow: number;
    minPercentageThreshold: number;
    colorScheme: ColorScheme;
    animations: {
        duration: number;
        easing: string;
    };
}