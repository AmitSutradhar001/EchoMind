"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Hamburger from "@/components/Hamburger";
import { useChat } from "@/hooks/useChat";
import { Persona } from "@/types";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>("AI");
  const [inputText, setInputText] = useState("");
  const { messages, sendMessage, isPending } = useChat(selectedPersona);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      {/* Custom Hamburger Button */}
      <div className="absolute top-4 right-4">
        <Hamburger onClick={() => setSidebarOpen(true)} />
      </div>

      <Sidebar
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        isPending={isPending}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        className="flex-1 flex flex-col bg-blue-50"
        style={{ backgroundImage: 'url("/bg.jpg")' }}
      >
        <ChatHeader selectedPersona={selectedPersona} />
        <ChatMessages messages={messages} selectedPersona={selectedPersona} />
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </main>
    </div>
  );
}
