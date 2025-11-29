"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Smartphone, Clock, Zap, Brain } from "lucide-react";

export default function WellbeingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock Data (In a real app, this would come from tracking user activity)
  const appUsageData = [
    { name: "AI Chat", value: 45, color: "#8b5cf6" },
    { name: "Notes", value: 25, color: "#3b82f6" },
    { name: "News", value: 20, color: "#10b981" },
    { name: "Other", value: 10, color: "#f59e0b" },
  ];

  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.8 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4.2 },
    { day: "Fri", hours: 3.0 },
    { day: "Sat", hours: 5.5 },
    { day: "Sun", hours: 4.0 },
  ];

  if (!mounted) return null;

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <Header title="Digital Wellbeing" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Screen Time Today</h3>
                <p className="text-3xl font-bold text-gray-800">4h 32m</p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[65%]" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Productivity Score</h3>
                <p className="text-3xl font-bold text-gray-800">85%</p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[85%]" />
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6" />
            <h3 className="font-bold text-lg">Daily Insight</h3>
          </div>
          <p className="text-purple-100 leading-relaxed mb-4">
            "You're most productive in the mornings. Try tackling your hardest tasks before 11 AM."
          </p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-sm font-medium backdrop-blur-sm">
            View More Tips
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-gray-400" />
            App Usage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {appUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {appUsageData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 4, 4]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
