"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, Zap } from "lucide-react";

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
    const timer = setInterval(() => setSessionTime(prev => prev + 1), 60000);
    return () => clearInterval(timer);
  }, []);

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
    if (sessionTime > 0 && sessionTime % 5 === 0) handleSave();
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

  const totalTime = logs.reduce((acc, log) => acc + log.duration, 0) + sessionTime;
  const todayTime = logs
    .filter(l => new Date(l.date).toDateString() === new Date().toDateString())
    .reduce((acc, log) => acc + log.duration, 0) + sessionTime;

  // Prepare data for Recharts
  const chartData = logs.length > 0
    ? logs.slice(0, 7).map(l => ({
      name: new Date(l.date).toLocaleDateString('en-US', { weekday: 'short' }),
      minutes: l.duration
    })).reverse()
    : [
      { name: 'Mon', minutes: 30 },
      { name: 'Tue', minutes: 45 },
      { name: 'Wed', minutes: 60 },
      { name: 'Thu', minutes: 20 },
      { name: 'Fri', minutes: 90 },
      { name: 'Sat', minutes: 45 },
      { name: 'Sun', minutes: 60 },
    ];

  return (
    <div className="wellbeing-page">
      <Header title="Digital Wellbeing" />

      <div className="stats-grid animate-slide-up">
        <div className="stat-card glass-panel">
          <div className="stat-icon"><Clock size={20} /></div>
          <h3>Today's Focus</h3>
          <div className="stat-value">{todayTime} <span className="unit">min</span></div>
        </div>
        <div className="stat-card glass-panel delay-100">
          <div className="stat-icon"><Activity size={20} /></div>
          <h3>Total Sessions</h3>
          <div className="stat-value">{logs.length}</div>
        </div>
        <div className="stat-card glass-panel delay-200">
          <div className="stat-icon"><Zap size={20} /></div>
          <h3>Avg. Session</h3>
          <div className="stat-value">{logs.length ? Math.round(totalTime / logs.length) : 0} <span className="unit">min</span></div>
        </div>
      </div>

      <div className="chart-section glass-panel animate-slide-up delay-300">
        <h3>Weekly Activity</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="#818cf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMinutes)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
          position: relative;
          overflow: hidden;
        }

        .stat-icon {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--accent-primary);
          opacity: 0.5;
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
          height: 400px;
          display: flex;
          flex-direction: column;
        }

        .chart-container {
          flex: 1;
          width: 100%;
          margin-top: 20px;
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
