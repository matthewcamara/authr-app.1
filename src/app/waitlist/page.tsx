"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Mail, ArrowRight, Sparkles, BarChart3, Users, Zap } from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("waitlist")
        .insert({ email: email.trim().toLowerCase(), name: name.trim() || null });

      if (dbError) {
        if (dbError.code === "23505") {
          setError("You're already on the list! We'll be in touch soon.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const features = [
    { icon: BarChart3, title: "Sales Analytics", desc: "Track royalties, BSR, and reviews across all your titles" },
    { icon: Sparkles, title: "AI-Powered Tools", desc: "Keywords, blurbs, and ad copy generated in seconds" },
    { icon: Users, title: "Reviewer CRM", desc: "Manage outreach to bloggers, reviewers, and media" },
    { icon: Zap, title: "Smart Automations", desc: "Daily digests, BSR alerts, and follow-up reminders" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 40%, #2E5FA3 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Hero */}
      <div style={{ textAlign: "center", maxWidth: 600, marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <BookOpen size={36} color="#C9A84C" strokeWidth={1.5} />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 36,
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "white",
                letterSpacing: "-0.5px",
              }}
            >
              Authr Associates
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#C9A84C",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
              }}
            >
              Partners in Publishing
            </p>
          </div>
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: 28,
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "white",
            lineHeight: 1.3,
          }}
        >
          The All-in-One Marketing OS
          <br />
          <span style={{ color: "#C9A84C" }}>for Self-Published Authors</span>
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
          }}
        >
          Stop juggling spreadsheets, KDP dashboards, and email threads.
          Authr brings your sales data, metadata tools, reviewer CRM, and
          AI assistant into one beautiful platform.
        </p>
      </div>

      {/* Signup Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "36px 32px",
          maxWidth: 440,
          width: "100%",
          marginBottom: 48,
        }}
      >
        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10B981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 22,
                color: "white",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              You&apos;re on the list!
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              We&apos;ll notify you when beta access opens.
              <br />
              <strong style={{ color: "#C9A84C" }}>2-week free trial</strong> included for early adopters.
            </p>
          </div>
        ) : (
          <>
            <h3
              style={{
                margin: "0 0 4px",
                fontSize: 20,
                color: "white",
                fontFamily: "Georgia, 'Times New Roman', serif",
                textAlign: "center",
              }}
            >
              Join the Beta Waitlist
            </h3>
            <p
              style={{
                margin: "0 0 24px",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textAlign: "center",
              }}
            >
              Get early access + 2-week free trial · Then $15/month
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={16}
                    color="rgba(255,255,255,0.4)"
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 40px",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.06)",
                      color: "white",
                      fontSize: 14,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {error && (
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#F59E0B", textAlign: "center" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim()}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 10,
                  border: "none",
                  background: loading
                    ? "rgba(201,168,76,0.5)"
                    : "linear-gradient(135deg, #C9A84C, #A8872E)",
                  color: "#0F1A2E",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading ? "wait" : "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "opacity 0.2s",
                  opacity: !email.trim() ? 0.5 : 1,
                }}
              >
                {loading ? "Joining..." : "Join the Waitlist"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          maxWidth: 960,
          width: "100%",
          marginBottom: 48,
        }}
      >
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "20px 18px",
            }}
          >
            <Icon size={24} color="#C9A84C" style={{ marginBottom: 12 }} />
            <h4
              style={{
                margin: "0 0 6px",
                fontSize: 15,
                color: "white",
                fontWeight: 600,
              }}
            >
              {title}
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Already have an account link */}
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}
          >
            Log in →
          </a>
        </p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          © 2026 Authr Associates. Partners in Publishing.
        </p>
      </div>
    </div>
  );
}
