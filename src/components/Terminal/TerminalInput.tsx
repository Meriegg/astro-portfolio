import type { MutableRefObject } from "react";

interface Props {
  value: string;
  setValue: (e: string) => void;
  pushCommand: (val: string) => void;
  inputRef: MutableRefObject<HTMLDivElement | null>;
}

const TerminalInput = ({ value, setValue, pushCommand, inputRef }: Props) => {
  return (
    <div className="flex" ref={inputRef}>
      <span>
        <span className="text-terminal-green">root@mariodev.vercel.app</span>
        <span>:</span>
        <span className="text-terminal-blue">~/home</span>
        <span className="mt-1">$</span>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus:outline-none border-none bg-transparent ml-1 flex-grow"
        onKeyDown={(key) => {
          if (key.code.toLowerCase() === "enter" || key.keyCode === 13) {
            pushCommand(value);
            setValue("");
          }
        }}
      />
    </div>
  );
};

export default TerminalInput;
