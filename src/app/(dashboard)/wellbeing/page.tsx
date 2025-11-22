"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

interface Log {
  id: string;
  date: string;
  duration: number;
}

export default function WellbeingPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    fetchLogs();

    // Session timer
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Save session on unmount or when focus mode stops
  useEffect(() => {
    const handleSave = async () => {
      if (sessionTime > 0) {
        await fetch("/api/wellbeing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ duration: sessionTime })
        });
      }
    };

    // Save every 5 mins
    if (sessionTime > 0 && sessionTime % 5 === 0) {
      handleSave();
    }
  }, [sessionTime]);

  const fetchLogs = async () => {
    const res = await fetch("/api/wellbeing");
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
  };

  const toggleFocus = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      document.documentElement.requestFullscreen().catch(e => console.log(e));
    } else {
      document.exitFullscreen().catch(e => console.log(e));
    }
  };

  // Calculate stats
  const totalTime = logs.reduce((acc, log) => acc + log.duration, 0) + sessionTime;
  const todayTime = logs
    .filter(l => new Date(l.date).toDateString() === new Date().toDateString())
    .reduce((acc, log) => acc + log.duration, 0) + sessionTime;

  // Mock data for chart if empty
  const chartData = logs.length > 0 ? logs.slice(0, 7).map(l => l.duration) : [30, 45, 60, 20, 90, 45, 60];
  const maxVal = Math.max(...chartData, 100);

  return (
    <div className="wellbeing-page">
      <Header title="Digital Wellbeing" />

      <div className="stats-grid animate-slide-up">
        <div className="stat-card glass-panel">
          <h3>Today's Focus</h3>
          <div className="stat-value">{todayTime} <span className="unit">min</span></div>
        </div>
        <div className="stat-card glass-panel delay-100">
          <h3>Total Sessions</h3>
          <div className="stat-value">{logs.length}</div>
        </div>
        <div className="stat-card glass-panel delay-200">
          <h3>Avg. Session</h3>
          <div className="stat-value">{logs.length ? Math.round(totalTime / logs.length) : 0} <span className="unit">min</span></div>
        </div>
      </div>

      <div className="chart-section glass-panel animate-slide-up delay-300">
        <h3>Weekly Activity</h3>
        <div className="bar-chart">
          {chartData.map((val, i) => (
            <div key={i} className="bar-col">
              <div
                className="bar"
                style={{ height: `${(val / maxVal) * 100}%` }}
              ></div>
              <span className="label">Day {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="focus-section animate-slide-up delay-400">
        <button
          className={`focus-btn ${focusMode ? 'active' : ''}`}
          onClick={toggleFocus}
        >
          {focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
        </button>
        <p className="focus-desc">
          {focusMode ? 'Distractions blocked. Timer running...' : 'Maximize your productivity by blocking distractions.'}
        </p>
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          padding: 24px;
          text-align: center;
        }

        .stat-card h3 {
          font-size: 14px;
          color: var(--fg-secondary);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: white;
        }

        .unit {
          font-size: 16px;
          color: var(--fg-secondary);
          font-weight: 400;
        }

        .chart-section {
          padding: 30px;
          margin-bottom: 30px;
        }

        .bar-chart {
          height: 200px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
        }

        .bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .bar {
          width: 40%;
          background: var(--accent-gradient);
          border-radius: 4px;
          transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 4px;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }

        .label {
          font-size: 12px;
          color: var(--fg-secondary);
        }

        .focus-section {
          text-align: center;
          padding: 40px;
        }

        .focus-btn {
          background: transparent;
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
          padding: 16px 40px;
          font-size: 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 16px;
        }

        .focus-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
        }

        .focus-btn.active {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
        }

        .focus-desc {
          color: var(--fg-secondary);
        }
      `}</style>
    </div>
  );
}
