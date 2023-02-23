interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const OpenTerminal = ({ isOpen, setOpen }: Props) => {
  return (
    <button
      className="flex items-center justify-center gap-2"
      onClick={() => setOpen(!isOpen)}
    >
      <div className="flex items-center flex-wrap gap-0">
        <kbd className="h-6 w-fit px-2 font-fira border border-transparent mr-1 bg-opaque-gray flex justify-center items-center text-xs text-center rounded">
          ⌘ / ctrl
        </kbd>
        <kbd className="h-6 w-6 border font-fira border-transparent mr-1 bg-opaque-gray text-gray-30 flex justify-center items-center text-xs text-center rounded">
          X
        </kbd>
      </div>
      <img
        src="/icons/terminal-icon.svg"
        alt="TERMINAL_ICON"
        className="rounded-sm"
      />
    </button>
  );
};

export default OpenTerminal;
