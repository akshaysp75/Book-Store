import React, { useRef, useState } from "react";
import "./footer.css";
import emailjs from "@emailjs/browser";

const Footer = () => {
    const form = useRef();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackType, setFeedbackType] = useState(""); // success | error

    const serviceId = "service_lp72fau";
    const templateId = "template_yf6lmea";
    const publicKey = "-XigdCAFHgY9sM3Ei";

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedbackMessage("");

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((response) => {
                console.log(response.text);
                setFeedbackType("success");
                setFeedbackMessage("Thanks! Your message has been sent.");
                e.target.reset();
            })
            .catch((error) => {
                console.error(error.text);
                setFeedbackType("error");
                setFeedbackMessage("Oops! Something went wrong. Please try again.");
            });
    };

    return (
        <section className="footer-container">
            <div className="container">
                <h2>Have a question? Let's get in touch.</h2>
                <p className="footer-description">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} ref={form} className="footer-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="user_name" id="name" className="form-input" placeholder="Your name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="user_email" id="email" className="form-input" placeholder="you@example.com" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="query" className="form-label">Message</label>
                        <textarea className="form-input" name="message" id="query" rows="4" placeholder="How can we help you?" required></textarea>
                    </div>

                    {feedbackMessage && (
                        <p className={`feedback-message ${feedbackType}`}>
                            {feedbackMessage}
                        </p>
                    )}

                    <div className="form-group">
                        <button type="submit" className="form-submit">Send Message</button>
                    </div>
                </form>

                <p className="footer-copy">&copy; 2025 BookStore. All rights reserved.</p>
            </div>
        </section>
    );
};

export default Footer;
