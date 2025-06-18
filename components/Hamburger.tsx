type Props = {
  onClick: () => void;
};

export default function Hamburger({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="z-50 lg:hidden flex flex-col justify-between w-8 h-6 p-1 bg-white rounded shadow"
    >
      <span className="block h-1 bg-black rounded"></span>
      <span className="block h-1 bg-black rounded"></span>
      <span className="block h-1 bg-black rounded"></span>
    </button>
  );
}
