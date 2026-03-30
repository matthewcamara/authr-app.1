"use client";

import { Search, Shield, Tag, ExternalLink } from "lucide-react";

export default function CatalogPage() {
  return (
    <div className="overflow-y-auto h-full" style={{ padding: 32 }}>
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
            Book Catalog
          </h2>
          <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13 }}>
            Content protection, SEO tagging, and discoverability management
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
          + Add Book
        </button>
      </div>

      {/* Search */}
      <div
        className="bg-white rounded-xl"
        style={{
          padding: "16px 20px",
          border: "1px solid #E8EEF5",
          marginBottom: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-3">
          <Search size={18} color="#7A8BA0" />
          <input
            type="text"
            placeholder="Search by title, ISBN, ASIN, or keyword..."
            className="flex-1"
            style={{
              border: "none",
              fontSize: 14,
              color: "#1B2A4A",
              background: "transparent",
              outline: "none",
            }}
          />
          <button
            className="border-none cursor-pointer rounded-lg"
            style={{
              background: "#EEF3FF",
              color: "#2E5FA3",
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Search ISBN Records
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 24 }}
      >
        <div
          className="bg-white rounded-xl"
          style={{
            padding: "24px 20px",
            border: "1px solid #E8EEF5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Shield size={24} color="#2E5FA3" style={{ marginBottom: 12 }} />
          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>
            Content Protection
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "#7A8BA0", lineHeight: 1.5 }}>
            Monitor for unauthorized copies and leaks of your book content across the web.
          </p>
        </div>

        <div
          className="bg-white rounded-xl"
          style={{
            padding: "24px 20px",
            border: "1px solid #E8EEF5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Tag size={24} color="#1B6B4A" style={{ marginBottom: 12 }} />
          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>
            SEO Tagging
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "#7A8BA0", lineHeight: 1.5 }}>
            Auto-generated tags to optimize search engine visibility and Amazon discoverability.
          </p>
        </div>

        <div
          className="bg-white rounded-xl"
          style={{
            padding: "24px 20px",
            border: "1px solid #E8EEF5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <ExternalLink size={24} color="#7C3A6B" style={{ marginBottom: 12 }} />
          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>
            Public Records Search
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "#7A8BA0", lineHeight: 1.5 }}>
            Search ISBN databases and public records to find and verify your book listings.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div
        className="bg-white rounded-xl"
        style={{
          padding: "48px 32px",
          border: "1px solid #E8EEF5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 600, color: "#1B2A4A" }}>
          Your catalog is empty
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#7A8BA0" }}>
          Import your books to start managing your catalog, SEO tags, and content protection.
        </p>
      </div>
    </div>
  );
}
