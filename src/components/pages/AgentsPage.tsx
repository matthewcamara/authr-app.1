"use client";

import { Bot, FileEdit, Scale, Megaphone, Globe, BookOpen, Languages, Search } from "lucide-react";

export default function AgentsPage() {
  const agents = [
    {
      id: "editorial",
      icon: FileEdit,
      name: "Editorial Support",
      desc: "AI-powered editing suggestions, proofreading, and manuscript feedback tailored to your genre.",
      status: "available",
      color: "#2E5FA3",
    },
    {
      id: "legal",
      icon: Scale,
      name: "Legal Agent",
      desc: "Copyright guidance, contract review highlights, and publishing rights management.",
      status: "coming_soon",
      color: "#7C3A6B",
    },
    {
      id: "branding",
      icon: Megaphone,
      name: "Branding & Outreach",
      desc: "Professional author branding, social media content, and media kit generation.",
      status: "available",
      color: "#1B6B4A",
    },
    {
      id: "publishing",
      icon: BookOpen,
      name: "Publishing Process",
      desc: "Step-by-step automation for your publishing workflow — formatting, uploading, and distribution.",
      status: "available",
      color: "#C0392B",
    },
    {
      id: "seo",
      icon: Search,
      name: "SEO Marketing",
      desc: "Keyword research, metadata optimization, and discoverability strategies across platforms.",
      status: "available",
      color: "#F59E0B",
    },
    {
      id: "translation",
      icon: Languages,
      name: "Translation Agent",
      desc: "Manage translations of your books, track progress, and coordinate with translators.",
      status: "coming_soon",
      color: "#6366F1",
    },
    {
      id: "scraping",
      icon: Globe,
      name: "Web Research",
      desc: "Scrape your personal websites, publication pages, and research sites for content and data.",
      status: "available",
      color: "#0EA5E9",
    },
    {
      id: "custom",
      icon: Bot,
      name: "Custom Agent Builder",
      desc: "Build your own n8n-style automation workflows tailored to your specific publishing needs.",
      status: "coming_soon",
      color: "#1B2A4A",
    },
  ];

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
        Specialized Agents
      </h2>
      <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13, marginBottom: 28 }}>
        AI agents and automation tools built for every stage of the publishing journey
      </p>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {agents.map(({ id, icon: Icon, name, desc, status, color }) => (
          <div
            key={id}
            className="bg-white rounded-xl transition-all duration-200"
            style={{
              padding: "24px",
              border: "1px solid #E8EEF5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              opacity: status === "coming_soon" ? 0.7 : 1,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: `${color}15`,
                }}
              >
                <Icon size={24} color={color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>
                    {name}
                  </h3>
                  {status === "coming_soon" && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#7A8BA0",
                        background: "#F0F4F8",
                        padding: "2px 8px",
                        borderRadius: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: "#7A8BA0", lineHeight: 1.5 }}>
                  {desc}
                </p>
                <button
                  disabled={status === "coming_soon"}
                  className="border-none cursor-pointer rounded-lg"
                  style={{
                    background: status === "coming_soon" ? "#F0F4F8" : "#1B2A4A",
                    color: status === "coming_soon" ? "#7A8BA0" : "white",
                    padding: "8px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: status === "coming_soon" ? "default" : "pointer",
                  }}
                >
                  {status === "coming_soon" ? "Notify Me" : "Launch Agent"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
