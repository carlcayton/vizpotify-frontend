const SimilarityMeter = ({ similarity, itemType }) => {
  const getSimilarityLevel = (similarity) => {
    if (similarity < 25) return "Low";
    if (similarity < 50) return "Medium";
    return "High";
  };

  const similarityLevel = getSimilarityLevel(similarity);

  return (
    <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
      <div>YOUR {itemType.toUpperCase()} SIMILARITY</div>
      <div className="flex-1 bg-gray-700 rounded-full h-4">
        <div
          className={`bg-green-500 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full`}
          style={{ width: `${similarity}%` }}
        >
          {similarity}%
        </div>
      </div>
      <div
        className={`font-bold ${
          similarityLevel === "Low"
            ? "text-red-500"
            : similarityLevel === "Medium"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        {similarityLevel}
      </div>
    </div>
  );
};

export default SimilarityMeter;