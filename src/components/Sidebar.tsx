"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import type { Profile } from "@/types";
import {
  LayoutDashboard,
  FileText,
  Users,
  Zap,
  Upload,
  BookOpen,
  Database,
  Bot,
  MessageSquare,
  LogOut,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "database", icon: Database, label: "Database" },
  { id: "chat", icon: MessageSquare, label: "AI Chat" },
  { id: "agents", icon: Bot, label: "Agents" },
  { id: "import", icon: Upload, label: "Import" },
  { id: "catalog", icon: BookOpen, label: "Catalog" },
  { id: "metadata", icon: FileText, label: "Metadata" },
  { id: "crm", icon: Users, label: "Reviewer CRM" },
  { id: "automations", icon: Zap, label: "Automations" },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) setProfile(data as Profile);
      }
      // If no user, profile stays null — sidebar shows demo state
    }
    loadProfile();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "D";

  const displayName = profile?.display_name || "Demo Mode";

  const planLabel =
    profile?.plan_status === "trial" ? "Free Trial"
    : profile?.plan_status === "active" ? "Beta Plan"
    : profile?.plan_status === "cancelled" ? "Cancelled"
    : !profile ? "Exploring Demo"
    : "Free Trial";

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
        className="flex-1 px-2.5 py-3 overflow-y-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
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
              <Icon
                size={16}
                color={active ? "white" : "rgba(255,255,255,0.5)"}
                strokeWidth={active ? 2 : 1.5}
              />
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
        className="px-4 py-3"
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
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="m-0 text-white truncate" style={{ fontSize: 12, fontWeight: 600 }}>
              {displayName}
            </p>
            <p className="m-0" style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>
              {planLabel}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onNavigate("settings")}
              className="bg-transparent border-none cursor-pointer p-1 rounded"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              title="Settings"
            >
              <Settings size={14} />
            </button>
            <button
              onClick={handleLogout}
              className="bg-transparent border-none cursor-pointer p-1 rounded"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
