"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
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
      <p style={{ color: "var(--muted-foreground)", marginBottom: "32px", fontSize: "1rem" }}>
        Paste your existing resume and let AI transform it into a compelling, professional document.
      </p>

      <WarningBanner />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="Target Role (Optional)"
          placeholder="e.g. Product Manager, Data Scientist"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />

        <Textarea
          label="Your Current Resume"
          placeholder="Paste your entire resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={16}
          required
        />

        <Button type="submit" loading={loading} loadingText="Improving...">
          Improve Resume →
        </Button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {result && <OutputCard content={result} title="Improved Resume" />}
    </div>
  );
}
