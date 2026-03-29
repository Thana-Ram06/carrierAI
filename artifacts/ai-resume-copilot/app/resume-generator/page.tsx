"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Button from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
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

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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
      <p style={{ color: "var(--muted-foreground)", marginBottom: "32px", fontSize: "1rem" }}>
        Let AI craft a professional, ATS-optimized resume tailored for your industry.
      </p>

      <WarningBanner />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Input
            label="Full Name"
            placeholder="e.g. Jane Doe"
            value={form.name}
            onChange={set("name")}
            required
          />
          <Input
            label="Target Role (Optional)"
            placeholder="e.g. Senior Software Engineer"
            value={form.targetRole}
            onChange={set("targetRole")}
          />
        </div>

        <Textarea
          label="Skills"
          placeholder="List your technical and soft skills..."
          value={form.skills}
          onChange={set("skills")}
          rows={3}
          required
        />

        <Textarea
          label="Work Experience"
          placeholder="Describe your past roles, companies, and achievements..."
          value={form.experience}
          onChange={set("experience")}
          rows={5}
          required
        />

        <Textarea
          label="Education"
          placeholder="Your degrees, certifications, institutions..."
          value={form.education}
          onChange={set("education")}
          rows={3}
          required
        />

        <Button type="submit" loading={loading} loadingText="Generating...">
          Generate Resume →
        </Button>
      </form>

      {error && (
        <p style={{ color: "#dc2626", marginTop: "16px", fontSize: "0.9rem" }}>{error}</p>
      )}

      {result && <OutputCard content={result} title="Generated Resume" />}
    </div>
  );
}
