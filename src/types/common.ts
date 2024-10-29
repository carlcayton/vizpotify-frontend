// types/common.ts

export type TimeRange = 'shortTerm' | 'mediumTerm' | 'longTerm';

export const TIME_RANGE_LABELS = {
    shortTerm: 'Last 4 Weeks',
    mediumTerm: 'Last 6 Months',
    longTerm: 'All Time'
};

export const TIME_RANGE_OPTIONS = [
    { value: 'shortTerm', label: 'Last 4 Weeks' },
    { value: 'mediumTerm', label: 'Last 6 Months' },
    { value: 'longTerm', label: 'All Time' }
];