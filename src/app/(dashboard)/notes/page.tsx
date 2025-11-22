"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    updatedAt: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await fetch("/api/notes");
        if (res.ok) {
            const data = await res.json();
            setNotes(data);
        }
        setLoading(false);
    };

    const addNote = async () => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "New Note", content: "", color: "#1f2937" })
        });
        if (res.ok) {
            const newNote = await res.json();
            setNotes([newNote, ...notes]);
        }
    };

    const updateNote = async (id: string, updates: Partial<Note>) => {
        // Optimistic update
        setNotes(notes.map(n => n.id === id ? { ...n, ...updates } : n));

        // Debounce could be added here
        await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });
    };

    const deleteNote = async (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
        await fetch(`/api/notes/${id}`, { method: "DELETE" });
    };

    return (
        <div className="notes-page">
            <Header title="Notes" />

            <div className="actions-bar">
                <button onClick={addNote} className="btn-primary animate-fade-in">
                    + New Note
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading notes...</div>
            ) : (
                <div className="notes-grid">
                    {notes.map((note, index) => (
                        <div
                            key={note.id}
                            className="note-card glass-panel animate-slide-up"
                            style={{
                                background: note.color,
                                animationDelay: `${index * 0.05}s`
                            }}
                        >
                            <div className="note-header">
                                <input
                                    className="note-title"
                                    value={note.title}
                                    onChange={(e) => updateNote(note.id, { title: e.target.value })}
                                    placeholder="Title"
                                />
                                <button onClick={() => deleteNote(note.id)} className="delete-btn">×</button>
                            </div>
                            <textarea
                                className="note-content"
                                value={note.content}
                                onChange={(e) => updateNote(note.id, { content: e.target.value })}
                                placeholder="Write something..."
                            />
                            <div className="note-footer">
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .actions-bar { margin-bottom: 30px; }
        .loading { color: var(--fg-secondary); text-align: center; margin-top: 40px; }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .note-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          height: 280px;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }

        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .delete-btn {
          background: transparent;
          border: none;
          color: var(--fg-secondary);
          font-size: 20px;
          cursor: pointer;
          padding: 0 4px;
        }
        .delete-btn:hover { color: #ef4444; }

        .note-title {
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          font-weight: 600;
          width: 85%;
          outline: none;
        }

        .note-content {
          background: transparent;
          border: none;
          color: var(--fg-secondary);
          font-size: 15px;
          line-height: 1.6;
          flex: 1;
          resize: none;
          outline: none;
          font-family: inherit;
        }

        .note-footer {
          margin-top: 12px;
          font-size: 12px;
          color: var(--fg-tertiary);
          text-align: right;
        }
      `}</style>
        </div>
    );
}
