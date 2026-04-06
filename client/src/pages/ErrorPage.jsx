import { useRouteError, Link } from "react-router-dom";

const MESSAGES = [
  "Dead drop gone wrong.",
  "Someone talked.",
  "The contact didn't show.",
  "Wrong door. Keep moving.",
  "This path doesn't exist. Neither do we.",
];

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <div className="error-page">
      <div style={{ fontSize: "3rem", color: "var(--crimson)", opacity: 0.4, marginBottom: "1rem" }}>✖</div>
      <h1 className="error-title">{msg}</h1>
      <p className="error-body">
        Whatever you were looking for, it isn&apos;t here. Could&apos;ve been removed. Could&apos;ve never existed.
        Don&apos;t go looking for answers.
      </p>
      <p className="error-code">
        {error?.status ? `${error.status} — ${error.statusText || "Unknown"}` : error?.message || "Unknown error"}
      </p>
      <Link to="/" className="btn btn-crimson">← Back to the Board</Link>
    </div>
  );
}
