"use client";

import { useState } from "react";
import { MOCK_AUTOMATIONS } from "@/lib/mockData";

export default function AutomationsPage() {
  const [toggled, setToggled] = useState<Record<string, boolean>>({
    digest: true,
    bsr: true,
    review: true,
    followup: false,
    promo: false,
  });

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
        Automations
      </h2>
      <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13, marginBottom: 28 }}>
        Set it once. Let Authr handle the rest while you write.
      </p>

      <div className="flex flex-col gap-3.5">
        {MOCK_AUTOMATIONS.map((a) => {
          const active = toggled[a.id] ?? false;
          return (
            <div
              key={a.id}
              className="bg-white rounded-xl flex items-center transition-all duration-200"
              style={{
                padding: "20px 24px",
                border: `1px solid ${active ? "#BFDBFE" : "#E8EEF5"}`,
                gap: 20,
                boxShadow: active
                  ? "0 2px 12px rgba(46,95,163,0.08)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 28 }}>{a.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2.5" style={{ marginBottom: 4 }}>
                  <p className="m-0" style={{ fontWeight: 700, fontSize: 15, color: "#1B2A4A" }}>
                    {a.name}
                  </p>
                  <span
                    style={{
                      background: "#F0F4F8",
                      color: "#7A8BA0",
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 10,
                    }}
                  >
                    {a.freq}
                  </span>
                </div>
                <p className="m-0" style={{ fontSize: 13, color: "#7A8BA0", lineHeight: 1.5 }}>
                  {a.desc}
                </p>
              </div>

              {/* Toggle Switch */}
              <div
                onClick={() => setToggled((t) => ({ ...t, [a.id]: !t[a.id] }))}
                className="flex-shrink-0 cursor-pointer relative transition-colors duration-200"
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: active ? "#2E5FA3" : "#D1D9E0",
                }}
              >
                <div
                  className="rounded-full bg-white absolute transition-all duration-200"
                  style={{
                    width: 18,
                    height: 18,
                    top: 3,
                    left: active ? 23 : 3,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
