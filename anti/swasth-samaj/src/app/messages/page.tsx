"use client";
import React, { useState } from "react";
import styles from "./messages.module.css";
import { useMockStore } from "@/lib/mockStore";

const MOCK_CHATS = [
  { id: 1, name: "Dr. Priya Ramesh", avatar: "P", lastMsg: "Please share your latest ECG report.", time: "2h ago", unread: 2 },
  { id: 2, name: "Dr. Arjun Mehta", avatar: "A", lastMsg: "The prescription has been updated.", time: "5h ago", unread: 0 },
  { id: 3, name: "Dr. Sneha Iyer", avatar: "S", lastMsg: "How is the baby's fever now?", time: "1d ago", unread: 0 },
];

export default function MessagingPage() {
  const { session } = useMockStore();
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 101, text: "Hello Dr. Priya, I'm feeling better today.", sent: true, time: "10:00 AM" },
    { id: 102, text: "That's good to hear! Please share your latest ECG report so I can review the progress.", sent: false, time: "10:15 AM" }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setChatHistory([...chatHistory, { id: Date.now(), text: msg, sent: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg("");
  };

  return (
    <div className="container" style={{ padding: "2rem 0", height: "calc(100vh - 120px)" }}>
      <div className={styles.chatApp}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Messages</h3>
          </div>
          <div className={styles.chatList}>
            {MOCK_CHATS.map(chat => (
              <div 
                key={chat.id} 
                className={`${styles.chatThumb} ${activeChat.id === chat.id ? styles.activeThumb : ""}`}
                onClick={() => setActiveChat(chat)}
              >
                <div className={styles.chatAvatar}>{chat.avatar}</div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatNameRow}>
                    <span className={styles.chatName}>{chat.name}</span>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                  <div className={styles.chatPreview}>{chat.lastMsg}</div>
                </div>
                {chat.unread > 0 && <span className={styles.chatBadge}>{chat.unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerAvatar}>{activeChat.avatar}</div>
            <div>
              <h4 className={styles.headerName}>{activeChat.name}</h4>
              <p className={styles.headerStatus}>🟢 Online | Verified Specialist</p>
            </div>
          </div>

          <div className={styles.messageArea}>
            {chatHistory.map(m => (
              <div key={m.id} className={`${styles.msgRow} ${m.sent ? styles.sentRow : styles.receivedRow}`}>
                <div className={styles.msgBubble}>
                  {m.text}
                  <span className={styles.msgTime}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.inputArea} onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className={styles.msgInput}
            />
            <button type="submit" className={styles.sendBtn}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
