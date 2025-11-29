"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Plus, Save, Trash2, Bold, Italic, List, Type } from "lucide-react";

interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    updatedAt: string;
}

const COLORS = [
    "#ffffff", // White
    "#fef3c7", // Yellow
    "#dcfce7", // Green
    "#dbeafe", // Blue
    "#f3e8ff", // Purple
    "#fee2e2", // Red
];

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await fetch("/api/notes");
        if (res.ok) {
            const data = await res.json();
            setNotes(data);
        }
    };

    const createNote = async () => {
        const newNote = {
            title: "",
            content: "",
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };

        const res = await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(newNote),
        });

        if (res.ok) {
            const savedNote = await res.json();
            setNotes([savedNote, ...notes]);
            setActiveNote(savedNote);
            setIsEditing(true);
        }
    };

    const updateNote = async (note: Note) => {
        // Optimistic update
        setNotes(notes.map((n) => (n.id === note.id ? note : n)));

        await fetch("/api/notes", {
            method: "PUT",
            body: JSON.stringify(note),
        });
    };

    const deleteNote = async (id: string) => {
        if (!confirm("Delete this note?")) return;

        setNotes(notes.filter((n) => n.id !== id));
        if (activeNote?.id === id) {
            setActiveNote(null);
            setIsEditing(false);
        }

        await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <Header title="Notes (Keep Style)" />

            {isEditing && activeNote ? (
                <div className="flex-1 max-w-3xl mx-auto w-full animate-in zoom-in-95 duration-200">
                    <div
                        className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-180px)]"
                        style={{ backgroundColor: activeNote.color }}
                    >
                        {/* Toolbar */}
                        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                ← Back
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-black/5 rounded-lg text-gray-600"><Bold className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-black/5 rounded-lg text-gray-600"><Italic className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-black/5 rounded-lg text-gray-600"><List className="w-4 h-4" /></button>
                                <div className="w-px h-4 bg-gray-300 mx-2" />
                                <button
                                    onClick={() => deleteNote(activeNote.id)}
                                    className="p-2 hover:bg-red-100 rounded-lg text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            <input
                                type="text"
                                value={activeNote.title}
                                onChange={(e) => {
                                    const updated = { ...activeNote, title: e.target.value };
                                    setActiveNote(updated);
                                    updateNote(updated);
                                }}
                                placeholder="Title"
                                className="w-full bg-transparent text-3xl font-bold text-gray-800 placeholder-gray-400 mb-4 focus:outline-none"
                            />
                            <textarea
                                value={activeNote.content}
                                onChange={(e) => {
                                    const updated = { ...activeNote, content: e.target.value };
                                    setActiveNote(updated);
                                    updateNote(updated);
                                }}
                                placeholder="Take a note..."
                                className="w-full h-full bg-transparent text-lg text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {/* Create Bar */}
                    <div
                        onClick={createNote}
                        className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 cursor-text hover:shadow-md transition-shadow flex items-center gap-4 text-gray-500"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Take a note...</span>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => {
                                    setActiveNote(note);
                                    setIsEditing(true);
                                }}
                                className="group relative rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-black/5 min-h-[160px] flex flex-col"
                                style={{ backgroundColor: note.color }}
                            >
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{note.title || "Untitled"}</h3>
                                <p className="text-gray-600 text-sm line-clamp-5 whitespace-pre-wrap flex-1">
                                    {note.content || "Empty note"}
                                </p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note.id);
                                        }}
                                        className="p-2 bg-white/80 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-500 shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
