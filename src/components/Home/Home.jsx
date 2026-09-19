import { useEffect, useState } from "react";
import "./Home.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import initNeuralNetwork from "./Home.js";

const greetings = [
    "Hello",
    "Hola",
    "नमस्कार",
    "नमस्ते"
];

function Home() {
    const scrollRevealRef = useScrollReveal();

    const [greetingIndex, setGreetingIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentGreeting = greetings[greetingIndex];
        let timeout;

        if (!isDeleting) {
            if (displayText.length < currentGreeting.length) {
                timeout = setTimeout(() => {
                    setDisplayText(
                        currentGreeting.substring(
                            0,
                            displayText.length + 1
                        )
                    );
                }, 120);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 1800);
            }
        } else if (displayText.length > 0) {
            timeout = setTimeout(() => {
                setDisplayText(
                    currentGreeting.substring(
                        0,
                        displayText.length - 1
                    )
                );
            }, 70);
        } else {
            setIsDeleting(false);

            setGreetingIndex(
                previousIndex =>
                    (previousIndex + 1) % greetings.length
            );
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, greetingIndex]);

    useEffect(() => {
        const cleanup = initNeuralNetwork();

        return () => {
            if (typeof cleanup === "function") {
                cleanup();
            }
        };
    }, []);

    return (
        <main
            className="home"
            id="home"
        >
            <canvas
                id="neural-network"
                aria-hidden="true"
            />

            <div
                className="hero-content scroll-reveal"
                ref={scrollRevealRef}
            >
                <div className="intro-line hero-item hero-greeting">
                    <span>{displayText}</span>
                </div>

                <div className="hero-im hero-item">
                    I'm
                </div>

                <h1 className="special-text hero-item hero-name">
                    Shreya Gaikwad
                </h1>

                <p className="hero-role hero-item">
                    Artificial Intelligence & Machine Learning Student
                </p>

                <div className="currently hero-item">
                    <p className="currently-label">
                        Currently
                    </p>

                    <p className="currently-text">
                        Python Full Stack · AI-Powered Projects
                    </p>

                    <p className="currently-location">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Maharashtra, India</span>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Home;