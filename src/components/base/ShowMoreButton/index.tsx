const ShowMoreButton = ({ showMore, setShowMore }) => {
    const handleShowMore = () => {
        setShowMore((prevState) => ({
            isExpanded: !showMore.isExpanded,
            itemsToShow: !showMore.isExpanded ? showMore.totalItems : 4,
            totalItems: showMore.totalItems,
        }));
    };
    return (
        <button
            className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
            onClick={handleShowMore}
        >
            {showMore.isExpanded ? "Show Less" : "Show More"}
        </button>
    );
};

export default ShowMoreButton