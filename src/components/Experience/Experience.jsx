import { useEffect, useState } from "react";
import "./Experience.css";
import useScrollReveal from "../../hooks/useScrollReveal";

function Experience() {
    const [activeExperience, setActiveExperience] = useState(0);

    const experienceRef = useScrollReveal();

    const experiences = [
        {
            number: "01",
            company: "Google",
            role: "Google Gemini Student Ambassador",
            date: "May 2026 — Present",
            description:
                "Promoting AI awareness and Google Gemini among students through workshops, campus events, and community initiatives focused on Generative AI."
        },
        {
            number: "02",
            company: "VentCorp",
            role: "Machine Learning Intern",
            date: "Jan 2026 — Feb 2026",
            description:
                "Completed hands-on training in Machine Learning using Python and Jupyter Notebook. Implemented Linear Regression, Logistic Regression, KNN, Decision Trees, and Random Forest, and evaluated models using accuracy, precision, recall, and F1-score."
        },
        {
            number: "03",
            company: "Dolphin Labs",
            role: "Embedded Systems Intern",
            date: "Jun 2023 — Jul 2023",
            description:
                "Worked on IoT projects using Arduino IDE and microcontrollers, with hands-on experience in sensors, circuit integration, and embedded systems development."
        }
    ];

    const currentExperience = experiences[activeExperience];

    const previousExperience = () => {
        setActiveExperience((current) =>
            current === 0
                ? experiences.length - 1
                : current - 1
        );
    };

    const nextExperience = () => {
        setActiveExperience((current) =>
            current === experiences.length - 1
                ? 0
                : current + 1
        );
    };

    useEffect(() => {
        const section = document.getElementById("experience");

        if (!section) {
            return;
        }

        let interval = null;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !interval) {
                    interval = setInterval(() => {
                        setActiveExperience((current) =>
                            current === experiences.length - 1
                                ? 0
                                : current + 1
                        );
                    }, 3000);
                } else if (!entry.isIntersecting && interval) {
                    clearInterval(interval);
                    interval = null;
                }
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();

            if (interval) {
                clearInterval(interval);
            }
        };
    }, [experiences.length]);

    return (
        <section
            className="experience scroll-reveal"
            id="experience"
            ref={experienceRef}
        >
            <div className="experience-heading">
                <p className="section-label">
                    Experience
                </p>

                <p className="experience-intro">
                    Places where I've learned, built,
                    and grown along the way.
                </p>
            </div>

            <div className="experience-carousel">
                <div className="experience-navigation">
                    <button
                        className="experience-arrow"
                        onClick={previousExperience}
                        aria-label="Previous experience"
                    >
                        ←
                    </button>

                    <span className="experience-counter">
                        <span className="current-number">
                            {currentExperience.number}
                        </span>

                        <span className="counter-divider">
                            /
                        </span>

                        <span>
                            {String(experiences.length).padStart(2, "0")}
                        </span>
                    </span>

                    <button
                        className="experience-arrow"
                        onClick={nextExperience}
                        aria-label="Next experience"
                    >
                        →
                    </button>
                </div>

                <article
                    className="experience-card"
                    key={currentExperience.number}
                >
                    <div className="experience-card-top">
                        <span className="experience-number">
                            {currentExperience.number}
                        </span>

                        <span className="experience-date">
                            {currentExperience.date}
                        </span>
                    </div>

                    <div className="experience-content">
                        <div className="experience-details">
                            <p className="experience-company">
                                {currentExperience.company}
                            </p>

                            <h3>
                                {currentExperience.role}
                            </h3>

                            <p className="experience-description">
                                {currentExperience.description}
                            </p>
                        </div>
                    </div>
                </article>

                <div className="experience-dots">
                    {experiences.map((experience, index) => (
                        <button
                            key={experience.number}
                            className={`experience-dot ${
                                index === activeExperience
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveExperience(index)
                            }
                            aria-label={`View experience ${experience.number}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;