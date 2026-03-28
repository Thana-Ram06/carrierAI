"use client";

import { useState } from "react";

interface OutputCardProps {
  content: string;
  title?: string;
}

export default function OutputCard({ content, title = "Result" }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius)",
        backgroundColor: "var(--card)",
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--muted-foreground)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            backgroundColor: "transparent",
            color: "var(--foreground)",
            fontSize: "0.8rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontFamily: "var(--font-sans)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          color: "var(--foreground)",
          margin: 0,
        }}
      >
        {content}
      </pre>
    </div>
  );
}
