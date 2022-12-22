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
      open terminal{" "}
      <img src="/icons/terminal-icon.svg" alt="" className="rounded-sm" />
    </button>
  );
};

export default OpenTerminal;
