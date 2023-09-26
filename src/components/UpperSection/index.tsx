import React from "react"
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
    console.log(timeRange + selectedTimeRange)
    return (
        <button className={`${activeClass}`} onClick={() => setSelectedTimeRange(timeRange)}>
            {timeRangeForDisplay}
        </button>
    )
}
const UpperSection = ({ sectionType, selectedTimeRange, setSelectedTimeRange }) => {
    const timeRanges = ["shortTerm", "mediumTerm", "longTerm"];
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-row top-0 justify-between w-full">
            <p className="text-white font-bold text-xl">
                Top
                <span className="text-theme-green-1 font-bold text-2xl pl-1">
                    {sectionType}
                </span>
            </p>

            {/* Always render both select and buttons, and use CSS to toggle their visibility */}
            <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className={`bg-[#111827] text-theme-green-1 rounded px-2 py-1 md:hidden`}
            >
                {timeRanges.map((timeRange) => (
                    <option key={timeRange} value={timeRange} className="bg-white text-[#111827]">
                        {timeRange === "shortTerm"
                            ? "4 Weeks"
                            : timeRange === "mediumTerm"
                                ? "6 Months"
                                : "All Time"}
                    </option>
                ))}
            </select>

            {/* <div className={`flex flex-row space-x-3 ${isMobile ? 'hidden' : 'block'}`}> */}
            <div className={`md:flex flex-row space-x-3 `}>
                {timeRanges.map((timeRange, index) => {
                    return (
                        <TimeRangeButton
                            selectedTimeRange={selectedTimeRange}
                            setSelectedTimeRange={setSelectedTimeRange}
                            timeRange={timeRange}
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default UpperSection