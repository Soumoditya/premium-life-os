"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel animate-slide-up">
        <h1 className="logo text-gradient">Life OS</h1>
        <p className="subtitle">Welcome back</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link href="/signup" className="link">Sign Up</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .logo { font-size: 32px; margin-bottom: 8px; }
        .subtitle { color: var(--fg-secondary); margin-bottom: 32px; }

        .auth-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 12px;
          border-radius: var(--radius-md);
          color: white;
          outline: none;
        }

        input:focus { border-color: var(--accent-primary); }

        .error-msg {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 10px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          width: 100%;
          font-size: 14px;
        }

        .footer-text { font-size: 14px; color: var(--fg-secondary); }
        .link { color: var(--accent-primary); text-decoration: none; }
        .link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
