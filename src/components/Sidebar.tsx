"use client";

import { NAV_ITEMS } from "@/lib/mockData";
import Image from "next/image";

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{ width: 220, background: "#1B2A4A" }}
    >
      {/* Logo */}
      <div className="px-5 pt-7 pb-5">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Authr Associates" width={48} height={48} className="opacity-90" />
          <div>
            <p
              className="m-0 text-white"
              style={{
                fontSize: 20,
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-0.3px",
              }}
            >
              Authr
            </p>
            <p
              className="m-0"
              style={{
                fontSize: 13,
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#C9A84C",
                letterSpacing: "1.5px",
              }}
            >
              Associates
            </p>
          </div>
        </div>
        <p
          className="mt-1.5 mb-0"
          style={{
            fontSize: 8,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Courier New', monospace",
          }}
        >
          Partners in Publishing
        </p>
      </div>

      {/* Nav Items */}
      <div
        className="flex-1 px-2.5 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {NAV_ITEMS.map(({ id, icon, label }) => {
          const active = activeSection === id;
          return (
            <div
              key={id}
              onClick={() => onNavigate(id)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer mb-0.5 transition-colors duration-150"
              style={{
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active ? "white" : "rgba(255,255,255,0.6)",
                }}
              >
                {label}
              </span>
              {active && (
                <div
                  className="ml-auto rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: "#C9A84C",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* User Profile */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: 32,
              height: 32,
              background: "#2E5FA3",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            JD
          </div>
          <div>
            <p className="m-0 text-white" style={{ fontSize: 12, fontWeight: 600 }}>
              J. Doe
            </p>
            <p className="m-0" style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
              Pro Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
