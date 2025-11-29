"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Image as ImageIcon, PieChart as ChartIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface GeneratedItem {
    id: string;
    type: "image" | "chart";
    content: string;
    createdAt: string;
}

export default function StuffPage() {
    const [items, setItems] = useState<GeneratedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStuff();
    }, []);

    const fetchStuff = async () => {
        try {
            // In a real implementation, we would have a dedicated API for this.
            // For now, we'll fetch all messages and filter them on the client side.
            // This is not efficient for large datasets but works for this MVP.
            // We need to fetch all sessions first, then messages? Too slow.
            // Let's create a dedicated API route for "stuff"
            const res = await fetch("/api/ai/stuff");
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch stuff", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <Header title="My Stuff (Gallery)" />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-white/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                    <p>No generated content yet.</p>
                    <p className="text-sm">Ask AI to generate images or charts!</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/20"
                        >
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    {item.type === "image" ? <ImageIcon className="w-3 h-3" /> : <ChartIcon className="w-3 h-3" />}
                                    {item.type}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="p-4">
                                {item.type === "image" ? (
                                    <div className="rounded-lg overflow-hidden">
                                        <ReactMarkdown>{item.content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none">
                                        {/* We would render the chart here again, but for simplicity just showing the markdown/json */}
                                        <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                                            Chart Data Saved
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
