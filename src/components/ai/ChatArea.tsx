"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Image as ImageIcon, Camera, Paperclip, Sparkles, StopCircle, Download, Copy, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ChatMode } from "@/lib/ai";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChatAreaProps {
    messages: any[];
    onSendMessage: (text: string, mode: ChatMode, attachments?: any[]) => void;
    isTyping: boolean;
    currentMode: ChatMode;
    onModeChange: (mode: ChatMode) => void;
    isTemporary: boolean;
    onToggleTemporary: () => void;
}

export function ChatArea({
    messages,
    onSendMessage,
    isTyping,
    currentMode,
    onModeChange,
    isTemporary,
    onToggleTemporary,
}: ChatAreaProps) {
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input, currentMode);
        setInput("");
    };

    const toggleVoice = () => {
        if (isListening) {
            setIsListening(false);
        } else {
            setIsListening(true);
            setTimeout(() => {
                setInput((prev) => prev + " Hello AI");
                setIsListening(false);
            }, 2000);
        }
    };

    const handleBookmark = async (id: string, currentStatus: boolean) => {
        try {
            await fetch(`/api/ai/messages/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isBookmarked: !currentStatus }),
            });
            // Ideally we should update local state here, but for now we rely on re-fetch or ignore
        } catch (e) {
            console.error("Failed to bookmark", e);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white/30 backdrop-blur-sm">
            {/* Header / Mode Selector */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/40">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800">Gemini Assistant</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Online
                            </span>
                            {isTemporary && (
                                <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                    Temporary Chat
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={currentMode}
                        onChange={(e) => onModeChange(e.target.value as ChatMode)}
                        className="px-3 py-1.5 bg-white/50 border border-white/20 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                        <option value="normal">Normal Mode</option>
                        <option value="research">Deep Research</option>
                        <option value="shopping">Shopping Assistant</option>
                        <option value="study">Study Tutor</option>
                        <option value="creative">Creative Studio</option>
                    </select>

                    <button
                        onClick={onToggleTemporary}
                        className={cn(
                            "p-2 rounded-lg transition-colors text-sm font-medium",
                            isTemporary ? "bg-orange-100 text-orange-600" : "hover:bg-white/50 text-gray-600"
                        )}
                        title="Toggle Temporary Chat"
                    >
                        Temp
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex gap-4 max-w-3xl mx-auto",
                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.role === "user" ? "bg-purple-600 text-white" : "bg-white shadow-sm text-purple-600"
                            )}
                        >
                            {msg.role === "user" ? "U" : <Sparkles className="w-4 h-4" />}
                        </div>

                        <div className={cn(
                            "flex flex-col gap-2 max-w-[80%]",
                            msg.role === "user" ? "items-end" : "items-start"
                        )}>
                            <div
                                className={cn(
                                    "p-4 rounded-2xl shadow-sm prose prose-sm max-w-none overflow-hidden",
                                    msg.role === "user"
                                        ? "bg-purple-600 text-white rounded-tr-sm"
                                        : "bg-white text-gray-800 rounded-tl-sm"
                                )}
                            >
                                {/* Check for Chart JSON */}
                                {msg.content.startsWith("```json") && msg.content.includes("chartType") ? (
                                    <div className="w-full h-64 bg-white rounded-xl p-2">
                                        {(() => {
                                            try {
                                                const jsonStr = msg.content.replace(/```json\n|\n```/g, "");
                                                const data = JSON.parse(jsonStr);
                                                if (data.chartType === "pie") {
                                                    return (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={data.data}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    innerRadius={40}
                                                                    outerRadius={80}
                                                                    paddingAngle={5}
                                                                    dataKey="value"
                                                                >
                                                                    {data.data.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    );
                                                } else if (data.chartType === "bar") {
                                                    return (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart data={data.data}>
                                                                <XAxis dataKey="name" />
                                                                <YAxis />
                                                                <Tooltip />
                                                                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    );
                                                }
                                            } catch (e) {
                                                return <ReactMarkdown>{msg.content}</ReactMarkdown>;
                                            }
                                        })()}
                                    </div>
                                ) : (
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                )}
                            </div>

                            {msg.role === "model" && (
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-white/50 rounded text-gray-500" title="Copy">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleBookmark(msg.id, msg.isBookmarked)}
                                        className={cn("p-1 hover:bg-white/50 rounded text-gray-500", msg.isBookmarked && "text-yellow-500")}
                                        title="Save/Bookmark"
                                    >
                                        <Bookmark className="w-3 h-3" />
                                    </button>
                                    <button className="p-1 hover:bg-white/50 rounded text-gray-500" title="Download PDF">
                                        <Download className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-4 max-w-3xl mx-auto">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/60 border-t border-white/20">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-purple-100 p-2 flex items-end gap-2">
                    <div className="flex gap-1 pb-2 pl-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Upload File">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Upload Image">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Camera">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={`Message Gemini (${currentMode} mode)...`}
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-3 text-gray-700 placeholder-gray-400"
                        rows={1}
                    />

                    <div className="flex gap-1 pb-2 pr-2">
                        <button
                            onClick={toggleVoice}
                            className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                isListening ? "bg-red-100 text-red-500 animate-pulse" : "hover:bg-gray-100 text-gray-500"
                            )}
                            title="Voice Input"
                        >
                            {isListening ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 rounded-xl text-white transition-colors shadow-md"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                    AI can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
}
