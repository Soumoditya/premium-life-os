"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchHistory = async () => {
    const res = await fetch("/api/ai");
    if (res.ok) {
      const data = await res.json();
      setMessages(data.map((m: any) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.createdAt)
      })));
    }
  };

  const saveMessage = async (role: 'user' | 'model', content: string) => {
    await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, content })
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const apiKey = localStorage.getItem("gemini_api_key");
    if (!apiKey) {
      alert("Please set your Google Gemini API Key in Settings first!");
      return;
    }

    const content = input;
    setInput("");

    // Optimistic update
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Save user message
    saveMessage('user', content);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: content }] }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);

      // Save AI message
      saveMessage('model', aiResponse);

    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `**Error:** ${error instanceof Error ? error.message : 'Failed to fetch response'}. Please check your API Key.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-page">
      <Header title="AI Assistant (Gemini Pro)" />

      <div className="chat-container glass-panel animate-slide-up">
        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-bubble">
                {msg.role === 'model' ? (
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message model">
              <div className="message-bubble typing">
                <span>●</span><span>●</span><span>●</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="chat-input"
          />
          <button onClick={handleSend} className="send-btn btn-primary">
            Send
          </button>
        </div>
      </div>

      <style jsx>{`
        .ai-page {
          height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
        }

        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
        }

        .message.model {
          align-self: flex-start;
        }

        .message-bubble {
          padding: 16px 20px;
          border-radius: 20px;
          font-size: 15px;
          line-height: 1.6;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .message.user .message-bubble {
          background: var(--accent-gradient);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.model .message-bubble {
          background: rgba(255, 255, 255, 0.08);
          color: var(--fg-primary);
          border-bottom-left-radius: 4px;
          border: 1px solid var(--glass-border);
        }

        .input-area {
          padding: 24px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 16px;
          background: rgba(0, 0, 0, 0.2);
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 14px 24px;
          color: white;
          outline: none;
          transition: all 0.2s;
        }

        .chat-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }

        .typing span {
          animation: blink 1.4s infinite both;
          margin: 0 2px;
          color: var(--fg-secondary);
        }
        
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
