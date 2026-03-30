"use client";

export default function DatabasePage() {
  return (
    <div className="overflow-y-auto h-full" style={{ padding: 32 }}>
      <h2
        className="m-0"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 26,
          color: "#1B2A4A",
          marginBottom: 4,
        }}
      >
        Author Database
      </h2>
      <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13, marginBottom: 28 }}>
        Your complete author catalog and book records
      </p>

      {/* Empty State */}
      <div
        className="bg-white rounded-xl flex flex-col items-center justify-center"
        style={{
          padding: "64px 32px",
          border: "1px solid #E8EEF5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#EEF3FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          📚
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#1B2A4A" }}>
          No books yet
        </h3>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: "#7A8BA0", maxWidth: 400, lineHeight: 1.5 }}>
          Import your book data via the Import page or add your first book manually to start building your catalog.
        </p>
        <button
          className="border-none cursor-pointer rounded-lg text-white"
          style={{
            background: "#1B2A4A",
            padding: "12px 24px",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          + Add Your First Book
        </button>
      </div>
    </div>
  );
}
