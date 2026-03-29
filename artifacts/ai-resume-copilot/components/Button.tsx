import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export default function Button({
  loading = false,
  loadingText,
  variant = "primary",
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "13px 28px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.15s",
    border: "none",
    fontFamily: "inherit",
    lineHeight: 1,
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: isDisabled ? "var(--muted)" : "var(--accent-green)",
      color: isDisabled ? "var(--muted-foreground)" : "#ffffff",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--muted-foreground)",
    },
  };

  return (
    <button
      disabled={isDisabled}
      style={{ ...baseStyle, ...variantStyles[variant] }}
      {...props}
    >
      {loading ? (
        <>
          <LoadingDot />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function LoadingDot() {
  return (
    <span
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        display: "inline-block",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
