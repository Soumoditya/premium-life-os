"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Brain, StickyNote, Calculator, Activity, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/ai", label: "AI Assistant", icon: <Brain size={20} /> },
    { href: "/notes", label: "Notes", icon: <StickyNote size={20} /> },
    { href: "/calculator", label: "Calculator", icon: <Calculator size={20} /> },
    { href: "/wellbeing", label: "Wellbeing", icon: <Activity size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo">
        <div className="logo-icon">L</div>
        <span>Life OS</span>
      </div>

      <nav className="nav-links">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
              {isActive && <div className="active-indicator" />}
            </Link>
          );
        })}
      </nav>

      <div className="user-profile">
        <button onClick={() => signOut({ callbackUrl: '/' })} className="logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 40px;
          padding-left: 10px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent-gradient);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .nav-links {
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
          border-radius: 12px;
          color: var(--fg-secondary);
          transition: all 0.3s;
          position: relative;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .active-indicator {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: var(--accent-primary);
          border-radius: 3px 0 0 3px;
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .user-profile {
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          color: var(--fg-secondary);
          cursor: pointer;
          transition: color 0.2s;
        }

        .logout-btn:hover {
          color: #ef4444;
        }
      `}</style>
    </aside>
  );
}
