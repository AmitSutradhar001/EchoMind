import { useEffect, useState } from "react";
import { Message, Persona } from "@/types";
import { main } from "@/actions/gemini";
import { personaPrompts } from "@/constants/personas";

const getLocalStorageKey = (persona: Persona) =>
  `gemini-chat-history-${persona}`;

export function useChat(selectedPersona: Persona) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(getLocalStorageKey(selectedPersona));
    setMessages(stored ? JSON.parse(stored) : []);
  }, [selectedPersona]);

  const sendMessage = async (inputText: string) => {
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
    setIsPending(false);
  };

  return { messages, sendMessage, isPending };
}
