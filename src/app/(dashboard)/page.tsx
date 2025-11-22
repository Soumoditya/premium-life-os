"use client";

import Header from "@/components/Header";

export default function DashboardHome() {
  return (
    <div className="dashboard-home">
      <Header title="Dashboard" />

      <div className="welcome-section animate-slide-up">
        <h1 className="welcome-title">
          Welcome back, <span className="text-gradient">Mrinal</span>
        </h1>
        <p className="welcome-subtitle">
          Here's what's happening in your digital life today.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel delay-100 animate-slide-up">
          <div className="stat-icon">✨</div>
          <div className="stat-info">
            <h3>AI Assistant</h3>
            <p>Ready to help</p>
          </div>
        </div>

        <div className="stat-card glass-panel delay-200 animate-slide-up">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Notes</h3>
            <p>5 Active notes</p>
          </div>
        </div>

        <div className="stat-card glass-panel delay-300 animate-slide-up">
          <div className="stat-icon">🧘</div>
          <div className="stat-info">
            <h3>Wellbeing</h3>
            <p>2h 15m Today</p>
          </div>
        </div>
      </div>

      <div className="recent-activity glass-panel animate-slide-up delay-300">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">10:30 AM</span>
            <p>Created a new note "Project Ideas"</p>
          </div>
          <div className="activity-item">
            <span className="activity-time">09:15 AM</span>
            <p>Chatted with AI Assistant</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-section {
          margin-bottom: 40px;
        }

        .welcome-title {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .welcome-subtitle {
          font-size: 18px;
          color: var(--fg-secondary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
        }

        .stat-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          font-size: 18px;
          margin-bottom: 4px;
        }

        .stat-info p {
          color: var(--fg-secondary);
          font-size: 14px;
        }

        .recent-activity {
          padding: 30px;
        }

        .recent-activity h2 {
          margin-bottom: 20px;
          font-size: 20px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          gap: 20px;
          padding: 12px;
          border-bottom: 1px solid var(--glass-border);
        }

        .activity-time {
          color: var(--fg-secondary);
          font-size: 14px;
          min-width: 80px;
        }
      `}</style>
    </div>
  );
}
