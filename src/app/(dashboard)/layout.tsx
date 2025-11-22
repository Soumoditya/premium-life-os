"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>

      <style jsx global>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: calc(var(--sidebar-width) + 40px);
          padding: 30px;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
