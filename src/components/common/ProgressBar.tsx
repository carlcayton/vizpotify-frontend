const ProgressBar = ({ percentage }) => {
  return (
    <div className="bg-[#5F646F] rounded-full h-2 dark:bg-bg-gray-700 w-full">
      <div
        className="bg-theme-green-1 h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
