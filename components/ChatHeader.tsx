type Props = {
  selectedPersona: string;
};

export default function ChatHeader({ selectedPersona }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 px-3 py-2 shadow rounded-full flex items-center justify-center text-white font-bold">
          {selectedPersona.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{selectedPersona}</h3>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
    </div>
  );
}
