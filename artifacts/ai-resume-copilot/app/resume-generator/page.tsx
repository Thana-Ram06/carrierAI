"use client";

import { useState } from "react";
import OutputCard from "@/components/OutputCard";
import WarningBanner from "@/components/WarningBanner";

export default function ResumeGenerator() {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    experience: "",
    education: "",
    targetRole: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate resume");
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
        Resume Generator
      </h1>
      <p
        style={{
          color: "var(--muted-foreground)",
          marginBottom: "32px",
          fontSize: "1rem",
        }}
      >
        Let AI craft a professional resume tailored for your industry.
      </p>

      <WarningBanner />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field
            label="Full Name"
            placeholder="e.g. Jane Doe"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />
          <Field
            label="Target Role (Optional)"
            placeholder="e.g. Senior Software Engineer"
            value={form.targetRole}
            onChange={(v) => setForm({ ...form, targetRole: v })}
          />
        </div>

        <TextArea
          label="Skills"
          placeholder="List your technical and soft skills..."
          value={form.skills}
          onChange={(v) => setForm({ ...form, skills: v })}
          required
        />

        <TextArea
          label="Experience"
          placeholder="Describe your past roles, companies, and achievements..."
          value={form.experience}
          onChange={(v) => setForm({ ...form, experience: v })}
          required
        />

        <TextArea
          label="Education"
          placeholder="Your degrees, certifications, institutions..."
          value={form.education}
          onChange={(v) => setForm({ ...form, education: v })}
          required
        />

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
          {loading ? "Generating..." : "Generate Resume →"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "16px", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {result && <OutputCard content={result} title="Generated Resume" />}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--foreground)",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
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
  );
}

function TextArea({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--foreground)",
        }}
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--input-bg)",
          color: "var(--foreground)",
          fontSize: "0.9rem",
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
          width: "100%",
        }}
      />
    </div>
  );
}
