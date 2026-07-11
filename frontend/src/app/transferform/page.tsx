"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../TransferForm.module.css";

const initialForm = {
  teacherId: "",
  transferType: "school-to-school",
  currentLocation: "",
  requestedLocations: "",
  reason: "",
};

export default function TransferFormPage() {
  const [formData, setFormData] = useState(initialForm);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transfers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unable to submit transfer request");
      }

      setFeedback(
        "Transfer request submitted successfully. You will receive the result soon.",
      );
      setFormData(initialForm);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.panel}>
        <section className={styles.primary}>
          <div className={styles.header}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Transfer request
            </p>
            <h1 className={styles.title}>Submit a teacher transfer form</h1>
            <p className={styles.subtitle}>
              Provide the requested information and submit your transfer request
              for review.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
              <div className={`${styles.alert} ${styles.error}`}>{error}</div>
            )}
            {feedback && (
              <div className={`${styles.alert} ${styles.success}`}>
                {feedback}
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="teacherId">
                Teacher ID
              </label>
              <input
                id="teacherId"
                name="teacherId"
                type="text"
                className={styles.input}
                value={formData.teacherId}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="transferType">
                Transfer Type
              </label>
              <select
                id="transferType"
                name="transferType"
                className={styles.select}
                value={formData.transferType}
                onChange={handleChange}
              >
                <option value="school-to-school">School-to-School</option>
                <option value="woreda-to-woreda">Woreda-to-Woreda</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="currentLocation">
                Current School or Woreda
              </label>
              <input
                id="currentLocation"
                name="currentLocation"
                type="text"
                className={styles.input}
                value={formData.currentLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="requestedLocations">
                Requested Locations
              </label>
              <input
                id="requestedLocations"
                name="requestedLocations"
                type="text"
                className={styles.input}
                placeholder="Separate multiple locations with commas"
                value={formData.requestedLocations}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="reason">
                Reason for transfer
              </label>
              <textarea
                id="reason"
                name="reason"
                className={styles.textarea}
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={loading}
                className={styles.button}
              >
                {loading ? "Submitting..." : "Submit request"}
              </button>
              <Link href="/result" className={styles.link}>
                View sample result
              </Link>
            </div>
          </form>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h2 className={styles.cardTitle}>Need help?</h2>
            <p className={styles.cardText}>
              Make sure the teacher ID and current location are correct before
              submitting. Only teachers with enough service years can request a
              transfer.
            </p>
          </div>

          <div className={styles.sidebarCard}>
            <h2 className={styles.cardTitle}>How results work</h2>
            <p className={styles.cardText}>
              Once submitted, requests are reviewed by the appropriate MERSU
              officer and a decision is issued in the result page.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
