"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";
import DashboardPage from "@/components/pages/DashboardPage";
import MetadataPage from "@/components/pages/MetadataPage";
import CRMPage from "@/components/pages/CRMPage";
import AutomationsPage from "@/components/pages/AutomationsPage";

const PAGES: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  metadata: MetadataPage,
  crm: CRMPage,
  automations: AutomationsPage,
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const ActivePage = PAGES[activeSection];

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "var(--font-body)" }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ActivePage />
      </main>
      <ChatPanel activeSection={activeSection} />
    </div>
  );
}
