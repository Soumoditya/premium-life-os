"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("gemini_api_key");
    if (key) setApiKey(key);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("gemini_api_key", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page">
      <Header title="Settings" />

      <div className="settings-container animate-slide-up">
        <section className="settings-section glass-panel">
          <h2>🤖 AI Configuration</h2>
          <p className="section-desc">To enable the Real AI Assistant, please enter your Google Gemini API Key.</p>

          <div className="form-group">
            <label>Google Gemini API Key</label>
            <div className="input-wrapper">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
              />
            </div>
            <p className="help-text">
              Don't have one? <a href="https://aistudio.google.com/app/apikey" target="_blank" className="link">Get it here free</a>
            </p>
          </div>

          <button onClick={saveSettings} className="btn-primary">
            {saved ? "Saved! ✓" : "Save API Key"}
          </button>
        </section>

        <section className="settings-section glass-panel delay-100">
          <h2>🎨 Appearance</h2>
          <div className="preferences-list">
            <div className="pref-item">
              <div className="pref-info">
                <h4>Glassmorphism Intensity</h4>
                <p>Adjust the blur and transparency</p>
              </div>
              <input type="range" min="0" max="100" defaultValue="50" className="range-slider" />
            </div>
          </div>
        </section>

        <section className="settings-section glass-panel delay-200">
          <h2>💾 Data Management</h2>
          <div className="preferences-list">
            <div className="pref-item">
              <div className="pref-info">
                <h4>Clear All Chat History</h4>
                <p className="text-red-400">This action cannot be undone.</p>
              </div>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete all chat history?")) {
                    await fetch("/api/ai/clear", { method: "DELETE" });
                    alert("History cleared!");
                  }
                }}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
              >
                Delete All
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .settings-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .settings-section {
          padding: 30px;
        }

        .settings-section h2 {
          margin-bottom: 8px;
          font-size: 22px;
        }

        .section-desc {
          color: var(--fg-secondary);
          margin-bottom: 24px;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .input-wrapper input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          padding: 16px;
          border-radius: var(--radius-md);
          color: white;
          font-family: monospace;
          outline: none;
          transition: all 0.3s;
        }

        .input-wrapper input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .help-text {
          margin-top: 8px;
          font-size: 13px;
          color: var(--fg-tertiary);
        }

        .link {
          color: var(--accent-primary);
          text-decoration: underline;
        }

        .range-slider {
          width: 150px;
          accent-color: var(--accent-primary);
        }

        .pref-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--glass-border);
        }
      `}</style>
    </div>
  );
}
