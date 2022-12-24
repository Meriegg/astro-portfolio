import { clsx } from "clsx";

interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const OpenMenuBtn = ({ isOpen, setOpen }: Props) => {
  return (
    <button
      onClick={() => setOpen(!isOpen)}
      className={clsx("flex flex-col gap-2", isOpen && "gap-0")}
    >
      <div
        className={clsx(
          "transition duration-300 w-6 h-[1px] bg-text-primary",
          isOpen && "transform rotate-[45deg]"
        )}
      ></div>
      <div
        className={clsx(
          "transition duration-300 w-6 h-[1px] bg-text-primary",
          isOpen && "transform rotate-[-45deg]"
        )}
      ></div>
    </button>
  );
};

export default OpenMenuBtn;
