"use client";

import { useState } from "react";
import Header from "@/components/Header";

interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    date: Date;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'Project Ideas',
            content: '1. AI Life OS\n2. Smart Home Dashboard\n3. Crypto Tracker',
            color: 'rgba(99, 102, 241, 0.1)',
            date: new Date()
        },
        {
            id: '2',
            title: 'Shopping List',
            content: '- Milk\n- Eggs\n- Coffee beans',
            color: 'rgba(168, 85, 247, 0.1)',
            date: new Date(Date.now() - 86400000)
        }
    ]);

    const addNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'New Note',
            content: '',
            color: 'rgba(255, 255, 255, 0.05)',
            date: new Date()
        };
        setNotes([newNote, ...notes]);
    };

    return (
        <div className="notes-page">
            <Header title="Notes" />

            <div className="actions-bar">
                <button onClick={addNote} className="btn-primary animate-fade-in">
                    + New Note
                </button>
            </div>

            <div className="notes-grid">
                {notes.map((note, index) => (
                    <div
                        key={note.id}
                        className="note-card glass-panel animate-slide-up"
                        style={{
                            background: note.color,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <input
                            className="note-title"
                            value={note.title}
                            onChange={(e) => {
                                const newNotes = [...notes];
                                newNotes[index].title = e.target.value;
                                setNotes(newNotes);
                            }}
                        />
                        <textarea
                            className="note-content"
                            value={note.content}
                            onChange={(e) => {
                                const newNotes = [...notes];
                                newNotes[index].content = e.target.value;
                                setNotes(newNotes);
                            }}
                        />
                        <div className="note-footer">
                            {note.date.toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .actions-bar {
          margin-bottom: 30px;
        }

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
        }

        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .note-title {
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          width: 100%;
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
