import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { id: "home", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "experience", label: "Experience" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 180;
            let currentSection = "home";

            navItems.forEach(({ id }) => {
                const section = document.getElementById(id);

                if (!section) {
                    return;
                }

                const sectionTop = section.offsetTop;
                const sectionBottom =
                    sectionTop + section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {
                    currentSection = id;
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleNavClick = (event, id) => {
        event.preventDefault();

        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth"
        });

        window.history.replaceState(null, "", `#${id}`);
        setActiveSection(id);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="nav-links">
                    {navItems.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={
                                activeSection === id
                                    ? "active"
                                    : ""
                            }
                            onClick={(event) =>
                                handleNavClick(event, id)
                            }
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <a
                    href="/assets/Shreya Gaikwad_cv.pdf"
                    download
                    className="resume-button"
                >
                    <i className="fa-solid fa-download"></i>
                    <span>Download Resume</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;