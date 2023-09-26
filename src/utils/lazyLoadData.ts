import { useState, useEffect } from 'react';

const useLazyLoadData = (fetchFunction, ref) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            async(entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {

                        const responseData =await fetchFunction('')
                        setData(responseData);
                    }
                }
            },
            { threshold: 0.1}
        );
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, fetchFunction]);
    return data;
}

export default useLazyLoadData;
