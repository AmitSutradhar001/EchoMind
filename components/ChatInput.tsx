type Props = {
  inputText: string;
  setInputText: (text: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
};

export default function ChatInput({
  inputText,
  setInputText,
  onSubmit,
  isPending,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 bg-gray-900 border-t flex items-center gap-3 rounded-t-3xl"
    >
      <input
        type="text"
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
  );
}
