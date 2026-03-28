import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — CareerAI",
};

const tools = [
  {
    href: "/resume-generator",
    title: "Resume Generator",
    description:
      "Create a professional, ATS-optimized resume from scratch by inputting your basic details.",
    icon: "📄",
    cta: "Generate Resume",
  },
  {
    href: "/resume-improver",
    title: "Resume Improver",
    description:
      "Paste your existing resume and let AI rewrite it to be more impactful and professional.",
    icon: "✨",
    cta: "Improve Resume",
  },
  {
    href: "/interview",
    title: "Interview Prep",
    description:
      "Generate targeted behavioral and technical interview questions with model answers.",
    icon: "🎯",
    cta: "Prep for Interview",
  },
];

export default function Dashboard() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "64px 24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <h1
          className="font-serif"
          style={{
            fontSize: "2.75rem",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            marginBottom: "12px",
          }}
        >
          Your Career Dashboard
        </h1>
        <p
          style={{
            color: "var(--muted-foreground)",
            fontSize: "1.05rem",
          }}
        >
          Select a tool below to start optimizing your professional presence.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "16px",
                backgroundColor: "var(--card)",
                padding: "28px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                cursor: "pointer",
                transition: "border-color 0.15s, transform 0.1s",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{tool.icon}</div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                }}
              >
                {tool.title}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {tool.description}
              </p>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--accent-green)",
                }}
              >
                {tool.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
