"use client";

import { useState, useEffect } from "react";

export default function Header({ title }: { title: string }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="header">
            <div className="header-content">
                <h2 className="page-title animate-fade-in">{title}</h2>

                <div className="header-actions">
                    <div className="search-bar glass-panel">
                        <span className="search-icon">🔍</span>
                        <input type="text" placeholder="Search..." />
                    </div>

                    <div className="time-display glass-panel">
                        {time}
                    </div>

                    <button className="icon-btn glass-panel">
                        🔔
                        <span className="notification-dot" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          gap: 10px;
          width: 300px;
          height: 44px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--fg-primary);
          font-size: 14px;
          width: 100%;
          outline: none;
        }

        .search-bar input::placeholder {
          color: var(--fg-tertiary);
        }

        .time-display {
          padding: 0 20px;
          height: 44px;
          display: flex;
          align-items: center;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .icon-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          font-size: 18px;
          transition: transform 0.2s;
        }

        .icon-btn:hover {
          transform: scale(1.05);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
      `}</style>
        </header>
    );
}
