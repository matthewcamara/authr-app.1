"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/pages/DashboardPage";
import MetadataPage from "@/components/pages/MetadataPage";
import CRMPage from "@/components/pages/CRMPage";
import AutomationsPage from "@/components/pages/AutomationsPage";
import DatabasePage from "@/components/pages/DatabasePage";
import ImportPage from "@/components/pages/ImportPage";
import CatalogPage from "@/components/pages/CatalogPage";
import AgentsPage from "@/components/pages/AgentsPage";
import ChatPage from "@/components/pages/ChatPage";

const PAGES: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  database: DatabasePage,
  chat: ChatPage,
  agents: AgentsPage,
  import: ImportPage,
  catalog: CatalogPage,
  metadata: MetadataPage,
  crm: CRMPage,
  automations: AutomationsPage,
};

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const ActivePage = PAGES[activeSection] || DashboardPage;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "var(--font-body)" }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ActivePage />
      </main>
    </div>
  );
}
