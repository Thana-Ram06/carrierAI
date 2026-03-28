"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resume-generator", label: "Generator" },
  { href: "/resume-improver", label: "Improver" },
  { href: "/interview", label: "Interview Prep" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--background)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--foreground)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          CareerAI
        </Link>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                  backgroundColor: active ? "var(--muted)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
