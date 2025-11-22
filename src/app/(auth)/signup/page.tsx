"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/login");
        } else {
            const data = await res.json();
            setError(data.error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel animate-slide-up">
                <h1 className="logo text-gradient">Join Life OS</h1>
                <p className="subtitle">Create your premium account</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
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
                    <button type="submit" className="btn-primary">Sign Up</button>
                </form>

                <p className="footer-text">
                    Already have an account? <Link href="/login" className="link">Login</Link>
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
