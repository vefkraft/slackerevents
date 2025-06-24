"use client";
import React from "react";
import styles from "./page.module.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form
        action="https://formsubmit.co/vefkraft@vefkraft.com"
        method="POST"
        className={styles.form}
      >
        {/* Hidden fields */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Contact Message" />
        <input type="hidden" name="_next" value="https://vefkraft.com" />

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={styles.input}
          />
        </div>

        {/* Subject */}
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject:
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            className={styles.input}
          />
        </div>

        {/* Message */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            required
            className={styles.textarea}
          />
        </div>

        {/* Submit */}
        <button type="submit" className={styles.button}>
          Send
        </button>
        <h2 className={styles.heading}>or</h2>

        <div className={styles.socials}>
          <a
            href="https://facebook.com"
            className={`${styles.icon} ${styles.icon1}`}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            className={`${styles.icon} ${styles.icon2}`}
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            className={`${styles.icon} ${styles.icon3}`}
          >
            <FaLinkedinIn />
          </a>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
