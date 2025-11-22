"use client";

import Header from "@/components/Header";

export default function WellbeingPage() {
    // Mock data for charts
    const weeklyUsage = [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 3.8 },
        { day: 'Wed', hours: 1.5 },
        { day: 'Thu', hours: 4.2 },
        { day: 'Fri', hours: 3.0 },
        { day: 'Sat', hours: 5.5 },
        { day: 'Sun', hours: 2.0 },
    ];

    const maxHours = Math.max(...weeklyUsage.map(d => d.hours));

    return (
        <div className="wellbeing-page">
            <Header title="Digital Wellbeing" />

            <div className="dashboard-grid">
                <div className="chart-card glass-panel animate-slide-up">
                    <h3>Weekly Usage</h3>
                    <div className="bar-chart">
                        {weeklyUsage.map((data, i) => (
                            <div key={data.day} className="chart-column">
                                <div
                                    className="bar"
                                    style={{
                                        height: `${(data.hours / maxHours) * 100}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                >
                                    <div className="tooltip">{data.hours}h</div>
                                </div>
                                <span className="label">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stats-column">
                    <div className="stat-box glass-panel animate-slide-up delay-100">
                        <h3>Today's Screen Time</h3>
                        <div className="big-number text-gradient">2h 15m</div>
                        <p className="trend positive">↓ 12% from yesterday</p>
                    </div>

                    <div className="stat-box glass-panel animate-slide-up delay-200">
                        <h3>Most Used Feature</h3>
                        <div className="feature-stat">
                            <span className="icon">✨</span>
                            <span>AI Assistant</span>
                            <span className="time">1h 30m</span>
                        </div>
                        <div className="feature-stat">
                            <span className="icon">📝</span>
                            <span>Notes</span>
                            <span className="time">45m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="focus-mode glass-panel animate-slide-up delay-300">
                <div className="focus-header">
                    <h3>Focus Mode</h3>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <p>Pause notifications and distractions to stay productive.</p>
            </div>

            <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .chart-card {
          padding: 24px;
          height: 400px;
          display: flex;
          flex-direction: column;
        }

        .chart-card h3 {
          margin-bottom: 30px;
        }

        .bar-chart {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 10px;
        }

        .chart-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          height: 100%;
          justify-content: flex-end;
          flex: 1;
        }

        .bar {
          width: 40px;
          background: var(--accent-gradient);
          border-radius: 8px 8px 0 0;
          position: relative;
          opacity: 0.8;
          transition: all 0.3s;
          cursor: pointer;
        }

        .bar:hover {
          opacity: 1;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }

        .bar:hover .tooltip {
          opacity: 1;
        }

        .label {
          color: var(--fg-secondary);
          font-size: 14px;
        }

        .stats-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stat-box {
          padding: 24px;
          flex: 1;
        }

        .big-number {
          font-size: 48px;
          font-weight: 700;
          margin: 10px 0;
        }

        .trend {
          font-size: 14px;
        }

        .trend.positive { color: #4ade80; }
        .trend.negative { color: #ef4444; }

        .feature-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
        }

        .feature-stat .time {
          margin-left: auto;
          color: var(--fg-secondary);
          font-size: 14px;
        }

        .focus-mode {
          padding: 24px;
        }

        .focus-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        /* Switch Toggle */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
        }

        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #3f3f46;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: var(--accent-primary);
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
}
