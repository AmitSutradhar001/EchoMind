export type Message = {
  sender: "user" | "ai";
  text: string;
  persona: string;
};

export const personas = [
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

export type Persona = (typeof personas)[number];
