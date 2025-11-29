"use client";

import { useState } from "react";
import { Folder, MessageSquare, Plus, Search, Trash2, MoreVertical, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
    folders: any[];
    sessions: any[];
    onSelectSession: (id: string) => void;
    onCreateFolder: (name: string) => void;
    onDeleteFolder: (id: string) => void;
    onDeleteSession: (id: string) => void;
    className?: string;
}

export function ChatSidebar({
    folders,
    sessions,
    onSelectSession,
    onCreateFolder,
    onDeleteFolder,
    onDeleteSession,
    className,
}: ChatSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const filteredSessions = sessions.filter((session) =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={cn("flex flex-col h-full bg-white/50 backdrop-blur-xl border-r border-white/20", className)}>
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
                    <button
                        onClick={() => setIsCreatingFolder(true)}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                        title="New Folder"
                    >
                        <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white/50 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {isCreatingFolder && (
                    <div className="p-2 bg-white/80 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-top-2">
                        <input
                            type="text"
                            placeholder="Folder name..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newFolderName.trim()) {
                                    onCreateFolder(newFolderName);
                                    setNewFolderName("");
                                    setIsCreatingFolder(false);
                                }
                            }}
                            autoFocus
                            className="w-full px-3 py-1.5 bg-transparent border-b border-purple-200 focus:outline-none text-sm"
                        />
                    </div>
                )}

                {/* Folders Section */}
                {folders.map((folder) => (
                    <div key={folder.id} className="group">
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-white/40 rounded-lg cursor-pointer transition-colors">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Folder className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium">{folder.name}</span>
                            </div>
                            <button
                                onClick={() => onDeleteFolder(folder.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded text-red-400 transition-all"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                        {/* Nested sessions would go here */}
                    </div>
                ))}

                {/* Uncategorized Sessions */}
                <div className="space-y-1 mt-4">
                    <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Recent</p>
                    {filteredSessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => onSelectSession(session.id)}
                            className="group flex items-center justify-between px-3 py-2.5 hover:bg-white/60 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/40"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-medium text-gray-700 truncate">{session.title}</span>
                                    <span className="text-xs text-gray-400 truncate">
                                        {new Date(session.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteSession(session.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
