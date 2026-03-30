"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageSquare, Trash2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "default",
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content:
            "Hi! I'm your Authr AI assistant 📖\n\nI can help you with:\n• **Sales analysis** — understand your royalty trends\n• **Marketing strategies** — keywords, blurbs, ad copy\n• **Reviewer outreach** — templates and CRM tips\n• **Publishing workflow** — automations and best practices\n\nWhat would you like to work on today?",
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState("default");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  const send = async () => {
    const userMsg = input.trim();
    if (!userMsg || loading) return;
    setInput("");

    // Add user message
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, { role: "user" as const, content: userMsg }] }
          : s
      )
    );
    setLoading(true);

    // TODO: Replace with real AI API call via /api/chat
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const reply =
      "Thanks for your question! I'm connecting to the AI backend — once your API key is configured, I'll provide real, data-aware responses based on your book catalog and sales data.\n\nFor now, this is a placeholder response. Configure your AI API key in `.env.local` to activate me!";

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              title: s.title === "New Chat" ? userMsg.slice(0, 40) : s.title,
              messages: [...s.messages, { role: "assistant" as const, content: reply }],
            }
          : s
      )
    );
    setLoading(false);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content: "Starting a new conversation. What can I help you with?",
        },
      ],
      createdAt: new Date().toISOString(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const deleteChat = (id: string) => {
    if (sessions.length <= 1) return;
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(sessions.find((s) => s.id !== id)?.id || sessions[0].id);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Chat History Sidebar */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{
          width: 260,
          borderRight: "1px solid #E8EEF5",
          background: "#FAFBFD",
        }}
      >
        <div style={{ padding: "20px 16px 12px" }}>
          <button
            onClick={createNewChat}
            className="flex items-center gap-2 w-full border-none cursor-pointer rounded-lg text-white"
            style={{
              background: "#1B2A4A",
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "inherit",
            }}
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ padding: "0 8px 12px" }}>
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveSessionId(s.id)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer mb-0.5 group"
              style={{
                background: activeSessionId === s.id ? "#EEF3FF" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeSessionId !== s.id) e.currentTarget.style.background = "#F0F4F8";
              }}
              onMouseLeave={(e) => {
                if (activeSessionId !== s.id) e.currentTarget.style.background = "transparent";
              }}
            >
              <MessageSquare size={14} color="#7A8BA0" />
              <span
                className="flex-1 truncate"
                style={{
                  fontSize: 13,
                  color: activeSessionId === s.id ? "#1B2A4A" : "#4A5568",
                  fontWeight: activeSessionId === s.id ? 600 : 400,
                }}
              >
                {s.title}
              </span>
              {sessions.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(s.id);
                  }}
                  className="bg-transparent border-none cursor-pointer p-0.5 rounded opacity-0 group-hover:opacity-100"
                  style={{ color: "#9AA8B8", transition: "opacity 0.15s" }}
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-4"
          style={{ padding: "24px 32px" }}
        >
          {activeSession.messages.map((m, i) => (
            <div
              key={i}
              className="flex animate-fade-up"
              style={{
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {m.role === "assistant" && (
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 self-end"
                  style={{
                    width: 32,
                    height: 32,
                    background: "linear-gradient(135deg, #1B2A4A, #2E5FA3)",
                    fontSize: 14,
                    marginRight: 10,
                  }}
                >
                  🎩
                </div>
              )}
              <div
                style={{
                  maxWidth: "70%",
                  padding: "14px 18px",
                  borderRadius:
                    m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? "#1B2A4A" : "#F4F7FB",
                  color: m.role === "user" ? "white" : "#1B2A4A",
                  fontSize: 14,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 animate-fade-up">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #1B2A4A, #2E5FA3)",
                  fontSize: 14,
                }}
              >
                🎩
              </div>
              <div
                className="flex gap-1"
                style={{
                  background: "#F4F7FB",
                  padding: "14px 18px",
                  borderRadius: "18px 18px 18px 4px",
                }}
              >
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="rounded-full"
                    style={{
                      width: 7,
                      height: 7,
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

        {/* Input */}
        <div
          className="flex gap-3 items-end"
          style={{ padding: "16px 32px 24px", borderTop: "1px solid #F0F4F8" }}
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
            placeholder="Ask Authr anything about your books, marketing, or publishing..."
            rows={1}
            className="flex-1 resize-none"
            style={{
              border: "1px solid #D8E4EE",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14,
              fontFamily: "inherit",
              lineHeight: 1.5,
              color: "#1B2A4A",
              background: "#FAFBFD",
              minHeight: 44,
              maxHeight: 120,
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="flex items-center justify-center flex-shrink-0 border-none transition-colors duration-150"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: input.trim() ? "#1B2A4A" : "#E8EEF5",
              cursor: input.trim() ? "pointer" : "default",
            }}
          >
            <Send size={18} color={input.trim() ? "white" : "#9AA8B8"} />
          </button>
        </div>
      </div>
    </div>
  );
}
