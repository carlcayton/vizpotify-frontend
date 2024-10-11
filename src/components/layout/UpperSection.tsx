import React, { ReactNode } from "react"
import { useIsMobile } from "utils/detectScreenSize"

const TimeRangeButton = ({ selectedTimeRange, setSelectedTimeRange, timeRange }) => {
    let timeRangeForDisplay = ""
    switch (timeRange) {
        case "shortTerm":
            timeRangeForDisplay = "4 Weeks"
            break
        case "mediumTerm":
            timeRangeForDisplay = "6 Months"
            break
        case "longTerm":
            timeRangeForDisplay = "All Time"
            break
    }
    const isActive = timeRange === selectedTimeRange;
    const activeClass = isActive ? "text-theme-green-1" : "text-white no-underline hover:underline hover:text-theme-green-1";
    return (
        <button className={`${activeClass}`} onClick={() => setSelectedTimeRange(timeRange)}>
            {timeRangeForDisplay}
        </button>
    )
}

interface UpperSectionProps {
    customTWClass?: string;
    sectionType: string;
    selectedTimeRange: string;
    setSelectedTimeRange: (timeRange: string) => void;
    customLeftContent?: ReactNode;
    customRightContent?: ReactNode;
}

const UpperSection = ({ 
    customTWClass = "", 
    sectionType, 
    selectedTimeRange, 
    setSelectedTimeRange,
    customLeftContent,
    customRightContent
}: UpperSectionProps) => {
    const timeRanges = ["shortTerm", "mediumTerm", "longTerm"];
    const isMobile = useIsMobile();

    const defaultLeftContent = (
        <p className="text-white font-bold text-xl">
            <span className="text-theme-green-1 font-bold text-2xl pl-1">
                {sectionType}
            </span>
        </p>
    );

    const defaultRightContent = (
        <>
            <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className={`bg-[#111827] text-theme-green-1 rounded px-2 py-1 block sm:hidden`}
            >
                {timeRanges.map((timeRange) => (
                    <option key={timeRange} value={timeRange} className={`bg-white text-[#111827]`}>
                        {timeRange === "shortTerm"
                            ? "4 Weeks"
                            : timeRange === "mediumTerm"
                                ? "6 Months"
                                : "All Time"}
                    </option>
                ))}
            </select>

            <div className={`flex flex-row space-x-3 hidden sm:block`}>
                {timeRanges.map((timeRange, index) => (
                    <TimeRangeButton
                        key={index}
                        selectedTimeRange={selectedTimeRange}
                        setSelectedTimeRange={setSelectedTimeRange}
                        timeRange={timeRange}
                    />
                ))}
            </div>
        </>
    );

    return (
        <div className={`${customTWClass} flex flex-row top-0 justify-between pt-20 w-full`}>
            {customLeftContent || defaultLeftContent}
            {customRightContent || defaultRightContent}
        </div>
    );
};

export default UpperSection
