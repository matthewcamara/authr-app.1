"use client";

import Sparkline from "@/components/Sparkline";
import { MOCK_BOOKS, SPARKLINE_DATA } from "@/lib/mockData";

export default function DashboardPage() {
  const totalRoyalties = MOCK_BOOKS.reduce((s, b) => s + b.royalties, 0);
  const totalUnits = MOCK_BOOKS.reduce((s, b) => s + b.units, 0);
  const totalReviews = MOCK_BOOKS.reduce((s, b) => s + b.reviews, 0);

  const kpis = [
    {
      label: "Total Royalties (MTD)",
      value: `$${totalRoyalties.toLocaleString("en", { minimumFractionDigits: 2 })}`,
      sub: "+18% vs last month",
      up: true,
      data: SPARKLINE_DATA.royalties,
      color: "#1B6B4A",
    },
    {
      label: "Units Sold",
      value: totalUnits.toLocaleString(),
      sub: "Across 3 titles",
      up: true,
      data: SPARKLINE_DATA.units,
      color: "#2E5FA3",
    },
    {
      label: "Total Reviews",
      value: totalReviews.toLocaleString(),
      sub: "+10 this week",
      up: true,
      data: SPARKLINE_DATA.reviews,
      color: "#7C3A6B",
    },
  ];

  return (
    <div className="overflow-y-auto h-full" style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2
          className="m-0"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 26,
            color: "#1B2A4A",
          }}
        >
          Your Author Dashboard
        </h2>
        <p className="m-0 mt-1" style={{ color: "#7A8BA0", fontSize: 13 }}>
          Last updated: Today · March 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 28 }}
      >
        {kpis.map(({ label, value, sub, up, data, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl"
            style={{
              padding: "20px 20px 16px",
              border: "1px solid #E8EEF5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <p
              className="m-0"
              style={{
                color: "#7A8BA0",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {label}
            </p>
            <p
              className="m-0"
              style={{
                color: "#1B2A4A",
                fontSize: 26,
                fontWeight: 700,
                fontFamily: "var(--font-serif)",
                marginBottom: 4,
              }}
            >
              {value}
            </p>
            <div className="flex justify-between items-end">
              <span
                style={{
                  color: up ? "#1B6B4A" : "#C0392B",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {up ? "▲" : "▼"} {sub}
              </span>
              <Sparkline data={data} color={color} />
            </div>
          </div>
        ))}
      </div>

      {/* Books Table */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{
          border: "1px solid #E8EEF5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #E8EEF5",
          }}
        >
          <h3 className="m-0" style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>
            Title Performance
          </h3>
          <button
            className="bg-transparent border-none cursor-pointer"
            style={{ fontSize: 12, color: "#2E5FA3", fontWeight: 600 }}
          >
            + Add Book
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F7F9FC" }}>
              {["Title", "Genre", "Royalties", "Units", "KU Reads", "BSR", "Reviews"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      color: "#7A8BA0",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKS.map((b, i) => (
              <tr
                key={b.asin}
                style={{
                  borderTop: "1px solid #F0F4F8",
                  background: i % 2 === 0 ? "white" : "#FAFBFD",
                }}
              >
                <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1B2A4A" }}>
                  {b.title}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      background: "#EEF3FF",
                      color: "#2E5FA3",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {b.genre}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: "#1B6B4A", fontWeight: 700 }}>
                  ${b.royalties.toFixed(2)}
                </td>
                <td style={{ padding: "12px 16px" }}>{b.units}</td>
                <td style={{ padding: "12px 16px" }}>
                  {b.ku > 0 ? b.ku.toLocaleString() : "—"}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      color: b.bsr_change < 0 ? "#1B6B4A" : "#C0392B",
                      fontWeight: 600,
                    }}
                  >
                    #{b.bsr.toLocaleString()} {b.bsr_change < 0 ? "▲" : "▼"}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontWeight: 700, color: "#1B2A4A" }}>{b.reviews}</span>
                  {b.rev_change > 0 && (
                    <span style={{ color: "#1B6B4A", fontSize: 11, marginLeft: 4 }}>
                      +{b.rev_change}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
