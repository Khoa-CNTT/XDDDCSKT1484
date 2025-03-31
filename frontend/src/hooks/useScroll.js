import { useEffect } from 'react';

const useScroll = (callback) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            if ((scrollPosition + windowHeight) >= documentHeight) {
                callback();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [callback]);
}

export default useScroll;
