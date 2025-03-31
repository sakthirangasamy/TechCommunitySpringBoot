import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatBox from "./ChatBox";
import "../../components/Global.css";

const contacts = [
  { id: 1, name: "Kokki mama", avatar: "https://i.pravatar.cc/100?img=1", status: "Online" },
  { id: 2, name: "Sundar macha", avatar: "https://i.pravatar.cc/100?img=2", status: "Away" },
  { id: 3, name: "Musk macha", avatar: "https://i.pravatar.cc/100?img=3", status: "Offline" },
  { id: 4, name: "Bezos uncle", avatar: "https://i.pravatar.cc/100?img=4", status: "Online" },
  { id: 5, name: "My number", avatar: "https://i.pravatar.cc/100?img=5", status: "Away" },
  { id: 6, name: "Mark Machan", avatar: "https://i.pravatar.cc/100?img=6", status: "Offline" },
];

const initialMessages = {
  1: [
    { sender: "John Doe", message: "Hello! How are you?", time: "12:00 PM", read: true },
    { sender: "You", message: "I'm good, how about you?", time: "12:01 PM", read: true },
  ],
  2: [
    { sender: "Jane Smith", message: "Are you free for a call?", time: "2:00 PM", read: false },
    { sender: "You", message: "Yes, what's up?", time: "2:05 PM", read: true },
  ],
};

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [isChatBoxVisible, setChatBoxVisible] = useState(false); // State for mobile toggle
  const [isSidebarVisible, setSidebarVisible] = useState(false); // State for mobile sidebar visibility

  const handleChatClick = (id) => {
    setActiveChatId(id);
    setChatBoxVisible(true); // Show chat box on mobile
    setSidebarVisible(false); // Hide sidebar on mobile
  };

  const handleBackToSidebar = () => {
    setChatBoxVisible(false); // Go back to the sidebar
    setSidebarVisible(true); // Show sidebar
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility on mobile
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <ChatSidebar
        contacts={contacts}
        activeChatId={activeChatId}
        setActiveChatId={handleChatClick}
        search={search}
        setSearch={setSearch}
        className={isSidebarVisible ? "show" : "hide"}
      />



      {/* Chat Box */}
      {isChatBoxVisible && (
        <ChatBox
          activeChatId={activeChatId}
          contacts={contacts}
          messages={messages}
          setMessages={setMessages}
          onBack={handleBackToSidebar}
        />
      )}
    </div>
  );
};

export default Chat;