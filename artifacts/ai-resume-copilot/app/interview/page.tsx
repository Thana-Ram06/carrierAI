"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import WarningBanner from "@/components/WarningBanner";

interface QAPair {
  question: string;
  answer: string;
}

export default function InterviewPrep() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [questions, setQuestions] = useState<QAPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuestions([]);
    setExpanded(null);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate questions");
      setQuestions(data.questions);
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
        Interview Prep
      </h1>
      <p style={{ color: "var(--muted-foreground)", marginBottom: "32px", fontSize: "1rem" }}>
        Get targeted interview questions and model answers for your next role.
      </p>

      <WarningBanner />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="Target Role"
          placeholder="e.g. Software Engineer, Marketing Manager"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <Textarea
          label="Key Skills (Optional)"
          placeholder="e.g. React, Node.js, leadership, agile..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          rows={3}
        />

        <Button type="submit" loading={loading} loadingText="Generating Questions...">
          Generate Q&amp;A →
        </Button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {questions.length > 0 && (
        <div style={{ marginTop: "32px" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--muted-foreground)",
              marginBottom: "16px",
            }}
          >
            {questions.length} Questions Generated
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {questions.map((qa, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  backgroundColor: "var(--card)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--foreground)",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 500, flex: 1, lineHeight: 1.5 }}>
                    {qa.question}
                  </span>
                  <span style={{ color: "var(--muted-foreground)", flexShrink: 0, fontSize: "0.75rem" }}>
                    {expanded === i ? "▲" : "▼"}
                  </span>
                </button>

                {expanded === i && (
                  <div
                    style={{
                      padding: "16px 20px 20px 56px",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: "var(--muted-foreground)",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {qa.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
