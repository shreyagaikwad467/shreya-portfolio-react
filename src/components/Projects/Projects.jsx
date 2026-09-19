import { useEffect } from "react";
import "./Projects.css";
import useScrollReveal from "../../hooks/useScrollReveal";

function Projects() {
    const projectsRef = useScrollReveal();

    const projects = [
        {
            number: "01",
            slug: "employee-attrition",
            technologies: [
                "Python",
                "ANN",
                "SHAP",
                "Pandas",
                "Flask",
                "HTML",
                "CSS",
                "JavaScript",
                "MySQL"
            ],
            title:
                "AI - Powered Employee Attrition Prediction and Workforce Intelligence System",
            description:
                "A project currently in development. More details about the idea, implementation, and technologies will be added soon.",
            codeLines: [
                "const employeeData = loadDataset();",
                "const model = new ANN();",
                "model.fit(employeeData);",
                "const prediction = model.predict(employee);",
                "const explanation = SHAP.explain(prediction);",
                "workforce.intelligence = analyze(employeeData);",
                "status = 'IN_PROGRESS';"
            ]
        },
        {
            number: "02",
            slug: "visioncaption-ai",
            technologies: [
                "Python",
                "Gemini API",
                "JavaScript"
            ],
            title:
                "VisionCaption AI — AI-Powered Image Caption Generator",
            description:
                "An AI-powered image caption generator that uses the Gemini API to analyze images and generate meaningful, contextual descriptions.",
            codeLines: [
                "const image = uploadImage();",
                "const model = Gemini.initialize();",
                "const caption = await model.generateContent(image);",
                "const description = caption.text();",
                "display(description);",
                "visionCaption.ready = false;",
                "status = 'IN_PROGRESS';"
            ]
        },
        {
            number: "03",
            slug: "online-shopping-purchase-prediction",
            technologies: [
                "Python",
                "Machine Learning",
                "Pandas",
                "Scikit-learn"
            ],
            title:
                "Online Shopping Purchase Prediction using Machine Learning",
            description:
                "A machine learning project that predicts whether an online shopper is likely to make a purchase based on their browsing behaviour and other relevant features.",
            video: "/assets/project1.mp4"
        }
    ];

    useEffect(() => {
        const videos = document.querySelectorAll(
            ".project-video video"
        );

        const videoHandlers = [];

        videos.forEach((video) => {
            video.muted = true;

            const playVideo = () => {
                video.play().catch(() => {
                    // Browser may block autoplay.
                });
            };

            videoHandlers.push({
                video,
                playVideo
            });

            if (video.readyState >= 2) {
                playVideo();
            } else {
                video.addEventListener(
                    "loadeddata",
                    playVideo,
                    { once: true }
                );
            }
        });

        return () => {
            videoHandlers.forEach(
                ({ video, playVideo }) => {
                    video.removeEventListener(
                        "loadeddata",
                        playVideo
                    );
                }
            );
        };
    }, []);

    return (
        <section
            className="projects scroll-reveal"
            id="projects"
            ref={projectsRef}
        >
            <div className="projects-inner">
                {/* Heading */}
                <div className="projects-heading">
                    <p className="section-label">
                        Projects
                    </p>

                    <p className="projects-intro">
                        A collection of projects, experiments,
                        and things I've learned by building.
                    </p>
                </div>

                {/* Projects */}
                <div className="projects-list">
                    {projects.map((project) => (
                        <article
                            className="project-card"
                            key={project.number}
                        >
                            {/* Video / Code */}
                            <div className="project-video-section">
                                <div className="project-window">
                                    <div className="window-bar">
                                        <div className="window-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>

                                    <div className="project-video">
                                        {project.codeLines ? (
                                            <div className="project-code-window">
                                                <div className="code-track">
                                                    <div className="code-line-set">
                                                        {project.codeLines.map(
                                                            (line, index) => (
                                                                <span
                                                                    className="code-line"
                                                                    key={index}
                                                                >
                                                                    {line}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>

                                                    <div
                                                        className="code-line-set"
                                                        aria-hidden="true"
                                                    >
                                                        {project.codeLines.map(
                                                            (line, index) => (
                                                                <span
                                                                    className="code-line"
                                                                    key={index}
                                                                >
                                                                    {line}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="code-wip">
                                                    <span>
                                                        WORK IN PROGRESS
                                                    </span>

                                                    <span className="code-wip-dots">
                                                        <span>.</span>
                                                        <span>.</span>
                                                        <span>.</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <video
                                                src={project.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="auto"
                                                controls={false}
                                                onLoadedData={(event) => {
                                                    event.currentTarget
                                                        .play()
                                                        .catch(() => {});
                                                }}
                                            />
                                        )}
                                    </div>

                                    <a
                                        href={`/projects/${project.slug}`}
                                        className="view-project"
                                    >
                                        <span>
                                            View Project
                                        </span>

                                        <span className="view-project-arrow">
                                            →
                                        </span>
                                    </a>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="project-details">
                                <div className="project-technologies">
                                    {project.technologies.map(
                                        (technology, index) => (
                                            <span
                                                className="technology-box"
                                                key={index}
                                            >
                                                {technology}
                                            </span>
                                        )
                                    )}
                                </div>

                                <h3>
                                    {project.title}
                                </h3>

                                <p className="project-description">
                                    {project.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;