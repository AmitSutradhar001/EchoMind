"use client";
import { useEffect, useRef, useState } from "react";
import { main } from "@/actions/gemini";

type Message = {
  sender: "user" | "ai";
  text: string;
  persona: string;
};

const personas = [
  "AI",
  "Donald Trump",
  "Narendra Modi",
  "Giorgia Meloni",
  "Vladimir Putin",
  "Xi Jinping",
  "Joe Biden",
  "Mohammed bin Salman",
  "Emmanuel Macron",
  "Volodymyr Zelensky",
  "Elon Musk",
  "Mark Zuckerberg",
] as const;
type Persona = (typeof personas)[number];
const personaPrompts: Record<Persona, string> = {
  AI: "",
  "Xi Jinping":
    "Act like Xi Jinping, the strategic and authoritative President of China. Speak with measured confidence, promote stability, and reflect deep geopolitical thinking.",
  "Vladimir Putin":
    "Act like Vladimir Putin, the calculated and strong-willed President of Russia. Speak with assertive control and cold diplomacy, reflecting power and tradition.",
  "Donald Trump":
    "Act like Donald Trump, the bold and outspoken U.S. President. Use direct, confident, and flamboyant language with frequent self-praise and slogans.",
  "Narendra Modi":
    "Act like Narendra Modi, the inspirational Prime Minister of India. Speak with vision, clarity, and cultural pride, often referencing development and unity.",
  "Joe Biden":
    "Act like Joe Biden, the empathetic and experienced former U.S. President. Use calm, thoughtful, and people-centered language, often referencing unity and democracy.",
  "Mohammed bin Salman":
    "Act like Mohammed bin Salman, the visionary Crown Prince of Saudi Arabia. Speak with futuristic ambition, economic transformation, and authoritative tone.",
  "Giorgia Meloni": "Act like Giorgia Meloni...",
  "Emmanuel Macron":
    "Act like Emmanuel Macron, the eloquent President of France. Speak with intellectual depth, cultural pride, and a focus on European unity.",
  "Volodymyr Zelensky":
    "Act like Volodymyr Zelensky, the resilient President of Ukraine. Speak with courage, determination, and a focus on national pride and sovereignty.",
  "Elon Musk":
    "Act like Elon Musk, the innovative CEO of Tesla, SpaceX, and xAI. Speak like a visionary technologist with fast, bold, and disruptive ideas.",
  "Mark Zuckerberg":
    "Act like Mark Zuckerberg, the methodical CEO of Meta. Speak about technology, the metaverse, and social connection with a focus on innovation and privacy.",
};

const getLocalStorageKey = (persona: Persona) =>
  `gemini-chat-history-${persona}`;

const loadMessages = (persona: Persona): Message[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(getLocalStorageKey(persona));
  return stored ? JSON.parse(stored) : [];
};

export default function Home() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona>("AI");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Load messages for selected persona on mount and when persona changes
  useEffect(() => {
    const stored = loadMessages(selectedPersona);
    setMessages(stored);
  }, [selectedPersona]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsPending(true);

    const userMessage: Message = {
      sender: "user",
      text: inputText,
      persona: selectedPersona,
    };

    const systemPrompt = personaPrompts[selectedPersona];
    const aiReplyText = await main(inputText, systemPrompt);

    const aiMessage: Message = {
      sender: "ai",
      text: aiReplyText || "Sorry, I couldn't process that.",
      persona: selectedPersona,
    };

    const newMessages = [...messages, userMessage, aiMessage];
    setMessages(newMessages);
    localStorage.setItem(
      getLocalStorageKey(selectedPersona),
      JSON.stringify(newMessages)
    );

    setInputText("");
    setIsPending(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-1/4 h-full overflow-auto bg-gradient-to-br from-indigo-900 to-blue-900 border-r p-4 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 w-full border-b-2 p-2">
          Chats
        </h2>
        {personas.map((name) => (
          <button
            key={name}
            className={`flex items-center px-3 py-2 rounded-lg mb-2 text-left transition ${
              selectedPersona === name
                ? "bg-blue-200 text-blue-800 font-medium"
                : "hover:bg-gray-100 hover:text-amber-400"
            }`}
            onClick={() => setSelectedPersona(name)}
            disabled={isPending}
          >
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
              {name.charAt(0)}
            </div>
            <span>{name}</span>
          </button>
        ))}
      </aside>

      {/* Chat area */}
      <main
        className="flex-1 flex flex-col bg-blue-50 "
        style={{
          backgroundImage: 'url("/bg.jpg")',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 px-3 py-2 shadow  rounded-full flex items-center justify-center text-white font-bold">
              {selectedPersona.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{selectedPersona}</h3>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
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

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-gray-900 border-t flex items-center gap-3 rounded-t-3xl"
        >
          <input
            type="text"
            name="text"
            placeholder="Write something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-full shadow transition-all duration-200 hover:scale-110"
          >
            {isPending ? "..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
