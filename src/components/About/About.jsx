import "./About.css";

function About() {
    return (
        <section
            className="about"
            id="about"
        >
            <div className="about-heading">
                <p className="section-label">
                    About Me
                </p>

                <p className="about-intro">
                    Beyond the code, projects, and résumé.
                </p>
            </div>

            <div className="about-card">
                <div className="about-photo">
                    <img
                        src="/assets/shreya.jpg"
                        alt="Shreya Gaikwad"
                    />
                </div>

                <div className="about-content">
                    <p className="about-greeting">
                        Hi, I'm{" "}
                        <span className="about-name">
                            Shreya Gaikwad
                        </span>
                        .
                    </p>

                    <p className="about-description">
                        I'm a final-year Artificial Intelligence and
                        Machine Learning student who enjoys building
                        things, experimenting with technology, and
                        learning through hands-on projects.
                    </p>

                    <p className="about-description">
                        I enjoy exploring AI, machine learning, and
                        full-stack development, especially when I can
                        turn an idea into something people can actually
                        use.
                    </p>

                    <p className="about-description">
                        Outside of academics and coding, I love
                        spending time on my hobbies, exploring new
                        places, discovering new things, and doing
                        things that keep me creative and curious.
                    </p>

                    <div className="about-interests">
                        Python · AI/ML · Full Stack · Generative AI · Spanish
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;