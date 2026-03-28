export default function WarningBanner() {
  return (
    <div
      style={{
        border: "1px solid #92400e",
        borderRadius: "10px",
        backgroundColor: "rgba(120, 53, 15, 0.08)",
        padding: "12px 16px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "0.875rem",
        color: "#b45309",
      }}
    >
      <span style={{ fontSize: "1rem" }}>⚠️</span>
      <span>
        <strong>Don&apos;t refresh the page</strong> — your data will be lost.
      </span>
    </div>
  );
}
