"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../AuthPage.module.css";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);
    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        { email },
      );
      setFeedback("If this email exists, a password reset link has been sent.");
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Unable to request password reset.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.panel}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>
            Enter your account email to receive reset instructions.
          </p>
        </div>

        {error && (
          <div className={`${styles.message} ${styles.error}`}>{error}</div>
        )}
        {feedback && (
          <div className={`${styles.message} ${styles.success}`}>
            {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/login" className={styles.link}>
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
