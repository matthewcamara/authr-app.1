"use client";

import { useState } from "react";
import { GENRES, AD_COPY_ANGLES } from "@/lib/mockData";

export default function MetadataPage() {
  const [genre, setGenre] = useState("Fantasy");
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState([
    "dark fantasy series",
    "epic fantasy adventure",
    "magic system books",
    "coming of age fantasy",
    "best fantasy 2025",
  ]);

  const removeKeyword = (keyword: string) => {
    setKeywords((kws) => kws.filter((k) => k !== keyword));
  };

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
        Metadata & Ad Helper
      </h2>
      <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13, marginBottom: 28 }}>
        Optimize discoverability with AI-powered keywords, blurbs, and ad copy
      </p>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Book Details */}
        <div
          className="bg-white rounded-xl"
          style={{
            padding: 24,
            border: "1px solid #E8EEF5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            className="m-0"
            style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 16 }}
          >
            📚 Book Details
          </h3>
          <div style={{ marginBottom: 14 }}>
            <label
              className="block"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7A8BA0",
                marginBottom: 6,
              }}
            >
              BOOK TITLE
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Hollow King"
              className="w-full"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #D8E4EE",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              className="block"
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7A8BA0",
                marginBottom: 6,
              }}
            >
              GENRE
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-white"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #D8E4EE",
                fontSize: 14,
              }}
            >
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Keywords */}
        <div
          className="bg-white rounded-xl"
          style={{
            padding: 24,
            border: "1px solid #E8EEF5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            className="m-0"
            style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 16 }}
          >
            🔑 Suggested Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k}
                onClick={() => removeKeyword(k)}
                className="cursor-pointer"
                style={{
                  background: "#EEF3FF",
                  color: "#2E5FA3",
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {k} <span style={{ opacity: 0.5 }}>✕</span>
              </span>
            ))}
          </div>
          <button
            className="border-none cursor-pointer"
            style={{
              marginTop: 14,
              fontSize: 12,
              color: "#2E5FA3",
              background: "#EEF3FF",
              borderRadius: 8,
              padding: "7px 14px",
              fontWeight: 600,
            }}
          >
            ↻ Refresh suggestions
          </button>
        </div>

        {/* Ad Copy Angles */}
        <div
          className="bg-white rounded-xl"
          style={{
            padding: 24,
            border: "1px solid #E8EEF5",
            gridColumn: "1 / -1",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            className="m-0"
            style={{ fontSize: 14, fontWeight: 700, color: "#1B2A4A", marginBottom: 4 }}
          >
            📣 Ad Copy Angles
          </h3>
          <p className="m-0" style={{ color: "#7A8BA0", fontSize: 12, marginBottom: 16 }}>
            5 angles generated for {genre} · {title || "The Hollow King"}
          </p>
          <div
            className="grid gap-2.5"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {AD_COPY_ANGLES.map(({ angle, copy }) => (
              <div
                key={angle}
                className="rounded-lg"
                style={{
                  background: "#F7F9FC",
                  padding: 14,
                  border: "1px solid #E8EEF5",
                }}
              >
                <p
                  className="m-0"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#2E5FA3",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                  }}
                >
                  {angle}
                </p>
                <p className="m-0" style={{ fontSize: 12, color: "#4A5568", lineHeight: 1.5 }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
