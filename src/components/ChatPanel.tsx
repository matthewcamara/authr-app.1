"use client";

import { useState, useRef, useEffect } from "react";
import { QUICK_PROMPTS, NAV_ITEMS } from "@/lib/mockData";

interface ChatPanelProps {
  activeSection: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Mock responses for the AI assistant
const MOCK_RESPONSES: Record<string, string> = {
  "Why is my BSR going up?": "Your BSR (Best Seller Rank) rising usually means fewer sales relative to competitors. Check if a recent promotion ended — that often causes a temporary spike.\n\nLook at your 'Investor Zero' title — it's at #1,823 and climbing fast. Consider running a small promo or adjusting keywords to recapture momentum.",
  "Which book is performing best?": "Right now, 'Investor Zero' is your top performer:\n• $1,204.55 in royalties this month\n• 521 units sold\n• BSR #1,823 (↑ 890 spots!)\n• 98 reviews (+7 new)\n\nIt's outpacing your other titles by 2-3x. Consider doubling down with fresh ad copy.",
  "How do I improve royalties?": "Three quick wins for your catalog:\n\n1. **Refresh keywords** on 'Salt & Silence' — it's underperforming at $234/mo\n2. **Run AMS ads** targeting 'Investor Zero' comps while BSR is hot\n3. **Launch an ARC campaign** for your next release to build review velocity\n\nWant me to generate new keywords for any of these?",
  default: "Great question! Let me think about that in the context of your current data.\n\nBased on what I can see in your dashboard, I'd suggest focusing on your top-performing titles first. Would you like me to dig into the specifics?"
};

export default function ChatPanel({ activeSection }: ChatPanelProps) {
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Authr assistant 📖\n\nI can help you navigate the platform, interpret your sales data, write outreach emails, or suggest marketing moves. What's on your mind today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");

    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const reply = MOCK_RESPONSES[userMsg] || MOCK_RESPONSES.default;
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const quickPrompts = QUICK_PROMPTS[activeSection] || [];
  const sectionLabel = NAV_ITEMS.find((n) => n.id === activeSection)?.label || activeSection;

  return (
    <div
      className="flex flex-col flex-shrink-0 bg-white transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        width: chatOpen ? 340 : 56,
        borderLeft: "1px solid #E8EEF5",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 flex-shrink-0"
        style={{ padding: "16px 16px 14px", borderBottom: "1px solid #F0F4F8" }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-full"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #1B2A4A, #2E5FA3)",
            fontSize: 15,
          }}
        >
          🎩
        </div>
        {chatOpen && (
          <div className="flex-1 min-w-0">
            <p className="m-0" style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>
              Authr
            </p>
            <p className="m-0" style={{ fontSize: 11, color: "#10B981" }}>
              ● AI Guide · {sectionLabel}
            </p>
          </div>
        )}
        <button
          onClick={() => setChatOpen((o) => !o)}
          className="flex-shrink-0 bg-transparent border-none cursor-pointer"
          style={{ color: "#9AA8B8", fontSize: 18, padding: 2 }}
        >
          {chatOpen ? "›" : "‹"}
        </button>
      </div>

      {chatOpen && (
        <>
          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto flex flex-col gap-2.5"
            style={{ padding: "16px 14px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className="flex animate-fade-up"
                style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}
              >
                {m.role === "assistant" && (
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0 self-end"
                    style={{
                      width: 24,
                      height: 24,
                      background: "linear-gradient(135deg, #1B2A4A, #2E5FA3)",
                      fontSize: 11,
                      marginRight: 6,
                    }}
                  >
                    🎩
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 13px",
                    borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: m.role === "user" ? "#1B2A4A" : "#F4F7FB",
                    color: m.role === "user" ? "white" : "#1B2A4A",
                    fontSize: 13,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 animate-fade-up">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 24,
                    height: 24,
                    background: "linear-gradient(135deg, #1B2A4A, #2E5FA3)",
                    fontSize: 11,
                  }}
                >
                  🎩
                </div>
                <div
                  className="flex gap-1"
                  style={{
                    background: "#F4F7FB",
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: "#9AA8B8",
                        animation: `pulse-dot 1s ${d * 0.2}s ease infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div
            className="flex flex-wrap gap-1.5"
            style={{ padding: "8px 14px", borderTop: "1px solid #F0F4F8" }}
          >
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="cursor-pointer border-none"
                style={{
                  background: "#F0F4F8",
                  borderRadius: 16,
                  padding: "5px 11px",
                  fontSize: 11,
                  color: "#2E5FA3",
                  fontWeight: 500,
                  fontFamily: "inherit",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex gap-2 items-end"
            style={{ padding: "12px 14px", borderTop: "1px solid #F0F4F8" }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask Authr anything…"
              rows={1}
              className="flex-1 resize-none"
              style={{
                border: "1px solid #D8E4EE",
                borderRadius: 10,
                padding: "9px 12px",
                fontSize: 13,
                fontFamily: "inherit",
                lineHeight: 1.4,
                color: "#1B2A4A",
                background: "#FAFBFD",
                minHeight: 38,
                maxHeight: 100,
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex items-center justify-center flex-shrink-0 border-none transition-colors duration-150"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: input.trim() ? "#1B2A4A" : "#E8EEF5",
                cursor: input.trim() ? "pointer" : "default",
              }}
            >
              <span style={{ fontSize: 14, color: input.trim() ? "white" : "#9AA8B8" }}>↑</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
