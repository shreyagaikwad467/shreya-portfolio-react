import "./Footer.css";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-name">
                    Shreya Gaikwad
                </p>

                <div className="footer-center">
                    <p>© 2026</p>
                    <p>Built with React & curiosity.</p>
                </div>

                <button
                    className="back-to-top"
                    onClick={scrollToTop}
                >
                    <span>Back to top</span>
                    <span className="back-to-top-arrow">
                        ↑
                    </span>
                </button>
            </div>
        </footer>
    );
}

export default Footer;