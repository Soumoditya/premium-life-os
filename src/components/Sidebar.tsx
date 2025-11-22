"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Dashboard", href: "/", icon: "🏠" },
    { name: "AI Assistant", href: "/ai", icon: "✨" },
    { name: "Notes", href: "/notes", icon: "📝" },
    { name: "Calculator", href: "/calculator", icon: "🧮" },
    { name: "Wellbeing", href: "/wellbeing", icon: "🧘" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar glass-panel">
            <div className="logo-container">
                <h1 className="logo text-gradient">Life OS</h1>
            </div>

            <nav className="nav-menu">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? "active" : ""}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.name}</span>
                            {isActive && <div className="active-indicator" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="user-profile">
                <div className="avatar">M</div>
                <div className="user-info">
                    <p className="user-name">Mrinal</p>
                    <p className="user-role">Pro User</p>
                </div>
            </div>

            <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: calc(100vh - 40px);
          position: fixed;
          left: 20px;
          top: 20px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          z-index: 100;
        }

        .logo-container {
          margin-bottom: 40px;
          padding: 0 12px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--fg-secondary);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-item:hover {
          color: var(--fg-primary);
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          color: white;
          background: rgba(99, 102, 241, 0.1);
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: var(--accent-gradient);
          border-radius: 0 4px 4px 0;
          box-shadow: var(--accent-glow);
        }

        .nav-icon {
          font-size: 20px;
        }

        .nav-label {
          font-weight: 500;
          font-size: 15px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          margin-top: auto;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--fg-primary);
        }

        .user-role {
          font-size: 12px;
          color: var(--fg-secondary);
        }
      `}</style>
        </aside>
    );
}
