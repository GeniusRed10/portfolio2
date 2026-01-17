"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".contact-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const form = e.target;
      const formDataEncoded = new URLSearchParams(new FormData(form)).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataEncoded,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: "mail-outline",
      href: "mailto:redlagarto10@gmail.com",
      label: "redlagarto10@gmail.com",
    },
    {
      name: "GitHub",
      icon: "logo-github",
      href: "https://github.com/geniusred10",
      label: "github.com/geniusred10",
    },
    {
      name: "LinkedIn",
      icon: "logo-linkedin",
      href: "https://linkedin.com/in/romeo-lagarto-a381ab379",
      label: "Romeo Lagarto",
    },
    {
      name: "Facebook",
      icon: "logo-facebook",
      href: "https://www.facebook.com/miyonggos",
      label: "facebook.com/miyonggos",
    },
  ];

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <div className="contact-content">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>Let&apos;s work together</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-form-container">
            <h3>Contact Form</h3>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden" style={{ display: "none" }}>
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="form-status success">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="form-status error">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          <div className="contact-info">
            <h3>Connect With Me</h3>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <ion-icon name={link.icon}></ion-icon>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
