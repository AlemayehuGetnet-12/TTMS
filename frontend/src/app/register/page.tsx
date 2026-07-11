"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../AuthPage.module.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "teacher",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData,
      );
      setFeedback("Account created successfully. You can now log in.");
      setFormData({ username: "", email: "", password: "", role: "teacher" });
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.panel}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.subtitle}>
            Register for TTMS as a teacher, director, or admin.
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
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="teacher">Teacher</option>
              <option value="director">Director</option>
              <option value="wmersu">Woreda MERSU</option>
              <option value="zmersu">Zone MERSU</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/login" className={styles.link}>
            Back to login
          </Link>
          <Link href="/reset-password" className={styles.link}>
            Reset password
          </Link>
        </div>
      </section>
    </main>
  );
}
