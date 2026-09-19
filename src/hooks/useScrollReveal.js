import { useEffect, useRef } from "react";

function useScrollReveal() {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        // Respect reduced-motion preferences
        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            element.classList.add("is-visible");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return elementRef;
}

export default useScrollReveal;