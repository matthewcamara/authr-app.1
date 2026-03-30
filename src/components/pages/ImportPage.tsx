"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Table, AlertCircle, CheckCircle2 } from "lucide-react";

type ImportState = "idle" | "preview" | "importing" | "done" | "error";

export default function ImportPage() {
  const [state, setState] = useState<ImportState>("idle");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setState("preview");
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setState("preview");
    }
  }, []);

  const importSources = [
    { id: "kdp", name: "KDP Sales Report", icon: "📊", desc: "Upload your monthly KDP CSV export", format: ".csv" },
    { id: "manual", name: "Manual Entry", icon: "✏️", desc: "Add book data manually", format: "form" },
    { id: "csv", name: "Generic CSV/XLSX", icon: "📋", desc: "Import from any spreadsheet format", format: ".csv, .xlsx" },
    { id: "scan", name: "Hardcover Scan", icon: "📷", desc: "Scan physical book data with your camera", format: ".jpg, .png" },
    { id: "website", name: "Website Import", icon: "🌐", desc: "Scrape data from your personal website", format: "URL" },
    { id: "api", name: "API Integration", icon: "🔌", desc: "Connect to Softcover, KDP API, and more", format: "OAuth" },
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
        Import Data
      </h2>
      <p className="m-0" style={{ color: "#7A8BA0", fontSize: 13, marginBottom: 28 }}>
        Bring your author data into Authr from any source
      </p>

      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="bg-white rounded-xl cursor-pointer transition-all duration-200"
        style={{
          padding: "48px 32px",
          border: `2px dashed ${dragActive ? "#2E5FA3" : "#D8E4EE"}`,
          background: dragActive ? "#EEF3FF" : "white",
          textAlign: "center",
          marginBottom: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        {state === "idle" && (
          <>
            <Upload size={40} color="#2E5FA3" style={{ marginBottom: 16 }} />
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#1B2A4A" }}>
              Drop files here or click to browse
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "#7A8BA0" }}>
              Supports CSV, XLSX, PDF, images · Max 10MB
            </p>
          </>
        )}

        {state === "preview" && (
          <div className="flex items-center gap-3 justify-center">
            <FileText size={24} color="#2E5FA3" />
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1B2A4A" }}>
                {fileName}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#7A8BA0" }}>
                Ready to import
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setState("done");
              }}
              className="border-none cursor-pointer rounded-lg text-white ml-4"
              style={{
                background: "#1B2A4A",
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Import Now
            </button>
          </div>
        )}

        {state === "done" && (
          <div className="flex items-center gap-3 justify-center">
            <CheckCircle2 size={24} color="#10B981" />
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#10B981" }}>
              Import complete! Data is now in your catalog.
            </p>
          </div>
        )}

        {state === "error" && (
          <div className="flex items-center gap-3 justify-center">
            <AlertCircle size={24} color="#EF4444" />
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#EF4444" }}>
              Import failed. Please check your file format and try again.
            </p>
          </div>
        )}
      </div>

      {/* Import Sources Grid */}
      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1B2A4A" }}>
        Import Sources
      </h3>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {importSources.map(({ id, name, icon, desc, format }) => (
          <div
            key={id}
            className="bg-white rounded-xl cursor-pointer transition-all duration-200"
            style={{
              padding: "20px 18px",
              border: "1px solid #E8EEF5",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#BFDBFE";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(46,95,163,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E8EEF5";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
            }}
          >
            <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{icon}</span>
            <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#1B2A4A" }}>
              {name}
            </p>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#7A8BA0", lineHeight: 1.4 }}>
              {desc}
            </p>
            <div className="flex items-center gap-1">
              <Table size={12} color="#9AA8B8" />
              <span style={{ fontSize: 11, color: "#9AA8B8" }}>{format}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
