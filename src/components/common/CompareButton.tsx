import { useRouter } from 'next/router';

const CompareButton = (props) => {
  const router = useRouter();

  const compare = () => {
    const spotifyId = router.query.spotifyId;
    router.push(`/compare/${spotifyId}`);
  };

  const shouldShowButton = router.pathname !== '/compare/[spotifyId]';

  return (
    <>
      {shouldShowButton && (
        <button
          className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
          onClick={compare}
        >
          Compare
        </button>
      )}
    </>
  );
};

export default CompareButton;