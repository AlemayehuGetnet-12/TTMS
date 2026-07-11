import Link from "next/link";
import styles from "../AdminPage.module.css";

export default function AdminDashboard() {
  return (
    <main className={styles.container}>
      <section className={styles.panel}>
        <div>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to the administration panel. Manage users, review transfer
            requests, and configure system settings.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>User Management</h2>
            <p className={styles.cardText}>
              Create, update, and activate or deactivate users across all roles.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Transfer Requests</h2>
            <p className={styles.cardText}>
              Review pending transfer requests and approve or reject them.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Reports</h2>
            <p className={styles.cardText}>
              Generate transfer summaries and export school or teacher reports.
            </p>
          </div>
        </div>

        <Link href="/pdf-report" className={styles.cta}>
          Download system PDF summary
        </Link>
      </section>
    </main>
  );
}
