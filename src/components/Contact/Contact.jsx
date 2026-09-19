import { useState } from "react";
import "./Contact.css";
import useScrollReveal from "../../hooks/useScrollReveal";

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactRef = useScrollReveal();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(
                "https://formspree.io/f/mdenwbop",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (response.ok) {
                form.reset();
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Form submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="contact scroll-reveal"
            id="contact"
            ref={contactRef}
        >
            {!submitted ? (
                <>
                    <div className="contact-info">
                        <p className="section-label">
                            Let's connect
                        </p>

                        <h2>Get In Touch</h2>

                        <p className="contact-intro">
                            Have an idea, a project, or simply want to say
                            hello? I'd love to hear from you.
                        </p>

                        <div className="contact-socials">
                            <p className="social-heading">
                                Find me here
                            </p>

                            <div className="social-links">
                                <a
                                    href="https://www.instagram.com/shreya_rosa?igsh=MTM4dW1sejVvem8weQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <i className="fa-brands fa-instagram"></i>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/shreya-gaikwad-110636342"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>

                                <a
                                    href="https://github.com/shreyagaikwad467"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>

                            <textarea
                                id="message"
                                name="message"
                                placeholder="Your message"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Sending..."
                                : "Send Message"}
                        </button>
                    </form>
                </>
            ) : (
                <div className="contact-success">
                    <div className="success-symbol">
                        ✦
                    </div>

                    <p className="success-title">
                        Thank you for reaching out.
                    </p>

                    <p className="success-text">
                        It was lovely hearing from you.
                        <br />
                        I'll get back to you shortly.
                    </p>
                </div>
            )}
        </section>
    );
}

export default Contact;