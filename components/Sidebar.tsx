import { personas, Persona } from "@/types";

type Props = {
  selectedPersona: Persona;
  setSelectedPersona: (p: Persona) => void;
  isPending: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  selectedPersona,
  setSelectedPersona,
  isPending,
  isOpen,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full overflow-auto w-64 z-40 bg-gradient-to-br from-indigo-900 to-blue-900 border-r p-4 flex flex-col transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:w-1/4`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-2xl font-semibold text-white">Chats</h2>
          <button onClick={onClose} className="text-white text-3xl font-bold">
            ×
          </button>
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block text-2xl font-semibold mb-4 w-full border-b-2 p-2 text-white">
          Chats
        </h2>

        {/* Persona Buttons */}
        {personas.map((name) => (
          <button
            key={name}
            className={`flex items-center px-3 py-2 rounded-lg mb-2 text-left transition ${
              selectedPersona === name
                ? "bg-blue-200 text-blue-800 font-medium"
                : "hover:bg-gray-100 text-white hover:text-amber-400"
            }`}
            onClick={() => {
              setSelectedPersona(name);
              onClose(); // auto-close on mobile
            }}
            disabled={isPending}
          >
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
              {name.charAt(0)}
            </div>
            <span>{name}</span>
          </button>
        ))}
      </aside>
    </>
  );
}
