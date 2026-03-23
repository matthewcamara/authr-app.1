"use client";

import { MOCK_CONTACTS, STATUS_COLORS } from "@/lib/mockData";

export default function CRMPage() {
  const stats = [
    ["Total Contacts", "5", "across all lists"],
    ["Awaiting Reply", "2", "need your attention"],
    ["Follow-Ups Due", "1", "overdue by 5+ days"],
    ["Response Rate", "40%", "above avg. 28%"],
  ];

  return (
    <div className="overflow-y-auto h-full" style={{ padding: 32 }}>
      {/* Header */}
      <div className="flex justify-between items-start" style={{ marginBottom: 28 }}>
        <div>
          <h2
            className="m-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 26,
              color: "#1B2A4A",
              marginBottom: 4,
            }}
          >
            Reviewer CRM
          </h2>
          <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13 }}>
            Track every reviewer, blogger, librarian, and media contact in one place
          </p>
        </div>
        <button
          className="border-none cursor-pointer rounded-lg text-white"
          style={{
            background: "#1B2A4A",
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          + Add Contact
        </button>
      </div>

      {/* Stats */}
      <div
        className="grid gap-3.5"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 24 }}
      >
        {stats.map(([l, v, s]) => (
          <div
            key={l}
            className="bg-white rounded-lg"
            style={{ padding: "16px 18px", border: "1px solid #E8EEF5" }}
          >
            <p
              className="m-0"
              style={{
                fontSize: 11,
                color: "#7A8BA0",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 4,
              }}
            >
              {l}
            </p>
            <p
              className="m-0"
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#1B2A4A",
                fontFamily: "var(--font-serif)",
                marginBottom: 2,
              }}
            >
              {v}
            </p>
            <p className="m-0" style={{ fontSize: 11, color: "#9AA8B8" }}>
              {s}
            </p>
          </div>
        ))}
      </div>

      {/* Contacts List */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: "1px solid #E8EEF5" }}
      >
        {MOCK_CONTACTS.map((c, i) => {
          const statusColor = STATUS_COLORS[c.status] || "#6366F1";
          return (
            <div
              key={c.name}
              className="grid items-center cursor-pointer"
              style={{
                gridTemplateColumns: "40px 1fr auto auto auto",
                gap: 16,
                padding: "16px 20px",
                borderTop: i > 0 ? "1px solid #F0F4F8" : "none",
              }}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  background: "#EEF3FF",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#2E5FA3",
                }}
              >
                {c.avatar}
              </div>

              {/* Name & Type */}
              <div>
                <p className="m-0" style={{ fontSize: 14, fontWeight: 600, color: "#1B2A4A", marginBottom: 2 }}>
                  {c.name}
                </p>
                <p className="m-0" style={{ fontSize: 12, color: "#7A8BA0" }}>
                  {c.type} · {c.blog}
                </p>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "#F0F4F8",
                      color: "#4A5568",
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontSize: 11,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Last Contacted */}
              <span style={{ fontSize: 11, color: "#9AA8B8" }}>Last: {c.last}</span>

              {/* Status Badge */}
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background: statusColor + "22",
                  color: statusColor,
                }}
              >
                {c.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
