"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const trialBenefits = [
    "14-day free trial — no credit card required",
    "Full access to all features",
    "AI-powered analytics & chat assistant",
    "Import your KDP data instantly",
  ];

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 50%, #1B3A5E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "52px 36px",
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10B981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Mail size={28} color="white" />
          </div>
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: 24,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "white",
            }}
          >
            Check your email
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
            }}
          >
            We sent a verification link to{" "}
            <strong style={{ color: "#C9A84C" }}>{email}</strong>.
            <br />
            Click the link to activate your account and start your 14-day free trial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 50%, #1B3A5E 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: 40, alignItems: "center", maxWidth: 820, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Left side — benefits */}
        <div style={{ flex: "1 1 320px", maxWidth: 360 }}>
          <BookOpen size={32} color="#C9A84C" style={{ marginBottom: 16 }} />
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 30,
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Start your free trial
          </h1>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
            }}
          >
            Join authors who are taking control of their marketing with AI-powered tools.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {trialBenefits.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} color="#10B981" />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{b}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: "14px 16px",
              borderRadius: 10,
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: "#C9A84C", fontWeight: 600 }}>
              Beta pricing: $15/month after trial
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(201,168,76,0.6)" }}>
              Lock in early-adopter pricing. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Right side — form */}
        <div
          style={{
            flex: "1 1 360px",
            maxWidth: 420,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.10)",
            padding: "36px 32px",
          }}
        >
          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 20,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 6 }}>
                FULL NAME
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={16}
                  color="rgba(255,255,255,0.35)"
                  style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 6 }}>
                EMAIL
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  color="rgba(255,255,255,0.35)"
                  style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 6 }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="rgba(255,255,255,0.35)"
                  style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 42px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: 14,
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="rgba(255,255,255,0.35)" />
                  ) : (
                    <Eye size={16} color="rgba(255,255,255,0.35)" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  marginBottom: 16,
                }}
              >
                <p style={{ margin: 0, fontSize: 13, color: "#EF4444" }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #C9A84C, #A8872E)",
                color: "#0F1A2E",
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {loading ? "Creating account..." : "Start Free Trial"}
            </button>
          </form>

          <p style={{ margin: "10px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.5 }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
