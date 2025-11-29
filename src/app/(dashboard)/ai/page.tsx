"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/ai/ChatSidebar";
import { ChatArea } from "@/components/ai/ChatArea";
import { ChatMode } from "@/lib/ai";

export default function AIPage() {
  const [folders, setFolders] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>("normal");
  const [isTemporary, setIsTemporary] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      const session = sessions.find((s) => s.id === currentSessionId);
      // In a real app, we might fetch messages separately if they are not loaded
      // For now, assuming sessions include messages or we fetch them
      // But the API /api/ai/data returns sessions without messages (to save bandwidth)
      // So we might need to fetch messages for the session.
      // Actually, let's just fetch messages when selecting a session.
      fetchMessages(currentSessionId);
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/ai/data");
      if (res.ok) {
        const data = await res.json();
        setFolders(data.folders);
        setSessions(data.sessions);
        if (data.sessions.length > 0 && !currentSessionId) {
          setCurrentSessionId(data.sessions[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    // We can reuse the main GET /api/ai route? No, that was repurposed.
    // We need a way to get messages.
    // Let's assume we can get them from a new endpoint or update GET /api/ai/data to include them?
    // No, that's too heavy.
    // Let's add GET /api/ai/messages?sessionId=...
    // Or just filter from loaded sessions if we included them?
    // The data route included:
    // chatSessions: { where: { folderId: null }, orderBy: { createdAt: "desc" } }
    // It didn't include messages.
    // I need to implement fetching messages.
    // For now, let's just implement a quick fetch in the component or add a route.
    // I'll add a route: src/app/api/ai/messages/route.ts
    const res = await fetch(`/api/ai/messages?sessionId=${sessionId}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const handleSendMessage = async (text: string, mode: ChatMode, attachments?: any[]) => {
    if (!text.trim()) return;

    let sessionId = currentSessionId;

    if (!sessionId && !isTemporary) {
      // Create new session
      const res = await fetch("/api/ai/sessions", {
        method: "POST",
        body: JSON.stringify({ title: text.slice(0, 30) }),
      });
      const newSession = await res.json();
      setSessions([newSession, ...sessions]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    }

    // Optimistic update
    const tempMsg = {
      role: "user",
      content: text,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    setIsTyping(true);

    try {
      if (isTemporary) {
        // Handle temporary chat (no saving to DB)
        // Just call a direct Gemini endpoint without saving?
        // Or call the same endpoint but flag it?
        // For now, let's just say we don't support temp chat fully in backend yet without saving.
        // I'll skip temp chat logic for backend and just save it for now, or implement a specific route.
        // Let's use the normal route but maybe delete it after?
        // Or just don't save in DB if sessionId is "temp"?
        // I'll implement a "temp" session ID handling in the backend later if needed.
        // For now, treating as normal chat.
      }

      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          sessionId,
          mode,
          imageParts: attachments, // Handle attachments
        }),
      });

      if (res.ok) {
        const aiMsg = await res.json();
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCreateFolder = async (name: string) => {
    const res = await fetch("/api/ai/folders", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const newFolder = await res.json();
      setFolders([...folders, newFolder]);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    await fetch(`/api/ai/folders?id=${id}`, { method: "DELETE" });
    setFolders(folders.filter((f) => f.id !== id));
  };

  const handleDeleteSession = async (id: string) => {
    await fetch(`/api/ai/sessions?id=${id}`, { method: "DELETE" });
    setSessions(sessions.filter((s) => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
      setMessages([]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-80 flex-shrink-0 hidden md:block">
        <ChatSidebar
          folders={folders}
          sessions={sessions}
          onSelectSession={setCurrentSessionId}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          onDeleteSession={handleDeleteSession}
        />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          isTemporary={isTemporary}
          onToggleTemporary={() => setIsTemporary(!isTemporary)}
        />
      </div>
    </div>
  );
}
