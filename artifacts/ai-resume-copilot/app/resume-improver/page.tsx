"use client";

import { useState } from "react";
import OutputCard from "@/components/OutputCard";
import WarningBanner from "@/components/WarningBanner";

export default function ResumeImprover() {
  const [resume, setResume] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/improve-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, targetRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to improve resume");
      setResult(data.content);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
      <h1
        className="font-serif"
        style={{
          fontSize: "2.25rem",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          marginBottom: "8px",
          color: "var(--foreground)",
        }}
      >
        Resume Improver
      </h1>
      <p
        style={{
          color: "var(--muted-foreground)",
          marginBottom: "32px",
          fontSize: "1rem",
        }}
      >
        Paste your existing resume and let AI transform it into a compelling,
        professional document.
      </p>

      <WarningBanner />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            Target Role (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Product Manager, Data Scientist"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--input-bg)",
              color: "var(--foreground)",
              fontSize: "0.9rem",
              outline: "none",
              width: "100%",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            Your Current Resume
          </label>
          <textarea
            placeholder="Paste your entire resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
            rows={14}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--input-bg)",
              color: "var(--foreground)",
              fontSize: "0.875rem",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.6,
              width: "100%",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            backgroundColor: loading ? "var(--muted)" : "var(--accent-green)",
            color: loading ? "var(--muted-foreground)" : "#ffffff",
            border: "none",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.15s",
            alignSelf: "flex-start",
          }}
        >
          {loading ? "Improving..." : "Improve Resume →"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "16px", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {result && <OutputCard content={result} title="Improved Resume" />}
    </div>
  );
}
