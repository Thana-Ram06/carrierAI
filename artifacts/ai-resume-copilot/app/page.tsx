import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--muted-foreground)",
            marginBottom: "32px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          AI-Powered Career Tools
        </div>

        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            marginBottom: "20px",
          }}
        >
          Build your{" "}
          <span style={{ color: "var(--accent-green)" }}>AI-powered</span>
          <br />
          career
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            marginBottom: "40px",
            maxWidth: "500px",
            margin: "0 auto 40px",
          }}
        >
          Stand out in today&apos;s competitive job market. Generate ATS-optimized
          resumes, improve your existing credentials, and prep for tough
          interviews — all powered by cutting-edge AI.
        </p>

        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 32px",
            borderRadius: "12px",
            backgroundColor: "var(--accent-green)",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.15s",
          }}
        >
          Get Started →
        </Link>

        <div
          style={{
            marginTop: "72px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {[
            {
              title: "Resume Generator",
              desc: "Create professional ATS-friendly resumes from your details.",
            },
            {
              title: "Resume Improver",
              desc: "Transform your existing resume into a compelling document.",
            },
            {
              title: "Interview Prep",
              desc: "Get targeted Q&A pairs to ace your next interview.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                backgroundColor: "var(--card)",
              }}
            >
              <h3
                className="font-serif"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "8px",
                  color: "var(--foreground)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
