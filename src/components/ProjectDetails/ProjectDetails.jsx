import { useEffect } from "react";
import "./ProjectDetails.css";
import projects from "../../data/projects";
import useScrollReveal from "../../hooks/useScrollReveal";

function ProjectDetails() {
    const projectId = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop();

    const project = projects[projectId];

    const backButtonRef = useScrollReveal();
    const titleRef = useScrollReveal();
    const sidebarRef = useScrollReveal();
    const descriptionRef = useScrollReveal();
    const fullContentRef = useScrollReveal();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, [projectId]);

    const goBack = () => {
        window.location.href = "/#projects";
    };

    if (!project) {
        return (
            <main className="project-details-page">
                <div className="project-not-found">
                    <h1>
                        Project not found
                    </h1>

                    <button onClick={goBack}>
                        ← Back to Projects
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="project-details-page">
            <div className="project-details-container">

                {/* Back to Projects */}

                <div
                    className="scroll-reveal"
                    ref={backButtonRef}
                >
                    <button
                        className="back-to-projects"
                        onClick={goBack}
                    >
                        <span className="back-arrow">
                            ←
                        </span>

                        <span>
                            Back to Projects
                        </span>
                    </button>
                </div>


                {/* Project Title */}

                <h1
                    className="project-detail-title scroll-reveal"
                    ref={titleRef}
                >
                    {project.title}
                </h1>


                <div className="project-showcase">

                    {/* =========================
                        LEFT SIDEBAR
                    ========================= */}

                    <aside
                        className="project-sidebar scroll-reveal"
                        ref={sidebarRef}
                    >

                        {/* Status */}

                        <div className="project-info-block">
                            <p className="project-info-label">
                                Status
                            </p>

                            <div className="project-status">
                                <span className="status-dot"></span>

                                <span>
                                    {project.status}
                                </span>
                            </div>
                        </div>


                        {/* Technologies */}

                        <div className="project-info-block">
                            <p className="project-info-label">
                                Technologies
                            </p>

                            <div className="project-sidebar-technologies">
                                {project.technologies.map(
                                    (technology, index) => (
                                        <span
                                            className="project-sidebar-technology"
                                            key={index}
                                        >
                                            {technology}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>


                        {/* Project Materials */}

                        {project.materials && (
                            <div className="project-info-block">
                                <p className="project-info-label">
                                    Project Materials
                                </p>

                                <div className="project-materials">

                                    {project.materials.document01 && (
                                        <a
                                            href={
                                                project.materials.document01
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-material-link"
                                        >
                                            <span>
                                                Project Review - I
                                            </span>

                                            <span>
                                                ↗
                                            </span>
                                        </a>
                                    )}

                                    {project.materials.document02 && (
                                        <a
                                            href={
                                                project.materials.document02
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-material-link"
                                        >
                                            <span>
                                                Specifications
                                            </span>

                                            <span>
                                                ↗
                                            </span>
                                        </a>
                                    )}

                                    {project.materials.document03 && (
                                        <a
                                            href={
                                                project.materials.document03
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-material-link"
                                        >
                                            <span>
                                                Synopsis
                                            </span>

                                            <span>
                                                ↗
                                            </span>
                                        </a>
                                    )}

                                </div>
                            </div>
                        )}


                        {/* Certificate */}

                        {project.certificate && (
                            <div className="project-info-block">
                                <p className="project-info-label">
                                    Certificate
                                </p>

                                <a
                                    href={project.certificate}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-certificate-link"
                                >
                                    <span>
                                        View Certificate
                                    </span>

                                    <span>
                                        ↗
                                    </span>
                                </a>
                            </div>
                        )}


                        {/* GitHub */}

                        {project.github && (
                            <div className="project-info-block">
                                <p className="project-info-label">
                                    Repository
                                </p>

                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-github-link"
                                >
                                    <span>
                                        GitHub Repository
                                    </span>

                                    <span>
                                        ↗
                                    </span>
                                </a>
                            </div>
                        )}


                        {/* Last Updated */}

                        {project.lastUpdated && (
                            <div className="project-info-block">
                                <p className="project-info-label">
                                    Last Updated
                                </p>

                                <p className="project-last-updated">
                                    {project.lastUpdated}
                                </p>
                            </div>
                        )}

                    </aside>


                    {/* =========================
                        MAIN CONTENT
                    ========================= */}

                    <div className="project-main-content">

                        {/* Project Preview */}

                        {project.status === "In Progress" ? (
                            <div className="project-in-progress">
                                <div className="in-progress-icon">
                                    <i className="fa-solid fa-code"></i>
                                </div>

                                <p className="in-progress-label">
                                    PROJECT IN PROGRESS
                                </p>

                                <h2>
                                    Something exciting is being built.
                                </h2>

                                <p className="in-progress-description">
                                    This project is currently under development.
                                    Check back soon for the completed version.
                                </p>

                                <div className="in-progress-loader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        ) : (
                            <div className="project-video-reveal">
                                <div className="project-detail-video">
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
                                </div>
                            </div>
                        )}


                        {/* About the Project */}

                        <div
                            className="project-description-section scroll-reveal"
                            ref={descriptionRef}
                        >
                            <p className="project-description-label">
                                About the Project
                            </p>

                            <p className="project-detail-description">
                                {project.description}
                            </p>
                        </div>


                        {/* Detailed Project Content */}

                        {project.sections &&
                            project.sections.length > 0 && (
                                <div
                                    className="project-full-content scroll-reveal"
                                    ref={fullContentRef}
                                >
                                    {project.sections.map(
                                        (section, index) => (
                                            <div
                                                className="project-about-section"
                                                key={index}
                                            >
                                                <h3>
                                                    {section.title}
                                                </h3>

                                                {section.type === "list" ? (
                                                    <ul>
                                                        {section.content.map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                >
                                                                    {item}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p>
                                                        {section.content}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProjectDetails;