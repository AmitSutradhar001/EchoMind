import { Message } from "@/types";
import { useRef, useEffect } from "react";

type Props = {
  messages: Message[];
  selectedPersona: string;
};

export default function ChatMessages({ messages, selectedPersona }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex items-end gap-2 max-w-[70%]">
            {msg.sender !== "user" && (
              <div className="w-[32px] h-[32px] p-4 rounded-full bg-teal-400 flex items-center justify-center text-white text-sm">
                {selectedPersona.charAt(0)}
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-amber-200 text-gray-600 rounded-bl-none shadow"
              }`}
            >
              {msg.text.replace(/\(.*?\)\s*/g, "")}
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
