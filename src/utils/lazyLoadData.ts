import { useState, useEffect } from 'react';

const useLazyLoadData = (fetchFunction, ref) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // If data is already loaded, don't set up the observer again
        if (data) {
            return;
        }

        const observer = new IntersectionObserver(
            async (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const responseData = await fetchFunction('');
                        setData(responseData);
                        // Disconnect the observer after fetching the data once
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, fetchFunction, data]);

    return data;
}

export default useLazyLoadData;
