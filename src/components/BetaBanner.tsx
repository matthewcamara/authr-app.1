"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

export default function BetaBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #1B2A4A 0%, #2E5FA3 50%, #1B2A4A 100%)",
        borderBottom: "1px solid rgba(201,168,76,0.3)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Sparkles size={16} color="#C9A84C" />
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}>
          <strong style={{ color: "white" }}>You&apos;re exploring the Authr demo.</strong>
          {" "}Like what you see? Get early access with a 14-day free trial.
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <Link
          href="/signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "7px 16px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #C9A84C, #A8872E)",
            color: "#0F1A2E",
            fontSize: 12,
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Join the Waitlist →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
