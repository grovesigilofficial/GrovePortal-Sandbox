import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Grove Portal — Sandbox</h1>
      <h2>Uberman Sleep Day: <span id="counter-display">0</span></h2>
      <h3>Current Time: <span id="live-timer">00:00:00.000</span></h3>

      <nav>
        <Link href="/lock">Admin Login</Link> |{" "}
        <Link href="/dashboard">Dashboard</Link> |{" "}
        <Link href="/admin">Admin Panel</Link>
      </nav>

      <p style={{ marginTop: 24, color: "#aaf" }}>
        NOTE: This sandbox stores local state only (localStorage). Do not use it for production data.
      </p>
    </main>
  );
}
