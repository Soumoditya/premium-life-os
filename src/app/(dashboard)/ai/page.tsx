"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

export default function AIPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            content: "Hello! I'm your personal AI assistant. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "I'm a mock AI for this demo. I can help you organize your tasks, calculate numbers, or just chat! (Real AI integration would go here)",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleExport = () => {
        // Simple text export for now
        const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.txt';
        a.click();
    };

    return (
        <div className="ai-page">
            <Header title="AI Assistant" />

            <div className="chat-container glass-panel animate-slide-up">
                <div className="chat-header">
                    <div className="ai-status">
                        <span className="status-dot"></span>
                        Online
                    </div>
                    <button onClick={handleExport} className="btn-ghost">
                        Export Chat
                    </button>
                </div>

                <div className="messages-area">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.role}`}>
                            <div className="message-bubble">
                                {msg.content}
                            </div>
                            <span className="timestamp">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message ai">
                            <div className="message-bubble typing">
                                <span>.</span><span>.</span><span>.</span>
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
                        placeholder="Type a message..."
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
        }

        .chat-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4ade80;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 70%;
        }

        .message.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message.ai {
          align-self: flex-start;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 15px;
          line-height: 1.5;
        }

        .message.user .message-bubble {
          background: var(--accent-gradient);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.ai .message-bubble {
          background: rgba(255, 255, 255, 0.1);
          color: var(--fg-primary);
          border-bottom-left-radius: 4px;
        }

        .timestamp {
          font-size: 11px;
          color: var(--fg-tertiary);
          margin-top: 4px;
          padding: 0 4px;
        }

        .input-area {
          padding: 20px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          gap: 12px;
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input:focus {
          border-color: var(--accent-primary);
        }

        .typing span {
          animation: blink 1.4s infinite both;
          margin: 0 2px;
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
